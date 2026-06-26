import React, { useState } from 'react';
import { MessageSquare, X, Send, Users } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today with construction materials?", isBot: true },
  ]);
  const [input, setInput] = useState('');

  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('cement')) {
      return 'We have premium Grade 53 and Grade 43 cement. You can find them in the Cement category.';
    }

    if (lowerText.includes('steel')) {
      return 'We offer TMT bars and structural steel in multiple sizes. Check the Steel section for current stock.';
    }

    if (lowerText.includes('track') || lowerText.includes('order')) {
      return 'Open My Orders to see live shipment updates, delivery milestones, and invoice details for each order.';
    }

    if (lowerText.includes('quote') || lowerText.includes('price')) {
      return 'Share the product, quantity, and delivery site, and I can help you prepare a quote request for the sales team.';
    }

    if (lowerText.includes('machinery') || lowerText.includes('rent')) {
      return 'Our rentals include excavators, mixers, lifts, and compactors. Tap Rentals to browse availability and terms.';
    }

    if (lowerText.includes('delivery') || lowerText.includes('site')) {
      return 'We support site delivery for bulk materials and machinery. Add your delivery pin during checkout for ETA details.';
    }

    return 'I can help with order tracking, site delivery, quotes, rentals, and product availability. Try one of the quick replies or ask me about a specific material.';
  };

  const sendMessage = (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setMessages((prev) => [...prev, { text: cleanText, isBot: false }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getBotResponse(cleanText), isBot: true }]);
    }, 700);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleEscalation = () => {
    setMessages((prev) => [...prev, { text: 'Talk to a human', isBot: false }, { text: 'I am connecting you to a human support specialist now. You can also email support@buildbazaar.com for priority help.', isBot: true }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 h-96 shadow-2xl rounded-lg flex flex-col border border-gray-200">
          <div className="bg-amazon_blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              BuildBazaar Help
            </h3>
            <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
          </div>

          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {['Track my order', 'Get a quote', 'Find machinery'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => sendMessage(chip)}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${m.isBot ? 'bg-gray-100 text-gray-800' : 'bg-amazon_yellow text-black'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t flex items-center">
            <input
              type="text"
              className="flex-grow border rounded-l-md p-2 text-sm focus:outline-none focus:border-amazon_yellow"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-amazon_yellow p-2 rounded-r-md hover:bg-yellow-500">
              <Send className="h-5 w-5" />
            </button>
          </form>

          <div className="border-t border-gray-200 p-3">
            <button
              type="button"
              onClick={handleEscalation}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800"
            >
              <Users className="h-4 w-4" />
              Talk to a human
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amazon_blue text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
