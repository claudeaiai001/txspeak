import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Progress } from "../Components/ui/progress";
import { Badge } from "../Components/ui/badge";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Clock,
  Zap,
  Shield,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export default function PresaleSection() {
  const [ethAmount, setEthAmount] = React.useState("0.1");
  const presaleProgress = 78.34;
  const ethRaised = 5.431;
  const hardcap = 7.000;
  const participants = 2847;
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = React.useState({
    days: 2,
    hours: 12,
    minutes: 16,
    seconds: 31
  });

  // Calculate TXSPK tokens
  const txspkAmount = ethAmount ? (parseFloat(ethAmount) * 1000).toLocaleString() : "0";

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4 px-3 py-1">
            ⭐ Presale Phase 2 Live
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the 
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> TXSPK Presale</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Early access to the attention economy. Limited time offer.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Progress and Stats */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress Card */}
            <Card className="bg-[#1a1f2e] border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-lg font-semibold">Presale Progress</h3>
                  <span className="text-green-400 font-medium">{presaleProgress}% Complete</span>
                </div>
                <Progress value={presaleProgress} className="h-2 mb-4" />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{ethRaised} ETH Raised</span>
                  <span>{hardcap} ETH Hardcap</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-[#1a1f2e] border-gray-700/50 text-center">
                <CardContent className="p-4">
                  <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{presaleProgress}%</div>
                  <div className="text-xs text-gray-400">% Sold</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-gray-700/50 text-center">
                <CardContent className="p-4">
                  <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{ethRaised} ETH</div>
                  <div className="text-xs text-gray-400">Raised</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-gray-700/50 text-center">
                <CardContent className="p-4">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{participants.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Participants</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-gray-700/50 text-center">
                <CardContent className="p-4">
                  <Coins className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">{hardcap} ETH</div>
                  <div className="text-xs text-gray-400">Hardcap</div>
                </CardContent>
              </Card>
            </div>

            {/* Countdown Timer */}
            <Card className="bg-[#1a1f2e] border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <h3 className="text-white font-semibold">Presale Ends In</h3>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-400">{timeLeft.days}</div>
                    <div className="text-sm text-gray-400">Days</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-400">{timeLeft.hours}</div>
                    <div className="text-sm text-gray-400">Hours</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-400">{timeLeft.minutes}</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-400">{timeLeft.seconds}</div>
                    <div className="text-sm text-gray-400">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Purchase Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1a1f2e] border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  Buy TXSPK Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ETH Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (ETH)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="bg-[#0f1419] border-gray-600 text-white text-lg h-12"
                    placeholder="0.1"
                  />
                </div>

                {/* Token Calculation */}
                <div className="bg-[#0f1419] rounded-lg p-4 border border-gray-600">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">You will receive:</div>
                    <div className="text-2xl font-bold text-purple-400">{txspkAmount} TXSPK</div>
                    <div className="text-xs text-gray-400 mt-1">Rate: 1,000 TXSPK per ETH</div>
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Enter code for bonus"
                      className="bg-[#0f1419] border-gray-600 text-white pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 h-12 text-lg font-semibold"
                  disabled={!ethAmount || parseFloat(ethAmount) <= 0}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Buy TXSPK Tokens
                </Button>

                {/* KYC Status */}
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">KYC Verified</span>
                  <span className="text-green-400">✅</span>
                </div>

                {/* Contract Link */}
                <div className="text-center">
                  <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-sm p-0 h-auto">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Contract on Etherscan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}