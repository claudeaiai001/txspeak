import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Coins, 
  PieChart,
  TrendingUp
} from "lucide-react";

export default function TokenomicsSection() {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const tokenomics = [
    { 
      label: "Public Sale", 
      value: "250,000,000 TXSPK", 
      percentage: 25,
      color: "#8B5CF6",
      description: "Early supporters & community"
    },
    { 
      label: "Private Sale", 
      value: "200,000,000 TXSPK", 
      percentage: 20,
      color: "#EC4899",
      description: "Strategic investors & partners"
    },
    { 
      label: "Team & Advisors", 
      value: "150,000,000 TXSPK", 
      percentage: 15,
      color: "#10B981",
      description: "Core team & advisors (vested)"
    },
    { 
      label: "Liquidity Pools", 
      value: "150,000,000 TXSPK", 
      percentage: 15,
      color: "#06B6D4",
      description: "DEX liquidity & market making"
    },
    { 
      label: "Ecosystem Fund", 
      value: "100,000,000 TXSPK", 
      percentage: 10,
      color: "#F59E0B",
      description: "Platform development & partnerships"
    },
    { 
      label: "Community DAO", 
      value: "100,000,000 TXSPK", 
      percentage: 10,
      color: "#EF4444",
      description: "Governance & community rewards"
    },
    { 
      label: "Treasury", 
      value: "50,000,000 TXSPK", 
      percentage: 5,
      color: "#8B5CF6",
      description: "Emergency fund & future development"
    }
  ];

  // Calculate angles for pie chart
  const createPieSlices = () => {
    let cumulativeAngle = 0;
    return tokenomics.map((item, index) => {
      const angle = (item.percentage / 100) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      cumulativeAngle += angle;

      // Calculate path for SVG
      const centerX = 150;
      const centerY = 150;
      const radius = 120;
      
      const startAngleRad = (startAngle - 90) * (Math.PI / 180);
      const endAngleRad = (endAngle - 90) * (Math.PI / 180);
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      return {
        ...item,
        pathData,
        index
      };
    });
  };

  const pieSlices = createPieSlices();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-40 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <Badge className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 text-cyan-300 border-cyan-500/30 mb-6 px-6 py-2 text-sm backdrop-blur-sm">
            <Coins className="w-5 h-5 mr-2" />
            $TXSPK Token Distribution
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Token Distribution
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Strategic allocation designed for 
            <span className="text-cyan-400 font-semibold"> sustainable growth </span>
            and community governance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Pie Chart */}
          <div className="flex justify-center">
            <div className="relative">
              <svg width="300" height="300" className="drop-shadow-2xl">
                {/* Chart segments */}
                {pieSlices.map((slice, index) => (
                  <path
                    key={index}
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#0F172A"
                    strokeWidth="2"
                    className={`cursor-pointer transition-all duration-300 ${
                      hoveredSegment === index ? 'opacity-100 drop-shadow-lg' : 'opacity-90'
                    }`}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      filter: hoveredSegment === index ? 'brightness(1.2)' : 'brightness(1)',
                      transform: hoveredSegment === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: '150px 150px'
                    }}
                  />
                ))}
                
                {/* Percentage labels */}
                {pieSlices.map((slice, index) => {
                  const angle = (slice.percentage / 100) * 360;
                  const startAngle = pieSlices.slice(0, index).reduce((sum, item) => sum + (item.percentage / 100) * 360, 0);
                  const midAngle = startAngle + angle / 2;
                  const labelRadius = 90;
                  const labelAngleRad = (midAngle - 90) * (Math.PI / 180);
                  const labelX = 150 + labelRadius * Math.cos(labelAngleRad);
                  const labelY = 150 + labelRadius * Math.sin(labelAngleRad);
                  
                  return (
                    <text
                      key={`label-${index}`}
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white text-sm font-bold drop-shadow-lg"
                      style={{
                        fontSize: hoveredSegment === index ? '16px' : '14px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {slice.percentage}%
                    </text>
                  );
                })}
              </svg>
              
              {/* Center circle with total supply */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-full w-20 h-20 flex flex-col items-center justify-center border border-white/20">
                  <div className="text-xs text-gray-400">Total</div>
                  <div className="text-sm font-bold text-white">1B</div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Distribution Details */}
          <div>
            <Card className="bg-slate-900/50 border-white/10 backdrop-blur-sm relative overflow-hidden">
              {/* Card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="space-y-4">
                  {tokenomics.map((item, index) => (
                    <div 
                      key={index} 
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className={`flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300 ${
                        hoveredSegment === index ? 'bg-white/10 transform scale-105' : 'hover:bg-white/5'
                      }`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="w-4 h-4 rounded-full transition-all duration-300"
                              style={{ 
                                backgroundColor: item.color,
                                boxShadow: hoveredSegment === index ? `0 0 20px ${item.color}50` : 'none'
                              }}
                            ></div>
                            <div className={`font-bold text-lg transition-colors ${
                              hoveredSegment === index ? 'text-white' : 'text-gray-200'
                            }`}>
                              {item.label}
                            </div>
                          </div>
                          <div className={`text-sm ml-7 transition-colors ${
                            hoveredSegment === index ? 'text-gray-200' : 'text-gray-400'
                          }`}>
                            {item.value}
                          </div>
                          <div className={`text-xs ml-7 mt-1 transition-colors ${
                            hoveredSegment === index ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div 
                            className={`font-bold text-2xl transition-all duration-300 ${
                              hoveredSegment === index 
                                ? 'text-white scale-110' 
                                : 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                            }`}
                          >
                            {item.percentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Total Supply Footer */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      <span className="font-bold text-white text-lg">Total Supply</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        1,000,000,000 TXSPK
                      </div>
                      <div className="text-sm text-gray-400">100% Allocated</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}