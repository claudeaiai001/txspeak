import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Inbox,
  Zap,
  MessageSquare, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle,
  Clock,
  Coins,
  Search,
  Filter,
  DollarSign,
  Mail,
  Flame
} from "lucide-react";

export default function WhaleInbox() {
  const [activeTab, setActiveTab] = useState('accepted');
  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    {
      id: 1,
      from: "0x9ba2...74E9",
      subject: "Investment Opportunity - Early Stage Startup",
      preview: "Hello! I'm the founder of a promising Web3 startup in the gaming space. We're currently raising our seed round and I believe you might be interested in our vision.\n\nOur team has experience from major tech companies and we're building something that could revolutionize how gamers interact with blockchain technology.\n\nWould you be open to a 15-minute call to discuss this opportunity?",
      amount: 750,
      timestamp: "Jul 20, 2025 at 7:36 AM",
      txHash: "0x2234...5679",
      status: "accepted",
      type: "founder",
      responseTime: "2.5h"
    },
    {
      id: 2,
      from: "vitalik.eth",
      subject: "DeFi Architecture Discussion", 
      preview: "One token bought me this seat at your inbox. Let's discuss revolutionary DeFi architecture and potential collaboration opportunities...",
      amount: 1500,
      timestamp: "2 hours ago",
      txHash: "0x1234...abcd",
      status: "unread",
      type: "whale"
    },
    {
      id: 3,
      from: "0x8765...4321",
      subject: "Startup Pitch - Revolutionary Idea",
      preview: "Skipping the cold email graveyard—paying to pitch directly. Here's my revolutionary startup idea...",
      amount: 750,
      timestamp: "5 hours ago", 
      txHash: "0x5678...efgh",
      status: "read",
      type: "founder"
    },
    {
      id: 4,
      from: "crypto_investor.eth",
      subject: "Premium Consultation Request",
      preview: "Set your rate, sip coffee, let the inbox fill—well, here's your premium consultation request...",
      amount: 200,
      timestamp: "1 day ago",
      txHash: "0x9abc...def0",
      status: "pending",
      type: "consultant"
    }
  ];

  const stats = [
    {
      label: "Total Earned",
      value: "1,250 TXSPK",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      label: "Pending Messages", 
      value: "2",
      icon: Clock,
      color: "text-orange-400", 
      bgColor: "bg-orange-500/10"
    },
    {
      label: "Total Messages",
      value: "5", 
      icon: Mail,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      label: "Tokens Burned",
      value: "12.5 TXSPK",
      icon: Flame,
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: 2 },
    { id: 'accepted', label: 'Accepted', count: 2 },
    { id: 'rejected', label: 'Rejected', count: 1 },
    { id: 'all', label: 'All', count: 5 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread':
        return 'text-blue-400 border-blue-500/30 bg-blue-600/20';
      case 'read':
        return 'text-green-400 border-green-500/30 bg-green-600/20';
      case 'pending':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-600/20';
      case 'accepted':
        return 'text-green-400 border-green-500/30 bg-green-600/20';
      case 'rejected':
        return 'text-red-400 border-red-500/30 bg-red-600/20';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-600/20';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'whale':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-600/20';
      case 'founder':
        return 'text-blue-400 border-blue-500/30 bg-blue-600/20';
      case 'consultant':
        return 'text-green-400 border-green-500/30 bg-green-600/20';
      default:
        return 'text-purple-400 border-purple-500/30 bg-purple-600/20';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (activeTab !== 'all' && message.status !== activeTab) return false;
    if (searchQuery && !message.from.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !message.subject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleRefund = (messageId) => {
    console.log(`Refunding message ${messageId}`);
  };

  const handleAccept = (messageId) => {
    console.log(`Accepting message ${messageId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
            <Zap className="w-4 h-4 mr-1" />
            You Own Your Inbox Now
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Inbox className="w-10 h-10" />
            Whale Inbox
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Manage your tokenized messages, accept valuable offers, and earn from your attention.
          </p>
          <p className="text-lg text-cyan-400 font-medium italic">
            "Turn DMs into dollars on every interaction."
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-[#1E293B] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages or addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E293B] border border-white/10 rounded-lg pl-10 pr-32 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 border-white/20 text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-[#1E293B] text-gray-300 hover:bg-[#2A3441]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div>
          {/* Messages */}
          <Card className="bg-[#1E293B] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Premium Messages
                </span>
                <Button variant="outline" size="sm" className="border-white/20 text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Hunt
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 bg-[#0B0F19] rounded-lg border border-white/5 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {message.from[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {message.from}
                            <Badge className={getMessageTypeColor(message.type)}>
                              {message.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(message.status)} >
                          {message.status}
                        </Badge>
                        <div className="text-lg font-bold text-cyan-400">
                          {message.amount.toLocaleString()} TXSPK
                        </div>
                      </div>
                    </div>

                    {message.subject && (
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {message.subject}
                      </h3>
                    )}

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {message.preview}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <a 
                          href={`https://etherscan.io/tx/${message.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {message.txHash}
                        </a>
                        {message.responseTime && (
                          <span>Responded in {message.responseTime}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {message.status === 'pending' && (
                          <Button
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRefund(message.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-600/20"
                          >
                            Refund
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleAccept(message.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {message.status === 'read' ? 'View' : 'Accept'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No messages found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}