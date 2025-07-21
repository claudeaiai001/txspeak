import React from "react";
import { Card, CardContent } from "../Components/ui/card";
import { CheckCircle, Clock, Zap, Target } from "lucide-react";

export default function RoadmapSection() {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "completed",
      icon: CheckCircle,
      title: "Genesis",
      items: [
        "Smart contracts audited by Hacken",
        "UI/UX beta testing with 500 users",
        "Tokenomics whitepaper released",
        "Initial community building"
      ],
      position: "left"
    },
    {
      quarter: "Q2 2025", 
      status: "active",
      icon: Clock,
      title: "Launch",
      items: [
        "Public presale launch",
        "Core messaging platform live",
        "Refund system integration",
        "First 1,000 users milestone"
      ],
      position: "right"
    },
    {
      quarter: "Q3 2025",
      status: "upcoming",
      icon: Zap,
      title: "Scaling",
      items: [
        "DAO governance launch",
        "Featured inbox marketplace",
        "Mobile app for iOS/Android",
        "TXSPK airdrop to early adopters"
      ],
      position: "left"
    },
    {
      quarter: "Q4 2025",
      status: "future",
      icon: Target,
      title: "Expansion",
      items: [
        "zkInbox privacy features",
        "Twitter/X DM integration",
        "AI spam prevention",
        "Corporate team inboxes"
      ],
      position: "right"
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          badge: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: 'bg-green-500/20 text-green-400',
          card: 'bg-gradient-to-br from-slate-800/90 to-green-900/30'
        };
      case 'active':
        return {
          badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
          icon: 'bg-cyan-500/20 text-cyan-400',
          card: 'bg-gradient-to-br from-slate-800/90 to-cyan-900/30'
        };
      case 'upcoming':
        return {
          badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
          icon: 'bg-purple-500/20 text-purple-400',
          card: 'bg-gradient-to-br from-slate-800/90 to-purple-900/30'
        };
      default:
        return {
          badge: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: 'bg-gray-500/20 text-gray-400',
          card: 'bg-gradient-to-br from-slate-800/90 to-gray-900/30'
        };
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-950 via-slate-950 to-purple-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/5"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="text-cyan-400 text-sm font-medium">Roadmap</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The Journey <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Ahead</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From concept to global adoption. Here's how we're building the future of messaging.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {roadmapItems.map((item, index) => {
              const styles = getStatusStyles(item.status);
              const isLeft = item.position === 'left';
              
              return (
                <div key={index} className="relative flex items-center">
                  {/* Timeline Node */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-slate-950 ${styles.icon} flex items-center justify-center z-10 shadow-lg`}>
                    <item.icon className="w-6 h-6" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full flex ${isLeft ? 'justify-start pr-8' : 'justify-end pl-8'}`}>
                    <div className={`w-full max-w-md ${isLeft ? 'mr-8' : 'ml-8'}`}>
                      <Card className="border-0 backdrop-blur-sm transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden">
                        <div className={`absolute inset-0 ${styles.card.replace('bg-gradient-to-br', 'background: linear-gradient(135deg,')} opacity-90`}></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent"></div>
                        
                        <CardContent className="p-8 relative z-10">
                          {/* Quarter Badge */}
                          <div className="mb-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}>
                              {item.quarter}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-white transition-colors">
                            {item.title}
                          </h3>
                          
                          {/* Items List */}
                          <ul className="space-y-3">
                            {item.items.map((feature, idx) => (
                              <li key={idx} className="text-gray-300 flex items-start gap-3 text-sm leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 backdrop-blur-md rounded-full px-10 py-5 border border-white/20 shadow-2xl">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-white font-medium text-lg">
              Join us on this journey to revolutionize messaging
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}