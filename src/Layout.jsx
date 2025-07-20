import React from "react";
import { 
  Mail, 
  Home, 
  Inbox, 
  PenTool, 
  Trophy, 
  Settings, 
  Wallet,
  Sun,
  Moon
} from "lucide-react";

// Mock functions to simulate the original routing (since react-router-dom is not available)
const createPageUrl = (pageName) => `/${pageName.toLowerCase()}`;

// Mock Link component to simulate react-router-dom Link
const Link = ({ to, children, className, onClick }) => (
  <a href={to} className={className} onClick={(e) => {
    e.preventDefault();
    if (onClick) onClick();
    // In a real app, this would be handled by react-router
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }}>
    {children}
  </a>
);

// Mock useLocation hook to simulate react-router-dom useLocation
const useLocation = () => {
  const [pathname, setPathname] = React.useState(window.location.pathname || '/');
  
  React.useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  return { pathname };
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(true);
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const navigationItems = [
    { title: "Home", url: createPageUrl("Home"), icon: Home },
    { title: "Inbox", url: createPageUrl("Inbox"), icon: Inbox },
    { title: "Compose", url: createPageUrl("Compose"), icon: PenTool },
    { title: "Leaderboard", url: createPageUrl("Leaderboard"), icon: Trophy },
    { title: "Settings", url: createPageUrl("Settings"), icon: Settings },
  ];

  const connectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="bg-[#0B0F19] text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-[#0B0F19]/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to={createPageUrl("Home")} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  txSpeak
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      location.pathname === item.url
                        ? 'bg-purple-600/20 text-purple-300'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                {isWalletConnected ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 rounded-lg border border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-medium">0x1234...abcd</span>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20">
          {children || (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  {location.pathname === "/home" || location.pathname === "/" ? "Welcome to txSpeak" :
                   location.pathname === "/inbox" ? "Your Inbox" :
                   location.pathname === "/compose" ? "Compose Message" :
                   location.pathname === "/leaderboard" ? "Leaderboard" :
                   location.pathname === "/settings" ? "Settings" : "Welcome to txSpeak"}
                </h1>
                <p className="text-gray-300">
                  {location.pathname === "/home" || location.pathname === "/" ? "Decentralized messaging protocol" :
                   location.pathname === "/inbox" ? "Check your messages" :
                   location.pathname === "/compose" ? "Write a new message" :
                   location.pathname === "/leaderboard" ? "Top contributors" :
                   location.pathname === "/settings" ? "Manage your preferences" : "Your content goes here"}
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-[#0F1419] border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Docs */}
              <div>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
                  Docs
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="hover:text-white cursor-pointer transition-colors">Whitepaper</p>
                  <p className="hover:text-white cursor-pointer transition-colors">GitHub</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Smart Contract</p>
                  <p className="hover:text-white cursor-pointer transition-colors">IPFS Links</p>
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                  Tools
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="hover:text-white cursor-pointer transition-colors">Explorer</p>
                  <p className="hover:text-white cursor-pointer transition-colors">API Docs</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Audit</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Dashboard</p>
                </div>
              </div>

              {/* Learn */}
              <div>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded-sm"></div>
                  Learn
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="hover:text-white cursor-pointer transition-colors">Blog</p>
                  <p className="hover:text-white cursor-pointer transition-colors">DAO Forum</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Tutorials</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                  Social
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="hover:text-white cursor-pointer transition-colors">Discord</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Twitter</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Telegram</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Lens</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400">
              <p>© 2025 txSpeak Protocol. Powered by Ethereum. Audited by OpenZeppelin.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}