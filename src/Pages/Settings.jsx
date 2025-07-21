import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Switch } from "../Components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Textarea } from "../Components/ui/textarea";
import { Badge } from "../Components/ui/badge";
import { 
  Settings,
  Zap,
  DollarSign, 
  Clock, 
  MessageSquare, 
  Shield,
  Bell,
  Palette,
  Globe
} from "lucide-react";

export default function SettingsPage() {
  const [inboxPrice, setInboxPrice] = React.useState("100");
  const [autoRefundTime, setAutoRefundTime] = React.useState("24");
  const [autoReply, setAutoReply] = React.useState("Thanks for your message! I'll respond within 24 hours.");
  const [notifications, setNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState("dark");
  const [language, setLanguage] = React.useState("en");

  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      inboxPrice,
      autoRefundTime,
      autoReply,
      notifications,
      theme,
      language
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-slate-700/60 to-purple-700/60 text-slate-200 border-slate-500/30 mb-4 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-1" />
            Total Control. Full Flex. One Wallet.
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Settings className="w-10 h-10 text-yellow-300" />
            Settings
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Customize your txSpeak experience to fit your workflow and preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Pricing Settings */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Inbox Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Minimum TXSPK Price (per message)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={inboxPrice}
                    onChange={(e) => setInboxPrice(e.target.value)}
                    className="bg-gradient-to-r from-slate-800/60 to-purple-900/60 border-slate-600/40 text-white pr-16 focus:border-purple-500/50"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                    TXSPK
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Set your minimum attention price. Messages below this amount will be auto-refunded.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Settings */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Time Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Auto-refund Time (hours)
                </label>
                <Select value={autoRefundTime} onValueChange={setAutoRefundTime}>
                  <SelectTrigger className="bg-gradient-to-r from-slate-800/60 to-purple-900/60 border-slate-600/40 text-white focus:border-purple-500/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600/40">
                    <SelectItem value="1" className="text-white hover:bg-slate-700">1 hour</SelectItem>
                    <SelectItem value="6" className="text-white hover:bg-slate-700">6 hours</SelectItem>
                    <SelectItem value="24" className="text-white hover:bg-slate-700">24 hours</SelectItem>
                    <SelectItem value="72" className="text-white hover:bg-slate-700">3 days</SelectItem>
                    <SelectItem value="168" className="text-white hover:bg-slate-700">1 week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-slate-400 mt-1">
                  Messages will be automatically refunded if not opened within this time.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Settings */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Auto-Reply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Auto-reply Message
                </label>
                <Textarea
                  value={autoReply}
                  onChange={(e) => setAutoReply(e.target.value)}
                  rows={3}
                  className="bg-gradient-to-r from-slate-800/60 to-purple-900/60 border-slate-600/40 text-white resize-none focus:border-purple-500/50"
                  placeholder="Message to display to underfunded senders..."
                />
                <div className="text-xs text-slate-400 mt-1">
                  This message will be shown to senders who don't meet your minimum price.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Security & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/40 to-purple-900/40 rounded-lg border border-slate-600/20">
                <div>
                  <div className="text-white font-medium">Whitelist Only Mode</div>
                  <div className="text-sm text-slate-400">Only accept messages from approved addresses</div>
                </div>
                <Switch className="data-[state=checked]:bg-purple-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/40 to-purple-900/40 rounded-lg border border-slate-600/20">
                <div>
                  <div className="text-white font-medium">ENS Domain Required</div>
                  <div className="text-sm text-slate-400">Only accept messages from ENS domain holders</div>
                </div>
                <Switch className="data-[state=checked]:bg-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/40 to-purple-900/40 rounded-lg border border-slate-600/20">
                <div>
                  <div className="text-white font-medium">Email Notifications</div>
                  <div className="text-sm text-slate-400">Receive email alerts for new messages</div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} className="data-[state=checked]:bg-purple-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/40 to-purple-900/40 rounded-lg border border-slate-600/20">
                <div>
                  <div className="text-white font-medium">Telegram Bridge</div>
                  <div className="text-sm text-slate-400">Forward notifications to Telegram</div>
                </div>
                <Switch className="data-[state=checked]:bg-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-purple-800/40 border-slate-600/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-700/20 to-purple-700/20">
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  UI Theme
                </label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-gradient-to-r from-slate-800/60 to-purple-900/60 border-slate-600/40 text-white focus:border-purple-500/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600/40">
                    <SelectItem value="dark" className="text-white hover:bg-slate-700">Dark Mode</SelectItem>
                    <SelectItem value="light" className="text-white hover:bg-slate-700">Light Mode</SelectItem>
                    <SelectItem value="neon" className="text-white hover:bg-slate-700">Neon</SelectItem>
                    <SelectItem value="pro" className="text-white hover:bg-slate-700">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gradient-to-r from-slate-800/60 to-purple-900/60 border-slate-600/40 text-white focus:border-purple-500/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600/40">
                    <SelectItem value="en" className="text-white hover:bg-slate-700">English</SelectItem>
                    <SelectItem value="cn" className="text-white hover:bg-slate-700">中文</SelectItem>
                    <SelectItem value="kr" className="text-white hover:bg-slate-700">한국어</SelectItem>
                    <SelectItem value="es" className="text-white hover:bg-slate-700">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-slate-700 to-purple-600 hover:from-slate-600 hover:to-purple-500 px-8 py-3 shadow-lg transition-all duration-300"
            >
              <Settings className="w-5 h-5 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}