import React from "react";
import { Card, CardContent } from "../Components/ui/card";
import { 
  Crown, 
  Rocket, 
  Heart, 
  Flame, 
  Gift,
  Users,
  DollarSign,
  Phone,
  Eye,
  Coffee,
  Search,
  FileText,
  Calendar,
  RefreshCw,
  Target,
  Globe,
  Zap,
  Clock,
  TrendingUp,
  Wallet
} from "lucide-react";

export default function UseCasesSection() {
  const useCases = [
    {
      icon: Crown,
      title: "Whale Hunter",
      hook: "One token buys you a seat at the billionaire's inbox.",
      color: "text-yellow-400"
    },
    {
      icon: Rocket,
      title: "Founder Fast-Lane", 
      hook: "Skip the cold e-mail graveyard—pay to pitch, get read.",
      color: "text-blue-400"
    },
    {
      icon: Heart,
      title: "Secret Admirer",
      hook: "Send love notes only they can decrypt.",
      color: "text-pink-400"
    },
    {
      icon: Flame,
      title: "Revenge Receipt",
      hook: "Deliver the burn—then watch the coins burn.",
      color: "text-red-400"
    },
    {
      icon: Gift,
      title: "Gift & Gone",
      hook: "Attach money, hit send—zero awkward follow-ups.",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "DAO Doorbell",
      hook: "Ring a multisig for 1,000 TXSPK—no spam allowed.",
      color: "text-purple-400"
    },
    {
      icon: DollarSign,
      title: "YouTuber ATM",
      hook: "Turn DMs into dollars on every upload.",
      color: "text-emerald-400"
    },
    {
      icon: Phone,
      title: "Politician Direct Line",
      hook: "Pay to talk, not to lobby.",
      color: "text-indigo-400"
    },
    {
      icon: Eye,
      title: "Dark-Web Launder-Lite",
      hook: "Earn clean on-chain cash for your skills.",
      color: "text-gray-400"
    },
    {
      icon: Coffee,
      title: "Consultant Concierge",
      hook: "Set your rate, sip coffee, let the inbox fill.",
      color: "text-amber-400"
    },
    {
      icon: Search,
      title: "NFT Detective",
      hook: "Bribe the dev—get the real back-story.",
      color: "text-cyan-400"
    },
    {
      icon: FileText,
      title: "Emergency Leak",
      hook: "Drop docs, collect coins, vanish.",
      color: "text-orange-400"
    },
    {
      icon: Calendar,
      title: "Birthday on-Chain",
      hook: "Gift tokens that appear the moment they open the card.",
      color: "text-rose-400"
    },
    {
      icon: RefreshCw,
      title: "30-Day Escape Hatch",
      hook: "Unopened? 100% refund. No ghosting guilt.",
      color: "text-teal-400"
    },
    {
      icon: Target,
      title: "Attention Auction",
      hook: "Bid blind—only the highest whisper wins.",
      color: "text-violet-400"
    },
    {
      icon: Globe,
      title: "Global Micropay",
      hook: "Send cents or thousands—borders don't exist.",
      color: "text-blue-300"
    },
    {
      icon: Zap,
      title: "Gas-Free Grandma",
      hook: "First message is free—thanks, paymaster.",
      color: "text-yellow-300"
    },
    {
      icon: Clock,
      title: "Burn Countdown",
      hook: "Watch supply shrink every Monday at 12 UTC.",
      color: "text-red-300"
    },
    {
      icon: TrendingUp,
      title: "Featured Flame",
      hook: "Stake 1k, sit on the front page for a week.",
      color: "text-orange-300"
    },
    {
      icon: Wallet,
      title: "Pocket Billboard",
      hook: "Your wallet address is now a billboard—price it right.",
      color: "text-green-300"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* Softer Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/70 via-purple-700/60 to-purple-800/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-purple-800/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700/40 via-transparent to-purple-600/30"></div>
      
      {/* Enhanced black shade overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Additional depth with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Real-World Power Moves
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From whale hunting to attention auctions—discover how txSpeak transforms every interaction into opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:scale-[1.02] rounded-2xl"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardContent className="relative p-6 z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 flex-shrink-0 backdrop-blur-sm border border-purple-400/20">
                    <useCase.icon className={`w-6 h-6 ${useCase.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-3 text-lg leading-tight group-hover:text-purple-300 transition-colors duration-300">
                      {useCase.title}
                    </h3>
                  </div>
                </div>
                <div className="relative">
                  <p className="text-sm text-gray-300 leading-relaxed italic font-medium">
                    "{useCase.hook}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Clean bottom accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">
              Powered by blockchain innovation
            </span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}