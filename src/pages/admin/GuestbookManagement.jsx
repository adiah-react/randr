import { Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import {
  deleteGuestbookMessage,
  getGuestbookMessages,
} from "../../lib/firebaseService";

const GuestbookManagement = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getGuestbookMessages();
      setMessages(data);
      setIsLoading(false);
    };
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const success = await deleteGuestbookMessage(id);
      if (success) {
        setMessages(messages.filter((msg) => msg.id !== id));
      }
    }
  };

  return (
    <AdminLayout title="Guestbook Management">
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row">
          <div className="relative flex-grow max-w-md w-100">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search guests or messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-pulse">Loading...</div>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              {searchTerm ? "No results found." : "No messages yet."}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Guest Name</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y.divide-gray-100">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {msg.guestName}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                      {msg.message}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default GuestbookManagement;
