import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Star, Flame, Sparkles, Brain, Link2, Zap, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { SwapNotification } from './SwapNotification';

interface MarketsProps {
  isConnected: boolean;
}

const marketStats = {
  totalMarketCap: "$2.89T",
  marketCapChange: "+5.2%",
  volume24h: "$198.5B",
  volumeChange: "+12.8%",
  btcDominance: "52.1%",
  dominanceChange: "-0.8%",
  defiTVL: "$58.2B",
  tvlChange: "+3.4%"
};

const marketData = [
  {
    id: 1,
    name: "Ethereum",
    ticker: "ETH",
    price: "$2,418.66",
    change24h: "+8.29%",
    change7d: "+12.85%",
    volume24h: "$1.2B",
    marketCap: "$290.7B",
    tvl: "$8.5B",
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    starred: false,
    boosted: true,
    boost: "2x",
    apy: "12.5%",
    category: "layer1",
    type: "Native"
  },
  {
    id: 2,
    name: "Bitcoin",
    ticker: "BTC",
    price: "$52,418.66",
    change24h: "+7.20%",
    change7d: "+15.32%",
    volume24h: "$25.8B",
    marketCap: "$1.02T",
    tvl: "$15.2B",
    icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    starred: false,
    boosted: true,
    boost: "1.5x",
    apy: "8.2%",
    category: "currency",
    type: "Native"
  },
  {
    id: 3,
    name: "Solana",
    ticker: "SOL",
    price: "$418.66",
    change24h: "+5.37%",
    change7d: "+22.14%",
    volume24h: "$850.5M",
    marketCap: "$45.8B",
    tvl: "$2.8B",
    icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    starred: false,
    boosted: true,
    boost: "3x",
    apy: "15.8%",
    category: "layer1",
    type: "Native"
  },
  {
    id: 4,
    name: "Arbitrum",
    ticker: "ARB",
    price: "$18.66",
    change24h: "+4.10%",
    change7d: "+8.95%",
    volume24h: "$320.2M",
    marketCap: "$8.5B",
    tvl: "$1.2B",
    icon: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
    starred: false,
    category: "layer2",
    type: "Native"
  },
  {
    id: 5,
    name: "Avalanche",
    ticker: "AVAX",
    price: "$12.42",
    change24h: "+11.29%",
    change7d: "+18.73%",
    volume24h: "$280.5M",
    marketCap: "$7.2B",
    tvl: "$950.8M",
    icon: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    starred: false,
    category: "layer1",
    type: "Native"
  },
  {
    id: 6,
    name: "Polygon",
    ticker: "MATIC",
    price: "$1.42",
    change24h: "+6.29%",
    change7d: "+9.73%",
    volume24h: "$180.5M",
    marketCap: "$4.2B",
    tvl: "$750.8M",
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    starred: false,
    category: "layer2",
    type: "Native"
  },
  {
    id: 7,
    name: "Dogecoin",
    ticker: "DOGE",
    price: "$0.12",
    change24h: "+9.25%",
    change7d: "+15.43%",
    volume24h: "$980.1M",
    marketCap: "$16.8B",
    tvl: "$320.4M",
    icon: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    starred: false,
    category: "meme",
    type: "Token"
  },
  {
    id: 8,
    name: "Shiba Inu",
    ticker: "SHIB",
    price: "$0.00001234",
    change24h: "+15.4%",
    change7d: "+20.73%",
    volume24h: "$890.2M",
    marketCap: "$5.9B",
    tvl: "$890.2M",
    icon: "https://assets.coingecko.com/coins/images/11939/small/shiba.png",
    starred: false,
    category: "meme",
    type: "Token"
  },
  {
    id: 9,
    name: "WorldCoin",
    ticker: "WLD",
    price: "$3.45",
    change24h: "+8.15%",
    change7d: "+12.92%",
    volume24h: "$150.3M",
    marketCap: "$31.2B",
    tvl: "$420.5M",
    icon: "https://assets.coingecko.com/coins/images/33810/small/worldcoin.png",
    starred: false,
    category: "ai",
    type: "Token"
  },
  {
    id: 10,
    name: "Fetch.ai",
    ticker: "FET",
    price: "$0.65",
    change24h: "+3.45%",
    change7d: "+6.78%",
    volume24h: "$890.2M",
    marketCap: "$34.5B",
    tvl: "$780.3M",
    icon: "https://assets.coingecko.com/coins/images/5681/small/Fetch.jpg",
    starred: false,
    category: "ai",
    type: "Token"
  }
];

