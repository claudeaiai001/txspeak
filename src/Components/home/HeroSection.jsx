import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const powerHooks = [
    "One token buys you a seat at the billionaire's inbox.",
    "Time has a price and attention pays dividends.",
    "Built for the Future of Communication",
    "Turn DMs into dollars on every upload.",
    "Skip the cold e-mail graveyard—pay to pitch, get read.",
    "Set your rate, sip coffee, let the inbox fill."
  ];

  const [currentHook, setCurrentHook] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHook((prev) => (prev + 1) % powerHooks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/20"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge with Glass Effect */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-full mb-8 shadow-lg shadow-purple-500/20">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-purple-300">Your Attention Has a Price Tag</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              The Unreachable Are Now
            </span>
            <br />
            <span className="text-white">
              One Transaction Away.
            </span>
          </h1>

          {/* Dynamic Hook with Glass Container */}
          <div className="h-20 mb-8 flex items-center justify-center">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4 max-w-4xl">
              <motion.p
                key={currentHook}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium italic"
              >
                "{powerHooks[currentHook]}"
              </motion.p>
            </div>
          </div>

         {/* Short intro with Glass Effect */}
          <div className="space-y-6 mb-16">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6 max-w-5xl mx-auto">
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                The first decentralized protocol for paid messaging. Set your inbox price, 
                eliminate spam, and monetize your valuable attention.
              </p>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-10 py-5 text-lg font-semibold group shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
              onClick={() => console.log('Open Inbox clicked')}
            >
              Open Inbox
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="bg-black/30 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-white font-bold px-12 py-5 text-lg rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/30"
              onClick={() => console.log('Whitepaper clicked')}
            >
              <div className="w-6 h-6 mr-3 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              Whitepaper
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Stats Row with Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { 
              label: "Whale Messages", 
              value: "1,247", 
              hook: "Billionaire Inboxes Reached",
              iconBg: "bg-gradient-to-br from-green-400 to-blue-500"
            },
            { 
              label: "Founder Pitches", 
              value: "$89k", 
              hook: "Cold Email Graveyard Bypassed",
              iconBg: "bg-gradient-to-br from-purple-400 to-pink-500"
            },
            { 
              label: "Secret Notes", 
              value: "2,156", 
              hook: "Encrypted Love Letters",
              iconBg: "bg-gradient-to-br from-orange-400 to-red-500"
            },
            { 
              label: "Burn Events", 
              value: "99.2%", 
              hook: "Supply Shrinking Weekly",
              iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500"
            }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group"
            >
              {/* Small icon */}
              <div className={`w-8 h-8 mx-auto mb-3 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 mb-2 font-medium">{stat.label}</div>
              <div className="text-xs text-purple-300 italic font-bold">"{stat.hook}"</div>
              
              {/* Bottom accent line */}
              <div className="mt-4 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}