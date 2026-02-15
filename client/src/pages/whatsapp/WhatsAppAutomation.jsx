import React, { useState } from "react";
import {
  Search,
  Send,
  CheckCheck,
  MessageCircle,
} from "lucide-react";

const WhatsAppChats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      lastMessage: "When is the demo?",
      time: "14:30",
      unread: 2,
      windowOpen: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 9876543211",
      lastMessage: "Thanks!",
      time: "10:15",
      unread: 0,
      windowOpen: false,
    },
  ];

  const sendMessage = () => {
    if (!message || !selectedChat?.windowOpen) return;

    // 🔌 API PLACEHOLDER
    // POST /api/whatsapp/send-message
    // body: { phone, message }

    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-120px)] grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* LEFT: CHAT LIST */}
      <div className="bg-white border rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <MessageCircle size={18} className="text-green-600" />
            WhatsApp Chats
          </h2>

          <div className="relative mt-3">
            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              placeholder="Search contact..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b cursor-pointer hover:bg-green-50 ${
                selectedChat?.id === chat.id ? "bg-green-50" : ""
              }`}
            >
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800">
                  {chat.name}
                </p>
                {chat.unread > 0 && (
                  <span className="bg-green-600 text-white text-xs px-2 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {chat.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: CHAT WINDOW */}
      <div className="lg:col-span-2 bg-white border rounded-xl flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-800">
                {selectedChat.name}
              </p>
              <p className="text-xs text-gray-500">
                {selectedChat.phone}
              </p>

              {!selectedChat.windowOpen && (
                <p className="text-xs text-red-500 mt-1">
                  24-hour window closed — use template
                </p>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
              <div className="bg-white p-3 rounded-lg max-w-xs shadow-sm">
                Hi! How can we help?
              </div>

              <div className="bg-green-600 text-white p-3 rounded-lg max-w-xs ml-auto">
                Please share pricing
                <div className="text-xs opacity-70 flex items-center gap-1 mt-1">
                  <CheckCheck size={12} /> Read
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!selectedChat.windowOpen}
                placeholder={
                  selectedChat.windowOpen
                    ? "Type a message..."
                    : "Template required (24h expired)"
                }
                className="flex-1 border rounded-lg px-4 py-2 text-sm disabled:bg-gray-100"
              />

              <button
                onClick={sendMessage}
                disabled={!selectedChat.windowOpen}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppChats;
