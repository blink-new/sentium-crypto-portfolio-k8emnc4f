import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { X, ArrowLeft, Check, Eye, EyeOff, ChevronDown, ChevronUp, Settings, Shield, Bell, Moon, Sun, Globe, ChevronRight, Camera } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface WalletPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDisconnect: () => void;
  address: string;
  hasNotification: boolean;
  onActivityTabClick: () => void;
}

type Section = 'tokens' | 'activity' | 'send' | 'receive';
type SendStep = 'select' | 'details' | 'confirm' | 'processing' | 'success';
type View = 'main' | 'settings';

const walletData = {
  balance: '$12,345.67',
  tokens: [
    { 
      name: 'BTC',
      balance: '1,000,000',
      value: '$5,241.87',
      change: '+1000.00%',
      changePositive: true,
      icon: '/btc.png',
      address: '7130d2A12...3Ead9c',
      expanded: false,
      chart: {
        data: [/* Chart data points */],
        timeframe: '1D',
        change: '+0.76%'
      },
      actions: [
        { label: 'Trade', icon: '/trade.png' },
        { label: 'Send', icon: '/send.png' },
        { label: 'Receive', icon: '/receive.png' }
      ]
    },
    { 
      name: 'ETH', 
      balance: '1.5', 
      value: '$3,627.99',
      change: '+8.29%',
      changePositive: true,
      icon: '/eth.png',
      address: '1b5F1368a...C0B51b5',
      expanded: false,
      chart: {
        data: [],
        timeframe: '1D',
        change: '+0.76%'
      },
      actions: [
        { label: 'Trade', icon: '/trade.png' },
        { label: 'Send', icon: '/send.png' },
        { label: 'Receive', icon: '/receive.png' }
      ]
    },
    { 
      name: 'SOL', 
      balance: '25.0', 
      value: '$10,466.56',
      change: '-1.37%',
      changePositive: false,
      icon: '/image325.png',
      address: '570D5ADf1...957d4F',
      expanded: false,
      chart: {
        data: [],
        timeframe: '1D',
        change: '-1.37%'
      },
      actions: [
        { label: 'Trade', icon: '/trade.png' },
        { label: 'Send', icon: '/send.png' },
        { label: 'Receive', icon: '/receive.png' }
      ]
    }
  ],
  activity: [
    {
      type: 'Swap',
      from: {
        amount: '1.0',
        ticker: 'ETH'
      },
      to: {
        amount: '0.07',
        ticker: 'BTC'
      },
      value: '$1,209.33',
      status: 'Completed',
      time: '2h ago',
      date: 'today'
    },
    {
      type: 'Receive',
      to: {
        amount: '100',
        ticker: 'USDT'
      },
      value: '$418.66',
      status: 'Completed',
      time: '5h ago',
      date: 'today'
    },
    {
      type: 'Send',
      from: {
        amount: '0.5',
        ticker: 'ETH'
      },
      value: '$500.00',
      status: 'Completed',
      time: '1d ago',
      date: 'yesterday'
    }
  ]
};

