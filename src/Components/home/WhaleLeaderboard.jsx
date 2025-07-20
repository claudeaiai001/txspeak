import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, MessageSquare, Clock, Crown } from "lucide-react";

export default function WhaleLeaderboard() {
  const whales = [
    {
      address: "vitalik.eth",
      messagePrice: 550,
      responseTime: "20 mins",
      status: "open",
      rank: 1
    },
    {
      address: "punk6529.eth", 
      messagePrice: 700,
      responseTime: "3 hrs",
      status: "gated",
      rank: 2
    },
    {
      address: "governor.eth",
      messagePrice: 300,
      responseTime: "4 hrs", 
      status: "closed",
      rank: 3
    },
    {
      address: "defi_guru.eth",
      messagePrice: 400,
      responseTime: "1 hr",
      status: "open",
      rank: 4
    },
    {
      address: "nft_king.eth",
      messagePrice: 600,
      responseTime: "45 mins",
      status: "gated",
      rank: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-green-400 border-green-500/30 bg-green-600/20';
      case 'gated': 
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-600/20';
      case 'closed':
        return 'text-red-400 border-red-500/30 bg-red-600/20';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-600/20';
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-amber-600" />;
    return <span className="text-gray-400 font-bold">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
      {/* Dark overlay for additional depth */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Whale Directory
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with the most influential people in Web3. Pay to play.
            </p>
          </div>

          <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                Web3 Influencers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whales.map((whale, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/60 transition-all duration-200 group border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {whale.address.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white text-lg">{whale.address}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {whale.messagePrice} TXSPK per message
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Usually replies in {whale.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(whale.status)} capitalize`}>
                        {whale.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}