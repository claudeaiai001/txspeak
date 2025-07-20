import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  Shield, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: DollarSign,
      title: "Pay-to-Message",
      tagline: "No payment = no read.",
      description: "Set your price and only receive messages from those willing to pay.",
      iconBg: "bg-gradient-to-br from-green-400 to-blue-500"
    },
    {
      icon: Shield,
      title: "Spam-Proof Inbox",
      tagline: "Only those who pay can say.",
      description: "Messages without enough stake are automatically rejected and refunded, creating a natural spam filter.",
      iconBg: "bg-gradient-to-br from-pink-400 to-purple-500"
    },
    {
      icon: MessageSquare,
      title: "Message, Earn, or Refund",
      tagline: "Don't open it? They get their tokens back.",
      description: "Full inbox control with customizable refund times, pricing, and access logic for maximum flexibility.",
      iconBg: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Tokenized Attention Market",
      tagline: "Make your inbox work while you sleep.",
      description: "Dynamic pricing of user time and attention creates a fair marketplace for valuable communications.",
      iconBg: "bg-gradient-to-br from-purple-400 to-blue-500"
    },
    {
      icon: ShieldCheck,
      title: "Immutable Proof",
      tagline: "Every word is recorded—forever.",
      description: "All messages are stored on-chain, creating permanent proof of communication.",
      iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      tagline: "Payments in real-time, no delays.",
      description: "Smart contracts handle all transactions instantly with minimal gas fees.",
      iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Every message is a 
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"> micro-transaction </span>
            of respect
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Turn your inbox into a revenue stream with 
            <span className="text-purple-400 font-semibold"> tokenized attention economics</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-black/80 border border-white/10 backdrop-blur-sm transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 relative overflow-hidden"
            >
              {/* Subtle glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent opacity-60"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 text-left relative z-10">
                {/* Icon with gradient background */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 font-medium mb-6 text-base leading-relaxed">
                  {feature.description}
                </p>
                
                <p className="text-purple-300 italic text-base font-bold">
                  "{feature.tagline}"
                </p>
                
                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-full px-10 py-5 border border-white/20 shadow-2xl">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-white font-medium text-lg">
              Ready to monetize your attention? 
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
              Start earning from day one
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}