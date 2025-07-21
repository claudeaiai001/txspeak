import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { 
  Shield, 
  DollarSign, 
  Lock, 
  Target,
  ArrowRight,
  Code,
  Users,
  Zap,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "../Components/ui/button";
import { Card, CardContent } from "../Components/ui/card";
import { Badge } from "../Components/ui/badge";
import { Progress } from "../Components/ui/progress";

import HeroSection from "../Components/home/HeroSection";
import PresaleSection from "../Components/home/PresaleSection";
import FeaturesGrid from "../Components/home/FeaturesGrid";
import TokenomicsSection from "../Components/home/TokenomicsSection";
import RoadmapSection from "../Components/home/RoadmapSection";
import UseCasesSection from "../Components/home/UseCasesSection";
import WhaleLeaderboard from "../Components/home/WhaleLeaderboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Presale Section */}
      <PresaleSection />
      
      {/* Features Grid */}
      <FeaturesGrid />
      
      {/* Tokenomics */}
      <TokenomicsSection />
      
      {/* Roadmap */}
      <RoadmapSection />
      
      {/* Use Cases */}
      <UseCasesSection />
      
      {/* Whale Leaderboard */}
      <WhaleLeaderboard />
    </div>
  );
}