export const WalletPanel = ({ isOpen, onClose, onDisconnect, address, hasNotification, onActivityTabClick }: WalletPanelProps) => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<Section>('tokens');
  const [expandedToken, setExpandedToken] = useState<string | null>(null);
  const [showBalances, setShowBalances] = useState(true);
  const [selectedToken, setSelectedToken] = useState<typeof walletData.tokens[0] | null>(null);
  const [sendStep, setSendStep] = useState<SendStep>('select');
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [currentView, setCurrentView] = useState<View>('main');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfileHover, setShowProfileHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState('/eth.png');
  const [walletLogo, setWalletLogo] = useState('/metamask.png');

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTokenClick = (tokenName: string) => {
    setExpandedToken(expandedToken === tokenName ? null : tokenName);
  };

  const handleTabClick = (section: Section) => {
    setActiveSection(section);
    if (section === 'activity') {
      onActivityTabClick();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sendStep === 'processing' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (sendStep === 'processing' && countdown === 0) {
      setSendStep('success');
    }
    return () => clearTimeout(timer);
  }, [countdown, sendStep]);

  const maskBalance = (value: string) => {
    return showBalances ? value : '******';
  };

  const renderTokenRow = (token: typeof walletData.tokens[0]) => {
    const isExpanded = expandedToken === token.name;
    
    return (
      <div key={token.name} className="border-b border-[#0066ff33] last:border-b-0">
        <div 
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#0066ff0f] transition-colors"
          onClick={() => handleTokenClick(token.name)}
        >
          <div className="flex items-center gap-3">
            <img src={token.icon} alt={token.name} className="w-8 h-8" />
            <div>
              <div className="text-[var(--body-text)] font-semibold flex items-center gap-2">
                {token.name}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              <div className="text-[#75849D] text-sm">
                {showBalances ? token.balance : '******'} {token.name}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[var(--body-text)] font-semibold">
              {showBalances ? token.value : '******'}
            </div>
            <div className={`text-sm ${token.changePositive ? 'text-[#40B66B]' : 'text-[#FF3B3B]'}`}>
              {token.change}
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="p-4 bg-[rgba(0,102,255,0.04)]">
            <div className="h-[200px] bg-[rgba(0,102,255,0.08)] rounded-lg mb-4">
              {/* Chart placeholder */}
              <div className="h-full flex items-center justify-center text-[#75849D]">
                Chart: {token.chart.change}
              </div>
            </div>
            
            <div className="flex gap-2">
              {token.actions.map((action, index) => (
                <Button
                  key={index}
                  className="flex-1 h-10 bg-[rgba(0,102,255,0.08)] hover:bg-[rgba(0,102,255,0.12)] border border-[rgba(0,102,255,0.2)] rounded-lg text-[var(--body-text)]"
                >
                  <img src={`/${action.label.toLowerCase()}.png`} alt={action.label} className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSendContent = () => {
    switch (sendStep) {
      case 'select':
        return (
          <div className="mt-8 px-5 space-y-4">
            {walletData.tokens.map((token) => (
              <div
                key={token.name}
                className={`p-3 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)] transition-colors cursor-pointer ${
                  selectedToken?.name === token.name
                    ? 'bg-[rgba(0,102,255,0.2)] border-[#0066FF]'
                    : 'hover:bg-[rgba(0,102,255,0.12)]'
                }`}
                onClick={() => {
                  setSelectedToken(token);
                  setSendStep('details');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={token.icon} alt={token.name} className="w-8 h-8" />
                    <div>
                      <div className="text-[var(--body-text)] font-semibold">{token.name}</div>
                      <div className="text-[#75849D] text-sm">{maskBalance(`${token.balance} ${token.name}`)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[var(--body-text)] font-semibold">{maskBalance(token.value)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'details':
        return (
          <div className="mt-8 px-5 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Button
                className="h-7 w-7 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg p-0"
                onClick={() => {
                  setSendStep('select');
                  setSelectedToken(null);
                }}
              >
                <ArrowLeft className="h-4 w-4 text-[var(--body-text)]" />
              </Button>
              <span className="text-[var(--body-text)] font-semibold">Send {selectedToken?.name}</span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[#75849D] text-sm">Amount</label>
                <input
                  type="text"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-12 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg px-4 text-[var(--body-text)] placeholder-[#75849D]"
                />
                <div className="text-right text-[#75849D] text-sm">
                  Available: {maskBalance(`${selectedToken?.balance} ${selectedToken?.name}`)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#75849D] text-sm">Recipient Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter address"
                  className="w-full h-12 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg px-4 text-[var(--body-text)] placeholder-[#75849D]"
                />
              </div>

              <Button
                className="w-full h-12 bg-[#0066ff] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!sendAmount || !recipientAddress}
                onClick={() => setSendStep('confirm')}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="mt-8 px-5 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Button
                className="h-7 w-7 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg p-0"
                onClick={() => setSendStep('details')}
              >
                <ArrowLeft className="h-4 w-4 text-[var(--body-text)]" />
              </Button>
              <span className="text-[var(--body-text)] font-semibold">Confirm Transaction</span>
            </div>

            <div className="space-y-4 p-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)]">
              <div className="space-y-2">
                <div className="text-[#75849D] text-sm">Sending</div>
                <div className="flex items-center gap-2">
                  <img src={selectedToken?.icon} alt={selectedToken?.name} className="w-6 h-6" />
                  <span className="text-[var(--body-text)] font-semibold">{maskBalance(`${sendAmount} ${selectedToken?.name}`)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[#75849D] text-sm">To</div>
                <div className="text-[var(--body-text)] font-mono">{recipientAddress}</div>
              </div>
            </div>

            <Button
              className="w-full h-12 bg-[#0066ff] text-white font-medium rounded-lg"
              onClick={() => setSendStep('processing')}
            >
              Confirm Send
            </Button>
          </div>
        );

      case 'processing':
        return (
          <div className="mt-8 px-5 text-center space-y-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0066ff] border-t-transparent mx-auto" />
            <div>
              <div className="text-[var(--body-text)] font-semibold mb-2">Processing Transaction</div>
              <div className="text-[#75849D]">Please wait... {countdown}s</div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="mt-8 px-5 text-center space-y-6">
            <div className="h-12 w-12 rounded-full bg-[#0066ff] flex items-center justify-center mx-auto">
              <Check className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-[var(--body-text)] font-semibold mb-2">Transaction Complete!</div>
              <div className="text-[#75849D]">
                Successfully sent {maskBalance(`${sendAmount} ${selectedToken?.name}`)}
              </div>
            </div>
            <Button
              className="w-full h-12 bg-[#0066ff] text-white font-medium rounded-lg"
              onClick={() => {
                setSendStep('select');
                setSelectedToken(null);
                setSendAmount('');
                setRecipientAddress('');
                setCountdown(3);
              }}
            >
              Done
            </Button>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'activity':
        return (
          <div className="mt-8 px-5 space-y-4">
            {['today', 'yesterday'].map((date) => {
              const transactions = walletData.activity.filter(item => item.date === date);
              if (transactions.length === 0) return null;
              
              return (
                <div key={date} className="space-y-4">
                  <div className="text-[#75849D] text-xs font-medium uppercase">
                    {date}
                  </div>
                  {transactions.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)]">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-[var(--body-text)] font-semibold mb-1">{item.type}</div>
                          <div className="text-[#75849D] text-sm">
                            {item.type === 'Swap' ? 
                              `${maskBalance(`${item.from.amount} ${item.from.ticker}`)} → ${maskBalance(`${item.to.amount} ${item.to.ticker}`)}` :
                              maskBalance(`${item.type === 'Receive' ? item.to.amount : item.from.amount} ${item.type === 'Receive' ? item.to.ticker : item.from.ticker}`)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[var(--body-text)] font-semibold">{maskBalance(item.value)}</div>
                          <div className="text-[#75849D] text-sm">{item.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );

      case 'send':
        return renderSendContent();

      case 'receive':
        return (
          <div className="mt-8 px-5 space-y-6">
            <div className="space-y-2">
              {walletData.tokens.map((token) => (
                <div
                  key={token.name}
                  className={`p-3 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)] transition-colors cursor-pointer ${
                    selectedToken?.name === token.name
                      ? 'bg-[rgba(0,102,255,0.2)] border-[#0066FF]'
                      : 'hover:bg-[rgba(0,102,255,0.12)]'
                  }`}
                  onClick={() => setSelectedToken(token)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <img src={token.icon} alt={token.name} className="w-6 h-6" />
                      <div>
                        <div className="text-[var(--body-text)] font-semibold">{token.name}</div>
                        <div className="text-[#75849D] text-xs font-mono">{token.address}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="h-7 px-2 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)] text-xs">
                        Copy
                      </Button>
                      <Button className="h-7 px-2 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)] text-xs">
                        QR
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="mt-8 px-2">
            {walletData.tokens.length === 0 ? (
              <div className="text-center text-[12.58px] font-medium italic tracking-[0.33px] uppercase text-[#2C353A]">
                NO WALLET BALANCE FOUND
              </div>
            ) : (
              <div className="divide-y divide-[#0066ff33]">
                {walletData.tokens.map(renderTokenRow)}
              </div>
            )}
          </div>
        );
    }
  };

  const renderSettingsContent = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <Button
            className="h-[28px] w-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] p-0 flex items-center justify-center"
            onClick={() => setCurrentView('main')}
          >
            <ArrowLeft className="h-3 w-3 text-[#75849D]" />
          </Button>
          <span className="text-[var(--body-text)] text-lg font-semibold">Settings</span>
          <Button
            className="h-[28px] w-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] p-0 flex items-center justify-center"
            onClick={onClose}
          >
            <X className="h-3 w-3 text-[#75849D]" />
          </Button>
        </div>

        <div className="flex-1 px-4 py-2">
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[var(--body-text)]" />
                  <div>
                    <div className="text-[var(--body-text)] font-semibold">Security</div>
                    <div className="text-[#75849D] text-sm">Protect your wallet</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#75849D]" />
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[var(--body-text)]" />
                  <div>
                    <div className="text-[var(--body-text)] font-semibold">Notifications</div>
                    <div className="text-[#75849D] text-sm">Manage alerts</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#75849D]" />
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-[var(--body-text)]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[var(--body-text)]" />
                  )}
                  <div>
                    <div className="text-[var(--body-text)] font-semibold">Appearance</div>
                    <div className="text-[#75849D] text-sm">Dark mode</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-[#0066ff]' : 'bg-[#2a2b2e]'}`}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isDarkMode ? 'translate-x-2' : '-translate-x-2'}`} />
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[var(--body-text)]" />
                  <div>
                    <div className="text-[var(--body-text)] font-semibold">Language</div>
                    <div className="text-[#75849D] text-sm">English</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#75849D]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-[89px] right-0 w-[400px] h-[626px]">
      <div className="absolute w-full h-full border border-[#001D48] rounded-l-[15px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--popup-bg)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--card-bg-from)] via-[var(--card-bg-via)] to-[var(--card-bg-to)]" />

        <div className="relative h-full">
          {currentView === 'settings' ? (
            renderSettingsContent()
          ) : (
            <>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="relative h-[38px] w-[38px] rounded-full bg-[#0066ff] flex items-center justify-center cursor-pointer group"
                    onMouseEnter={() => setShowProfileHover(true)}
                    onMouseLeave={() => setShowProfileHover(false)}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <img src={profileImage} alt="Profile" className="w-6 h-6" />
                    {showProfileHover && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                  <div className="relative">
                    <Button 
                      className="h-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center gap-2 px-3"
                      onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                    >
                      <img src={walletLogo} alt="Wallet" className="w-4 h-4" />
                      <span className="text-[12px] text-[var(--body-text)]">{address}</span>
                      <ChevronDown className="w-4 h-4 text-[var(--body-text)]" />
                    </Button>
                    
                    {showAddressDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-[var(--popup-bg)] border border-[#0066ff33] rounded-lg overflow-hidden shadow-lg z-50">
                        <Button
                          className="w-full h-[28px] px-3 flex items-center gap-2 text-[#FF3B3B] hover:bg-[#0066ff1a] justify-start"
                          onClick={() => {
                            setShowAddressDropdown(false);
                            onDisconnect();
                          }}
                        >
                          <X className="w-4 h-4" />
                          <span className="text-[12px]">Disconnect</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="h-[28px] w-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px]"
                    onClick={() => setCurrentView('settings')}
                  >
                    <Settings className="h-3 w-3 text-[#75849D]" />
                  </Button>
                  <Button
                    className="h-[28px] w-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px]"
                    onClick={onClose}
                  >
                    <X className="h-3 w-3 text-[#75849D]" />
                  </Button>
                </div>
              </div>

              <div className="px-5">
                <div className="text-[#75849D] text-[15px] font-medium">Limit</div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="text-[var(--body-text)] text-[32px] font-semibold">{maskBalance(walletData.balance)}</div>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-[#0066ff1a]"
                    onClick={() => setShowBalances(!showBalances)}
                  >
                    {showBalances ? (
                      <Eye className="h-4 w-4 text-[var(--body-text)]"  />
                    ) : (
                      <EyeOff className="h-4 w-4 text-[var(--body-text)]" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-6 px-5 flex gap-2">
                {(['tokens', 'activity', 'send', 'receive'] as Section[]).map((section) => (
                  <Button
                    key={section}
                    className={`h-[28px] rounded-lg text-[11px] font-semibold font-inter tracking-[0.33px] capitalize flex items-center justify-center ${
                      activeSection === section
                        ? 'bg-[#0066ff] text-white border border-[#0066ff] flex-1'
                        : 'bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] text-[var(--body-text)] flex-1'
                    }`}
                    onClick={() => {
                      handleTabClick(section);
                      setSendStep('select');
                      setSelectedToken(null);
                      setSendAmount('');
                      setRecipientAddress('');
                      setCountdown(3);
                    }}
                  >
                    {section === 'activity' ? (
                      <div className="relative flex items-center">
                        <span>{section}</span>
                        {hasNotification && (
                          <div className="absolute -top-2 -right-3 w-[14px] h-[14px] bg-[#F23645] rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] font-medium">2</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      section
                    )}
                  </Button>
                ))}
              </div>

              {renderContent()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};