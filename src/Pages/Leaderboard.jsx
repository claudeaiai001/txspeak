import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Badge } from "../Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs";
import { 
  Trophy, 
  TrendingUp, 
  Zap, 
  MessageSquare,
  Crown,
  Medal,
  Award
} from "lucide-react";

export default function Leaderboard() {
  const topEarners = [
    { address: "vitalik.eth", earned: 12000, messages: 156, responseTime: "20m", rank: 1 },
    { address: "punk6529.eth", earned: 8600, messages: 98, responseTime: "3h", rank: 2 },
    { address: "governor.eth", earned: 6800, messages: 145, responseTime: "4h", rank: 3 },
    { address: "defi_guru.eth", earned: 5200, messages: 87, responseTime: "1h", rank: 4 },
    { address: "nft_king.eth", earned: 4800, messages: 76, responseTime: "45m", rank: 5 }
  ];

  const topSenders = [
    { address: "whale_investor.eth", spent: 15000, messages: 203, avgAmount: 74, rank: 1 },
    { address: "crypto_vc.eth", spent: 11200, messages: 89, avgAmount: 126, rank: 2 },
    { address: "defi_degen.eth", spent: 9800, messages: 167, avgAmount: 59, rank: 3 },
    { address: "nft_collector.eth", spent: 8400, messages: 124, avgAmount: 68, rank: 4 },
    { address: "dao_member.eth", spent: 7600, messages: 95, avgAmount: 80, rank: 5 }
  ];

  const quickResponders = [
    { address: "lightning_fast.eth", avgResponse: "12m", messages: 89, earned: 3400, rank: 1 },
    { address: "speedy_dev.eth", avgResponse: "18m", messages: 67, earned: 2800, rank: 2 },
    { address: "quick_reply.eth", avgResponse: "25m", messages: 134, earned: 5600, rank: 3 },
    { address: "fast_responder.eth", avgResponse: "32m", messages: 78, earned: 3100, rank: 4 },
    { address: "rapid_fire.eth", avgResponse: "38m", messages: 156, earned: 4200, rank: 5 }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-300" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-500" />;
    return <span className="text-gray-300 font-bold">#{rank}</span>;
  };

  const LeaderboardTable = ({ data, type }) => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/40 to-purple-900/40 rounded-lg hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-purple-800/50 transition-all duration-300 group border border-slate-600/20"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-slate-600 to-purple-600 shadow-lg">
              {getRankIcon(item.rank)}
            </div>
            <div>
              <div className="font-semibold text-white">{item.address}</div>
              <div className="text-sm text-slate-300">
                {item.messages} messages
                {type === 'responders' && ` • ${item.avgResponse} avg`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-lg font-bold text-cyan-300">
                {type === 'earners' && `${item.earned.toLocaleString()} TXSPK`}
                {type === 'senders' && `${item.spent.toLocaleString()} TXSPK`}
                {type === 'responders' && `${item.earned.toLocaleString()} TXSPK`}
              </div>
              <div className="text-sm text-slate-300">
                {type === 'earners' && 'Earned'}
                {type === 'senders' && `Avg: ${item.avgAmount} TXSPK`}
                {type === 'responders' && 'Earned'}
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity border-0"
            >
              Message
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-slate-700/60 to-purple-700/60 text-slate-200 border-slate-500/30 mb-4 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-1" />
            Track Top Minds. Reward Top Time.
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-300" />
            Leaderboard
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Discover the most active and valuable members of the txSpeak community.
          </p>
        </div>

        <Tabs defaultValue="earners" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-800/70 to-purple-800/70 border border-slate-600/30 backdrop-blur-sm">
            <TabsTrigger 
              value="earners"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 transition-all duration-300"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Top Earners
            </TabsTrigger>
            <TabsTrigger 
              value="senders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 transition-all duration-300"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Top Senders
            </TabsTrigger>
            <TabsTrigger 
              value="responders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 transition-all duration-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Quick Responders
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="earners">
              <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
                  <CardTitle className="text-white">
                    Wallets with Highest TXSPK Inbox Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LeaderboardTable data={topEarners} type="earners" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="senders">
              <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
                  <CardTitle className="text-white">
                    Spent the Most TXSPK Sending Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LeaderboardTable data={topSenders} type="senders" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="responders">
              <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
                  <CardTitle className="text-white">
                    Inbox Open → Reply Speed Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LeaderboardTable data={quickResponders} type="responders" />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}