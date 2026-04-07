import { motion } from "framer-motion";
import { BuildingIcon, CheckIcon, ChevronDown, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ContributionModal } from "../components/honeymoon/ContributionModal";
import { FundItem } from "../components/honeymoon/FundItem";
import { PageTransition } from "../components/ui/PageTransition";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { ThankYouModal } from "../components/ui/ThankYouModal";
import { useInvitation } from "../hooks/useInvitation";
import {
  addContribution,
  subscribeToHoneymoonItems,
} from "../lib/firebaseService";
export function HoneymoonFundPage() {
  const { invitation } = useInvitation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [lastContributionAmount, setLastContributionAmount] = useState(0);
  const [copiedField, setCopiedField] = useState(null);

  // Subscribe to real-time honeymoon items updates
  useEffect(() => {
    const unsubscribe = subscribeToHoneymoonItems((updatedItems) => {
      setItems(updatedItems);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleContributeClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleContributionSubmit = async (amount, message) => {
    if (!selectedItem || !invitation) return;
    await addContribution(
      selectedItem.id,
      invitation.groupName,
      amount,
      message,
    );
    setLastContributionAmount(amount);
    setShowModal(false);
    setShowThankYou(true);
    // Items will update automatically via real-time listener
  };
  const totalRaised = items.reduce((sum, item) => sum + item.currentAmount, 0);
  const totalGoal = items.reduce((sum, item) => sum + item.targetAmount, 0);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };
  return (
    <PageTransition className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/honeymoon.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              Honeymoon Fund
            </h1>
            <p className="text-xl text-gray-100 font-light max-w-2xl mx-auto">
              Your presence is the greatest gift of all. However, if you wish to
              honour us with a gift, a contribution towards our dream honeymoon
              in Iceland would be deeply appreciated.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal className="text-center mt-12" width="100%">
        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto mb-4">
          If you'd like to contribute, please scroll down to choose an
          experience and make your pledge. Once done, you can send your gift
          using the account details below.
        </p>
        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
          Thank you for your love and support 🤍.
        </p>
      </ScrollReveal>

      {/* Bank Account Information */}
      <section className="pt-16 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal className="w-full md:w-[50%] mx-auto">
            <div className="relative border border-gray-200 rounded-sm bg-gray-50 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-wedding-gold/10 rounded-full flex items-center justify-center">
                  <BuildingIcon size={20} className="text-wedding-gold" />
                </div>
                <h2 className="text-2xl font-serif text-wedding-black">
                  Bank Transfer Details
                </h2>
              </div>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                If you'd prefer to contribute via bank transfer, please use the
                details below. Kindly include your name in the reference so we
                can thank you personally.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Account Name", value: "Rashaad Aaron" },
                  { label: "Bank", value: "Republic Bank Ltd." },
                  { label: "Account Number", value: " 740052461501" },
                  { label: "Account Type", value: "Chequing" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between bg-white rounded-sm px-4 py-3 border border-gray-100"
                  >
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-wedding-black font-medium text-sm md:text-base font-mono">
                        {item.value}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.label)}
                      title={`Copy ${item.label}`}
                      className="ml-3 p-2 text-gray-400 hover:text-wedding-gold transition-colors flex-shrink-0"
                    >
                      {copiedField === item.label ? (
                        <CheckIcon size={16} className="text-green-500" />
                      ) : (
                        <CopyIcon size={16} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-6 text-center italic">
                Please use <span className="font-medium">your full name</span>{" "}
                as the payment reference
              </p>
              {/* Scroll Indicator */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.2,
                  duration: 1,
                }}
                className="absolute -bottom-100 md:-bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce-slow"
              >
                <ChevronDown className="text-wedding-gold w-8 h-8 opacity-70" />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Fund Items Content */}
      <div className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 mx-auto">
            <div className="inline-block bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
              <span className="font-serif text-lg text-wedding-black">
                ${totalRaised.toLocaleString()} raised of $
                {totalGoal.toLocaleString()} goal
              </span>
            </div>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-64 rounded-sm"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <FundItem
                  key={item.id}
                  item={item}
                  index={index}
                  onContribute={handleContributeClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ContributionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={selectedItem}
        onSubmit={handleContributionSubmit}
      />

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Thank You!"
        message={`We are incredibly grateful for your generous pledge of $${lastContributionAmount} towards our ${selectedItem?.title.toLowerCase()}.`}
      />
    </PageTransition>
  );
}