const gainersData = [
  {
    name: "Solana",
    ticker: "SOL",
    price: "$418.66",
    change: "+24.5%",
    icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png"
  },
  {
    name: "Arbitrum",
    ticker: "ARB",
    price: "$18.66",
    change: "+18.2%",
    icon: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg"
  },
  {
    name: "Dogecoin",
    ticker: "DOGE",
    price: "$0.12",
    change: "+16.8%",
    icon: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png"
  },
  {
    name: "Shiba Inu",
    ticker: "SHIB",
    price: "$0.00001234",
    change: "+15.4%",
    icon: "https://assets.coingecko.com/coins/images/11939/small/shiba.png"
  }
];

const losersData = [
  {
    name: "Avalanche",
    ticker: "AVAX",
    price: "$12.42",
    change: "-8.3%",
    icon: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png"
  },
  {
    name: "Polygon",
    ticker: "MATIC",
    price: "$1.42",
    change: "-5.7%",
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"
  },
  {
    name: "Polkadot",
    ticker: "DOT",
    price: "$8.92",
    change: "-4.8%",
    icon: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png"
  },
  {
    name: "Cosmos",
    ticker: "ATOM",
    price: "$9.34",
    change: "-4.2%",
    icon: "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png"
  }
];

export const Markets = ({ isConnected }: MarketsProps) => {
  const { t } = useLanguage();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [activeSection, setActiveSection] = useState<'top' | 'mostVisited' | 'new' | 'memes' | 'ai' | 'chains'>('top');
  const [filteredTokens, setFilteredTokens] = useState(marketData);
  const [quickBuyAmount, setQuickBuyAmount] = useState('0.08');
  const [selectedCrypto] = useState({ name: 'ETH', icon: '/image323.png' });
  const [showBuyConfirmation, setShowBuyConfirmation] = useState(false);
  const [selectedBuyToken, setSelectedBuyToken] = useState<{
    name: string;
    amount: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    type: 'swap' | 'receive' | 'send';
    fromAmount?: string;
    fromToken?: string;
    toAmount?: string;
    toToken?: string;
  } | null>(null);
  const [showGainers, setShowGainers] = useState(true);

  const navigationItems = [
    { key: 'top', label: t('top'), icon: <Star className="w-4 h-4" /> },
    { key: 'mostVisited', label: t('mostVisited'), icon: <Flame className="w-4 h-4" /> },
    { key: 'new', label: t('new'), icon: <Sparkles className="w-4 h-4" /> },
    { key: 'memes', label: t('memes'), icon: <img src="/doge.png" alt="meme" className="w-4 h-4" /> },
    { key: 'ai', label: t('ai'), icon: <Brain className="w-4 h-4" /> },
    { key: 'chains', label: t('chains'), icon: <Link2 className="w-4 h-4" /> },
  ];

  useEffect(() => {
    let filtered = [...marketData];
    switch (activeSection) {
      case 'memes':
        filtered = filtered.filter(token => token.category === 'meme');
        break;
      case 'ai':
        filtered = filtered.filter(token => token.category === 'ai');
        break;
      case 'new':
        filtered = filtered.slice(0, 5);
        break;
      case 'mostVisited':
        filtered = filtered.filter(token => token.volume24h > '$500M');
        break;
      case 'chains':
        filtered = filtered.filter(token => token.type === 'Native');
        break;
      default:
        filtered = filtered.slice(0, 10);
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key as keyof typeof a];
        let bValue = b[sortConfig.key as keyof typeof b];

        if (typeof aValue === 'string' && aValue.startsWith('$')) {
          aValue = parseFloat(aValue.replace(/[$,B,M,T]/g, ''));
          bValue = parseFloat((bValue as string).replace(/[$,B,M,T]/g, ''));
        }

        if (sortConfig.direction === 'ascending') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
    }

    setFilteredTokens(filtered);
  }, [activeSection, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleStar = (id: number) => {
    setFilteredTokens(tokens =>
      tokens.map(token => 
        token.id === id ? { ...token, starred: !token.starred } : token
      )
    );
  };

  const handleBuyClick = (tokenName: string) => {
    setSelectedBuyToken({
      name: tokenName,
      amount: quickBuyAmount
    });
    setShowBuyConfirmation(true);
  };

  const handleConfirmBuy = () => {
    const button = document.querySelector('[data-confirm-buy]');
    if (button) {
      button.textContent = 'Processing...';
      button.setAttribute('disabled', 'true');
    }

    setTimeout(() => {
      setShowBuyConfirmation(false);
      setNotification({
        type: 'swap',
        fromAmount: quickBuyAmount,
        fromToken: 'ETH',
        toAmount: selectedBuyToken?.amount,
        toToken: selectedBuyToken?.name
      });
      setSelectedBuyToken(null);
    }, 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-84px)] p-6 overflow-auto">
      <div className="w-full max-w-[1817px] grid grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <h3 className="text-[#b1fdf9] text-lg font-semibold mb-4 flex items-center gap-2">
            Market Stats
            <span className="text-xs text-[#75849D] font-normal">Last 24h</span>
          </h3>
          <div className="rounded-[10px] border border-[#0066ff33] bg-gradient-to-br from-[var(--card-bg-from)] via-[var(--card-bg-via)] to-[var(--card-bg-to)] p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 group">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#75849D] text-sm">Total Market Cap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium">{marketStats.totalMarketCap}</span>
                      <span className="text-[#40B66B] text-xs">{marketStats.marketCapChange}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 group">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#75849D] text-sm">24h Volume</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium">{marketStats.volume24h}</span>
                      <span className="text-[#40B66B] text-xs">{marketStats.volumeChange}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 group">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#75849D] text-sm">BTC Dominance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium">{marketStats.btcDominance}</span>
                      <span className="text-[#FF3B3B] text-xs">{marketStats.dominanceChange}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 group">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#75849D] text-sm">DeFi TVL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium">{marketStats.defiTVL}</span>
                      <span className="text-[#40B66B] text-xs">{marketStats.tvlChange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <h3 className="text-[#b1fdf9] text-lg font-semibold mb-4 flex items-center gap-2">
            What's New?
            <span className="text-xs text-[#75849D] font-normal">Last 24h</span>
          </h3>
          <div className="rounded-[10px] border border-[#0066ff33] bg-gradient-to-br from-[var(--card-bg-from)] via-[var(--card-bg-via)] to-[var(--card-bg-to)] p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 relative group cursor-pointer">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200 hover:bg-[rgba(0,102,255,0.12)]">
                  <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" className="w-8 h-8" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium group-hover:text-[#36aef2]">Ethereum</span>
                      <span className="text-[#75849D] text-xs">(ETH)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#75849D] text-xs">$2,418.66</span>
                      <span className="text-[#40B66B] text-xs">+8.29%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 group cursor-pointer">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200 hover:bg-[rgba(0,102,255,0.12)]">
                  <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" className="w-8 h-8" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium group-hover:text-[#36aef2]">Bitcoin</span>
                      <span className="text-[#75849D] text-xs">(BTC)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#75849D] text-xs">$52,418.66</span>
                      <span className="text-[#40B66B] text-xs">+7.20%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 relative group cursor-pointer">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200 hover:bg-[rgba(0,102,255,0.12)]">
                  <img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" className="w-8 h-8" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium group-hover:text-[#36aef2]">Solana</span>
                      <span className="text-[#75849D] text-xs">(SOL)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#75849D] text-xs">$418.66</span>
                      <span className="text-[#40B66B] text-xs">+5.37%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 group cursor-pointer">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200 hover:bg-[rgba(0,102,255,0.12)]">
                  <img src="https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg" alt="ARB" className="w-8 h-8" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--body-text)] text-sm font-medium group-hover:text-[#36aef2]">Arbitrum</span>
                      <span className="text-[#75849D] text-xs">(ARB)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#75849D] text-xs">$18.66</span>
                      <span className="text-[#40B66B] text-xs">+4.10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#b1fdf9] text-lg font-semibold flex items-center gap-2">
              {showGainers ? 'Top Gainers' : 'Top Losers'}
              <span className="text-xs text-[#75849D] font-normal">Last 24h</span>
            </h3>
            <div className="h-7 bg-[rgba(0,102,255,0.08)] rounded-lg p-0.5 flex items-center">
              <button
                className={`h-6 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                  showGainers 
                    ? 'bg-[#0066ff] text-white' 
                    : 'text-[var(--body-text)] hover:text-[#36aef2]'
                }`}
                onClick={() => setShowGainers(true)}
              >
                Gainers
              </button>
              <button
                className={`h-6 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                  !showGainers 
                    ? 'bg-[#0066ff] text-white' 
                    : 'text-[var(--body-text)] hover:text-[#36aef2]'
                }`}
                onClick={() => setShowGainers(false)}
              >
                Losers
              </button>
            </div>
          </div>
          <div className="rounded-[10px] border border-[#0066ff33] bg-gradient-to-br from-[var(--card-bg-from)] via-[var(--card-bg-via)] to-[var(--card-bg-to)] p-4">
            <div className="grid grid-cols-2 gap-4">
              {(showGainers ? gainersData : losersData).map((token, index) => (
                <div key={token.name} className="space-y-1 group cursor-pointer">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] transition-all duration-200 hover:bg-[rgba(0,102,255,0.12)]">
                    <img src={token.icon} alt={token.name} className="w-8 h-8" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--body-text)] text-sm font-medium">{token.name}</span>
                        <span className="text-[#75849D] text-xs">({token.ticker})</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#75849D] text-xs">{token.price}</span>
                        <span className={`text-xs ${token.change.startsWith('+') ? 'text-[#40B66B]' : 'text-[#FF3B3B]'}`}>
                          {token.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1817px] h-[calc(50vh)] rounded-[10px] border border-[#0066ff33] bg-gradient-to-br from-[var(--card-bg-from)] via-[var(--card-bg-via)] to-[var(--card-bg-to)] flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(0,102,255,0.2)]">
          <div className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key as any)}
                className={`text-[13px] font-semibold font-inter transition-colors duration-200 flex items-center gap-2 ${
                  activeSection === item.key
                    ? 'text-[#36aef2]'
                    : 'text-[var(--body-text)] hover:text-[#36aef2]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          
          {isConnected && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[var(--body-text)] text-sm">{t('quickBuy')}</span>
                <div className="flex items-center gap-2 bg-[#0066ff0f] border border-[#0066ff33] rounded-lg px-2 py-1">
                  <img src={selectedCrypto.icon} alt={selectedCrypto.name} className="w-4 h-4" />
                  <input
                    type="text"
                    value={quickBuyAmount}
                    onChange={(e) => setQuickBuyAmount(e.target.value)}
                    className="w-16 bg-transparent text-[var(--body-text)] text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto scrollbar-hide">
            <table className="w-full">
              <thead className="sticky top-0 bg-[var(--card-bg-from)] z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">★</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('token')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('price')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('change24h')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('change7d')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('volume24h')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('marketCap')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('tvl')}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">APY</th>
                  {isConnected && (
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#b1fdf9]">{t('quickBuy')}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((item) => (
                  <tr key={item.id} className="border-b border-[#0066ff33] hover:bg-[#0066ff0f]">
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleStar(item.id)}
                        className={`text-base ${item.starred ? 'text-[#ffbe58]' : 'text-[#98A1C0]'} hover:text-[#ffbe58]`}
                      >
                        ★
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img src={item.icon} alt={item.name} className="w-5 h-5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--body-text)] text-sm font-medium">{item.name}</span>
                            <span className="text-[#75849D] text-xs">({item.ticker})</span>
                            {item.boosted && (
                              <Badge variant="boosted" className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {item.boost} Rewards
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[var(--body-text)] text-sm">{item.price}</td>
                    <td className="px-4 py-2">
                      <span className="text-[#40b66b] text-sm">{item.change24h}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-[#40b66b] text-sm">{item.change7d}</span>
                    </td>
                    <td className="px-4 py-2 text-[var(--body-text)] text-sm">{item.volume24h}</td>
                    <td className="px-4 py-2 text-[var(--body-text)] text-sm">{item.marketCap}</td>
                    <td className="px-4 py-2 text-[var(--body-text)] text-sm">{item.tvl}</td>
                    <td className="px-4 py-2">
                      {item.boosted ? (
                        <span className="text-[#36aef2] text-sm font-medium">{item.apy}</span>
                      ) : (
                        <span className="text-[#75849D] text-sm">-</span>
                      )}
                    </td>
                    {isConnected && (
                      <td className="px-4 py-2">
                        <Button
                          onClick={() => handleBuyClick(item.name)}
                          className="flex items-center gap-2 bg-[#0066ff0f] border border-[#0066ff33] rounded-lg px-2 py-1 hover:bg-[#0066ff1a] transition-colors"
                        >
                          <img src="/image323.png" alt="ETH" className="w-4 h-4" />
                          <span className="text-[var(--body-text)] text-sm">{quickBuyAmount}</span>
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={showBuyConfirmation} onOpenChange={() => setShowBuyConfirmation(false)}>
        <DialogContent className="sm:max-w-[425px] bg-[var(--popup-bg)] border-[#0066ff33] text-[var(--body-text)]">
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="p-4 rounded-lg border border-[#0066ff33] bg-[#0066ff0f]">
              <div className="flex justify-between items-center">
                <span>Amount</span>
                <span>{quickBuyAmount} ETH</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Token</span>
                <span>{selectedBuyToken?.name}</span>
              </div>
            </div>
            <Button
              data-confirm-buy
              className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white"
              onClick={handleConfirmBuy}
            >
              Confirm Buy
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {notification && (
        <SwapNotification
          {...notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};