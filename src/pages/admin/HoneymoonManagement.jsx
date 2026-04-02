import { AnimatePresence, motion } from "framer-motion";
import { Gift, Pencil, Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Button } from "../../components/ui/Button";
import {
  createHoneymoonItem,
  deleteHoneymoonItem,
  getContributions,
  getHoneymoonItems,
  updateHoneymoonItem,
} from "../../lib/firebaseService";

const CATEGORY_OPTIONS = [
  { value: "travel", label: "Travel" },
  { value: "accommodation", label: "Accommodation" },
  { value: "experiences", label: "Experiences" },
  { value: "activities", label: "Activities" },
];

const ICON_OPTIONS = [
  "✈️",
  "🏨",
  "🎟️",
  "🚤",
  "🍽️",
  "🎉",
  "📸",
  "🛳️",
  "🌴",
  "🏝️",
];

const emptyForm = {
  title: "",
  description: "",
  targetAmount: 500,
  currentAmount: 0,
  icon: ICON_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

const HoneymoonManagement = () => {
  const [items, setItems] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [itemsData, contribData] = await Promise.all([
        getHoneymoonItems(),
        getContributions(),
      ]);
      setItems(itemsData);
      setContributions(contribData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      targetAmount: item.targetAmount,
      currentAmount: item.currentAmount,
      icon: item.icon,
      category: item.category,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    if (editingItem) {
      const success = await updateHoneymoonItem(editingItem.id, formData);
      if (success) {
        setItems(
          items.map((i) =>
            i.id === editingItem.id ? { ...i, ...formData } : i,
          ),
        );
      }
    } else {
      const created = await createHoneymoonItem(formData);
      if (created) {
        setItems([...items, created]);
      }
    }

    setIsSaving(false);
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this honeymoon item?")) {
      const success = await deleteHoneymoonItem(id);
      if (success) {
        setItems(items.filter((i) => i.id !== id));
      }
    }
  };

  const getItemContributions = (itemId) => {
    return contributions.filter((c) => c.itemId === itemId);
  };

  const totalRaised = contributions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <AdminLayout title="Honeymoon Fund">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Total Items
          </p>
          <p className="text-2xl font-serif text-wedding-black">
            {items.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Total Raised
          </p>
          <p className="text-2xl font-serif text-green-600">
            ${totalRaised.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Contributions
          </p>
          <p className="text-2xl font-serif text-wedding-black">
            {contributions.length}
          </p>
        </div>
      </div>

      {/* Items Management */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-serif text-xl">Fund Items</h3>
          <Button onClick={openCreate}>
            <Plus size={18} className="mr-2" />
            Add Item
          </Button>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Gift size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No honeymoon items yet. Add your first fund item.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium">Goal</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => {
                  const pct = Math.min(
                    100,
                    Math.round((item.currentAmount / item.targetAmount) * 100),
                  );
                  return (
                    <tr
                      className="hover:bg-gray-50 transition-colors"
                      key={item.id}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidde">
                            <div
                              className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-green-500" : "bg-wedding-gold"}`}
                              style={{
                                width: `${pct}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{pct}%</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          ${item.currentAmount.toLocaleString()} raised
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        ${item.targetAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="text-gray-400 hover:text-wedding-gold transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Contributions */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-serif text-xl">Recent Contributions</h3>
        </div>

        {contributions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No contributions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Guest</th>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contributions.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {c.guestName}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {items.find((i) => i.id === c.itemId)?.title || "Unknown"}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      ${c.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {c.message || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Item Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
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
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-serif mb-6">
                {editingItem ? "Edit Fund Item" : "Add Fund Item"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Icon Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ICON_OPTIONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            icon,
                          })
                        }
                        className={`w-10 h-10 text-xl rounded-sm border flex items-center justify-center transition-all ${formData.icon === icon ? "border-wedding-gold bg-wedding-gold/10" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                    placeholder="e.g. Flight Tickets"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold resize-none"
                    rows={2}
                    placeholder="e.g. Round-trip flights to Santorini, Greece"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            category: opt.value,
                          })
                        }
                        className={`p-2 border rounded-sm text-sm text-center transition-all capitalize ${formData.category === opt.value ? "border-wedding-gold bg-wedding-gold/5 text-wedding-black font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Amount ($)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.targetAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAmount: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Amount ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.currentAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentAmount: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving
                    ? "Saving..."
                    : editingItem
                      ? "Save Changes"
                      : "Create Item"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default HoneymoonManagement;
