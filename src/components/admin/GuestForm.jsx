import { AnimatePresence, motion } from "framer-motion";
import { Phone, Plus, Trash2, UserIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

export function GuestForm({ isOpen, onClose, onSubmit, editInvitation }) {
  const [groupName, setGroupName] = useState("");
  const [accessLevel, setAccessLevel] = useState("full");
  const [code, setCode] = useState("");
  const [guestNames, setGuestNames] = useState([
    {
      id: Date.now().toString(),
      name: "",
    },
  ]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const isEditMode = !!editInvitation;

  // Populate form when editing
  useEffect(() => {
    if (editInvitation) {
      setGroupName(editInvitation.groupName);
      setAccessLevel(editInvitation.accessLevel);
      setCode(editInvitation.code);
      setGuestNames(
        editInvitation.guests.map((g) => ({
          id: g.id,
          name: g.name,
        })),
      );
    } else {
      resetForm();
    }
  }, [editInvitation, isOpen]);

  const resetForm = () => {
    setGroupName("");
    setAccessLevel("full");
    setCode("");
    setGuestNames([
      {
        id: Date.now().toString(),
        name: "",
      },
    ]);
  };

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
  };

  const addGuest = () => {
    setGuestNames([
      ...guestNames,
      {
        id: Date.now().toString(),
        name: "",
      },
    ]);
  };

  const removeGuest = (index) => {
    if (guestNames.length <= 1) return;
    setGuestNames(guestNames.filter((_, i) => i !== index));
  };

  const updateGuestName = (index, name) => {
    const updated = [...guestNames];
    updated[index] = {
      ...updated[index],
      name,
    };
    setGuestNames(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty names and assign defaults
    const validGuests = guestNames.map((g, i) => ({
      id: g.id,
      name: g.name.trim() || `Guest ${i + 1}`,
    }));

    onSubmit({
      code: code || groupName.substring(0, 3).toUpperCase() + "2024",
      groupName,
      accessLevel,
      guests: validGuests,
      phoneNumber: phoneNumber.replace(/\s/g, "") || undefined,
    });

    onClose();
    if (!isEditMode) {
      resetForm();
    }
  };

  const allGuestsNamed = guestNames.every((g) => g.name.trim().length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            className="relative bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-serif mb-6">
              {isEditMode ? "Edit Invitation" : "Add New Guest Group"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group / Family Name
                </label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                  placeholder="e.g. The Smith Family"
                />
              </div>

              {/* Access Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccessLevel("full")}
                    className={`p-3 border rounded-sm text-sm text-center transition-all ${accessLevel === "full" ? "border-purple-400 bg-purple-50 text-purple-700 font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                  >
                    Full Wedding
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccessLevel("cermony")}
                    className={`p-3 border rounded-sm text-sm text-center transition-all ${accessLevel === "ceremony" ? "border-blue-400 bg-blue-50 text-blue-700 font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                  >
                    Ceremony Only
                  </button>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                    placeholder="e.g. 14155551234"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Include country code, no + or spaces (e.g. 14155551234)
                </p>
              </div>

              {/* Invitation Code  */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invitation Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    disabled={isEditMode}
                    className="flex-grow p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold font-mono uppercase disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Auto-generated if empty"
                  />
                  {!isEditMode && (
                    <button
                      type="button"
                      onClick={generateCode}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-sm hover:bg-gray-200 text-sm font-medium"
                    >
                      Generate
                    </button>
                  )}
                </div>
              </div>

              {/* Guest Names */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Guests ({guestNames.length})
                  </label>
                  <button
                    type="button"
                    onClick={addGuest}
                    className="flex items-center text-sm text-wedding-gold hover:text-wedding-black transition-colors font-medium"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Guest
                  </button>
                </div>

                <div className="space-y-3">
                  {guestNames.map((guest, index) => (
                    <div key={guest.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <UserIcon size={14} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={guest.name}
                        onChange={(e) => updateGuestName(index, e.target.value)}
                        className="flex-grow p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold text-sm"
                        placeholder={`Guest ${index + 1} full name`}
                        required
                      />
                      {guestNames.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGuest(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!groupName.trim() || !allGuestsNamed}
              >
                {isEditMode ? "Save Changes" : "Create Invitation"}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
