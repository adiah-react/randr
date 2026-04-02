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
  return (
    <PageTransition className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/honeymoon.jpg"
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              Honeymoon Fund
            </h1>
            <p className="text-xl text-gray-100 font-light max-w-2xl mx-auto">
              Your presence is the greatest git of all. However, if you wish to
              honor us with a gift, a contribution towards our dream honeymoon
              in Disneyworld would be deeply appreciated.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Fund Items Content */}
      <div className="pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
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
