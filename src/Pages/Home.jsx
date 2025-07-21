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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import HeroSection from "../components/home/HeroSection";
import PresaleSection from "../components/home/PresaleSection";
import FeaturesGrid from "../components/home/FeaturesGrid";
import TokenomicsSection from "../components/home/TokenomicsSection";
import RoadmapSection from "../components/home/RoadmapSection";
import UseCasesSection from "../components/home/UseCasesSection";
import WhaleLeaderboard from "../components/home/WhaleLeaderboard";

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