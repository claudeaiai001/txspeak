import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool,
  Zap,
  Send, 
  Paperclip, 
  Calculator,
  Lock
} from "lucide-react";

export default function Compose() {
  const [recipient, setRecipient] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [txspkAmount, setTxspkAmount] = React.useState([100]);
  const [isEncrypted, setIsEncrypted] = React.useState(false);
  const [attachments, setAttachments] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState("");

  const powerTemplates = [
    { id: "whale", label: "Whale Hunter", placeholder: "One token buys you a seat at the billionaire's inbox..." },
    { id: "founder", label: "Founder Fast-Lane", placeholder: "Skip the cold e-mail graveyard—pay to pitch, get read..." },
    { id: "secret", label: "Secret Admirer", placeholder: "Send love notes only they can decrypt..." },
    { id: "consultant", label: "Consultant Concierge", placeholder: "Set your rate, sip coffee, let the inbox fill..." }
  ];

  const gasEstimate = 0.0025; // ETH
  const usdValue = txspkAmount[0] * 0.15; // Assuming 1 TXSPK = $0.15

  const handleSend = () => {
    if (!recipient || !message) return;
    
    console.log({
      recipient,
      message,
      amount: txspkAmount[0],
      encrypted: isEncrypted,
      attachments
    });
    
    // Reset form
    setRecipient("");
    setMessage("");
    setTxspkAmount([100]);
    setIsEncrypted(false);
    setAttachments([]);
    setSelectedTemplate(""); // Reset selected template
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
            <Zap className="w-4 h-4 mr-1" />
            Pay. Speak. Get Heard.
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <PenTool className="w-10 h-10" />
            Compose Message
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Send a premium message with TXSPK to guarantee delivery and attention.
          </p>
          <p className="text-lg text-cyan-400 font-medium italic">
            "Attach money, hit send—zero awkward follow-ups."
          </p>
        </div>

        <Card className="bg-[#1E293B] border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Send className="w-6 h-6 text-purple-400" />
              New Power Move
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message Template
              </label>
              <div className="grid grid-cols-2 gap-2">
                {powerTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setMessage(template.placeholder);
                    }}
                    className={selectedTemplate === template.id ? 
                      "bg-purple-600 hover:bg-purple-700" : 
                      "border-white/20 text-white hover:bg-white/10"
                    }
                  >
                    {template.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To: Whale Address / ENS Domain
              </label>
              <Input
                placeholder="vitalik.eth or 0x1234... (billionaire's inbox awaits)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-[#0B0F19] border-white/20 text-white"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <Textarea
                placeholder="Write your power move here... (Markdown supported)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="bg-[#0B0F19] border-white/20 text-white resize-none"
              />
            </div>

            {/* TXSPK Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-300">
                  Whale Bait Amount
                </label>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">
                    {txspkAmount[0]} TXSPK
                  </div>
                  <div className="text-sm text-gray-400">
                    ≈ ${usdValue.toFixed(2)} USD
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    {txspkAmount[0] >= 1000 ? "Whale-tier attention" : 
                     txspkAmount[0] >= 500 ? "Executive-level access" : 
                     "Standard delivery"}
                  </div>
                </div>
              </div>
              <Slider
                value={txspkAmount}
                onValueChange={setTxspkAmount}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10 TXSPK (Basic)</span>
                <span>1000 TXSPK (Whale Tier)</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  IPFS Attachments
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                    Click to upload files
                  </label>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    {attachments.length} file(s) selected
                  </div>
                )}
              </div>

              {/* Encryption Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Privacy Options
                </label>
                <div className="flex items-center justify-between p-4 bg-[#0B0F19] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Encrypt Message</span>
                  </div>
                  <Switch
                    checked={isEncrypted}
                    onCheckedChange={setIsEncrypted}
                  />
                </div>
              </div>
            </div>

            {/* Gas Calculator */}
            <div className="p-4 bg-[#0B0F19] rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">Transaction Preview</span>
                </div>
                <div className="text-sm text-gray-400">
                  Estimated Gas: {gasEstimate} ETH
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">TXSPK Amount:</div>
                  <div className="text-white font-medium">{txspkAmount[0]} TXSPK</div>
                </div>
                <div>
                  <div className="text-gray-400">USD Value:</div>
                  <div className="text-white font-medium">${usdValue.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!recipient || !message}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 py-3 text-lg font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              Launch Whale Hunt
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}