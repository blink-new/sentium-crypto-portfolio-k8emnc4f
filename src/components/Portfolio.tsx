import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { portfolioData } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Eye, EyeOff, ChevronDown, ChevronUp, Star } from 'lucide-react';

interface PortfolioProps {
  isConnected: boolean;
  onConnect: () => void;
}

type PortfolioSection = 'overview' | 'wallets' | 'archived';

interface ReferralStats {
  total: number;
  active: number;
  pending: number;
  earned: number;
  nextMilestone: number;
  progress: number;
  feeShare: number;
  totalFeesEarned: number;
}

const referralStats: ReferralStats = {
  total: 15,
  active: 12,
  pending: 3,
  earned: 3000,
  nextMilestone: 20,
  progress: 75,
  feeShare: 10,
  totalFeesEarned: 450
};

interface Chain {
  name: string;
  icon: string;
  wallets: {
    name: string;
    address: string;
    balance: string;
    isActive: boolean;
    otherTokens: {
      icon: string;
      name: string;
      balance: string;
    }[];
  }[];
}

const chains: Chain[] = [
  {
    name: 'Ethereum',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    wallets: [
      {
        name: 'Main Wallet',
        address: '9nG...AYQ',
        balance: '$6,000.82',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', name: 'ETH', balance: '1.5' },
          { icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png', name: 'USDC', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png', name: 'USDT', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png', name: 'LINK', balance: '100' },
          { icon: 'https://assets.coingecko.com/coins/images/12504/small/uni.jpg', name: 'UNI', balance: '50' }
        ]
      },
      {
        name: 'Trading Wallet',
        address: '9nG...AYQ',
        balance: '$3,000.82',
        isActive: false,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', name: 'ETH', balance: '0.5' },
          { icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png', name: 'USDC', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/9956/small/4943.png', name: 'DAI', balance: '250' },
          { icon: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png', name: 'AAVE', balance: '10' }
        ]
      }
    ]
  },
  {
    name: 'Bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    wallets: [
      {
        name: 'BTC Wallet',
        address: '1ABC...XYZ',
        balance: '$52,418.66',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', name: 'BTC', balance: '1.2' },
          { icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png', name: 'WBTC', balance: '0.5' }
        ]
      }
    ]
  },
  {
    name: 'Solana',
    icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    wallets: [
      {
        name: 'SOL Wallet',
        address: 'SOL...789',
        balance: '$418.66',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', name: 'SOL', balance: '100' },
          { icon: 'https://assets.coingecko.com/coins/images/13913/small/SOL_RAY_LOGO.jpg', name: 'RAY', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/11970/small/serum-logo.png', name: 'SRM', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/17984/small/Orca_Logo.png', name: 'ORCA', balance: '200' }
        ]
      }
    ]
  },
  {
    name: 'Optimism',
    icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png',
    wallets: [
      {
        name: 'OP Wallet',
        address: 'OP...456',
        balance: '$500.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png', name: 'OP', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png', name: 'SNX', balance: '200' },
          { icon: 'https://assets.coingecko.com/coins/images/25252/small/velodrome.png', name: 'VELO', balance: '1000' }
        ]
      }
    ]
  },
  {
    name: 'Base',
    icon: 'https://assets.coingecko.com/coins/images/32319/small/base.png',
    wallets: [
      {
        name: 'Base Wallet',
        address: 'BASE...123',
        balance: '$100.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', name: 'ETH', balance: '0.05' }
        ]
      }
    ]
  },
  {
    name: 'Fantom',
    icon: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png',
    wallets: [
      {
        name: 'FTM Wallet',
        address: 'FTM...789',
        balance: '$1,000.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png', name: 'FTM', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/15577/small/spirit.PNG', name: 'SPIRIT', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/16133/small/tomb_icon_noBG.png', name: 'TOMB', balance: '200' }
        ]
      }
    ]
  },
  {
    name: 'NEAR',
    icon: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg',
    wallets: [
      {
        name: 'NEAR Wallet',
        address: 'NEAR...321',
        balance: '$200.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg', name: 'NEAR', balance: '200' },
          { icon: 'https://assets.coingecko.com/coins/images/20582/small/aurora.jpg', name: 'AURORA', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/18631/small/octopus-logo.png', name: 'OCT', balance: '500' }
        ]
      }
    ]
  },
  {
    name: 'Arbitrum',
    icon: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
    wallets: [
      {
        name: 'ARB Wallet',
        address: 'ARB...987',
        balance: '$500.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg', name: 'ARB', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/18323/small/arbit.png', name: 'GMX', balance: '20' },
          { icon: 'https://assets.coingecko.com/coins/images/18623/small/magic.png', name: 'MAGIC', balance: '1000' }
        ]
      }
    ]
  },
  {
    name: 'Avalanche',
    icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
    wallets: [
      {
        name: 'AVAX Wallet',
        address: 'AVAX...654',
        balance: '$100.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', name: 'AVAX', balance: '100' },
          { icon: 'https://assets.coingecko.com/coins/images/17569/small/JoeToken.png', name: 'JOE', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', name: 'WAVAX', balance: '50' }
        ]
      }
    ]
  },
  {
    name: 'Polygon',
    icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    wallets: [
      {
        name: 'MATIC Wallet',
        address: 'MATIC...123',
        balance: '$2,000.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png', name: 'MATIC', balance: '2000' },
          { icon: 'https://assets.coingecko.com/coins/images/13970/small/1_pOU6pBMEmiL-ZJVb0CYRjQ.png', name: 'QUICK', balance: '50' },
          { icon: 'https://assets.coingecko.com/coins/images/12467/small/ghst_200.png', name: 'GHST', balance: '100' }
        ]
      }
    ]
  },
  {
    name: 'BNB Chain',
    icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    wallets: [
      {
        name: 'BNB Wallet',
        address: 'BNB...456',
        balance: '$3,500.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', name: 'BNB', balance: '10' },
          { icon: 'https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png', name: 'CAKE', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/16746/small/FLOKI.png', name: 'FLOKI', balance: '1000000' }
        ]
      }
    ]
  },
  {
    name: 'Tron',
    icon: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png',
    wallets: [
      {
        name: 'TRX Wallet',
        address: 'TRX...789',
        balance: '$1,500.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png', name: 'TRX', balance: '15000' },
          { icon: 'https://assets.coingecko.com/coins/images/10803/small/JUST.png', name: 'JST', balance: '10000' },
          { icon: 'https://assets.coingecko.com/coins/images/12424/small/RSunLogo.png', name: 'SUN', balance: '5000' }
        ]
      }
    ]
  },
  {
    name: 'Cosmos',
    icon: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png',
    wallets: [
      {
        name: 'ATOM Wallet',
        address: 'ATOM...321',
        balance: '$800.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png', name: 'ATOM', balance: '100' },
          { icon: 'https://assets.coingecko.com/coins/images/14631/small/osmosis_logo.png', name: 'OSMO', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/16724/small/juno.png', name: 'JUNO', balance: '200' }
        ]
      }
    ]
  },
  {
    name: 'Aptos',
    icon: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png',
    wallets: [
      {
        name: 'APT Wallet',
        address: 'APT...654',
        balance: '$300.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png', name: 'APT', balance: '50' },
          { icon: 'https://assets.coingecko.com/coins/images/28362/small/liquid-staked-aptos-token-icon.png', name: 'stAPT', balance: '25' }
        ]
      }
    ]
  },
  {
    name: 'Sui',
    icon: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
    wallets: [
      {
        name: 'SUI Wallet',
        address: 'SUI...987',
        balance: '$250.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg', name: 'SUI', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/31175/small/Bucket_Protocol.jpg', name: 'BUCK', balance: '500' }
        ]
      }
    ]
  },
  {
    name: 'Cardano',
    icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    wallets: [
      {
        name: 'ADA Wallet',
        address: 'ADA...123',
        balance: '$450.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png', name: 'ADA', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/28295/small/djed.png', name: 'DJED', balance: '500' },
          { icon: 'https://assets.coingecko.com/coins/images/28176/small/minswap.png', name: 'MIN', balance: '2000' }
        ]
      }
    ]
  },
  {
    name: 'Polkadot',
    icon: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
    wallets: [
      {
        name: 'DOT Wallet',
        address: 'DOT...456',
        balance: '$750.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png', name: 'DOT', balance: '100' },
          { icon: 'https://assets.coingecko.com/coins/images/12447/small/astar.png', name: 'ASTR', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/12368/small/Moonbeam.png', name: 'GLMR', balance: '500' }
        ]
      }
    ]
  },
  {
    name: 'zkSync',
    icon: 'https://assets.coingecko.com/coins/images/25947/small/zksync.jpeg',
    wallets: [
      {
        name: 'zkSync Wallet',
        address: 'ZKS...789',
        balance: '$350.00',
        isActive: true,
        otherTokens: [
          { icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', name: 'ETH', balance: '0.15' },
          { icon: 'https://assets.coingecko.com/coins/images/31323/small/mute.png', name: 'MUTE', balance: '1000' },
          { icon: 'https://assets.coingecko.com/coins/images/31252/small/syncswap.png', name: 'SYNC', balance: '500' }
        ]
      }
    ]
  }
];

interface SortConfig {
  key: 'network' | 'wallets' | 'balance' | 'holdings';
  direction: 'ascending' | 'descending';
}

const WalletsContent = ({ showBalances }: { showBalances: boolean }) => {
  const { t } = useLanguage();
  const [expandedChain, setExpandedChain] = useState<string | null>(null);
  const [hoveredTokens, setHoveredTokens] = useState<{ chainName: string, walletName: string | null, x: number, y: number, tokens: Chain['wallets'][0]['otherTokens'] } | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const maskBalance = (value: string) => showBalances ? value : '******';

  const toggleChain = (chainName: string) => {
    setExpandedChain(expandedChain === chainName ? null : chainName);
  };

  const handleSort = (key: SortConfig['key']) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedChains = React.useMemo(() => {
    if (!sortConfig) return chains;

    return [...chains].sort((a, b) => {
      switch (sortConfig.key) {
        case 'network':
          return sortConfig.direction === 'ascending'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'wallets':
          return sortConfig.direction === 'ascending'
            ? a.wallets.length - b.wallets.length
            : b.wallets.length - a.wallets.length;
        case 'balance':
          const aBalance = parseFloat(a.wallets.reduce((sum, wallet) => 
            sum + parseFloat(wallet.balance.replace('$', '').replace(',', '')), 0).toFixed(2));
          const bBalance = parseFloat(b.wallets.reduce((sum, wallet) => 
            sum + parseFloat(wallet.balance.replace('$', '').replace(',', '')), 0).toFixed(2));
          return sortConfig.direction === 'ascending'
            ? aBalance - bBalance
            : bBalance - aBalance;
        case 'holdings':
          const aHoldings = a.wallets.reduce((sum, wallet) => 
            sum + wallet.otherTokens.length, 0);
          const bHoldings = b.wallets.reduce((sum, wallet) => 
            sum + wallet.otherTokens.length, 0);
          return sortConfig.direction === 'ascending'
            ? aHoldings - bHoldings
            : bHoldings - aHoldings;
        default:
          return 0;
      }
    });
  }, [sortConfig]);

  const renderOtherTokens = (chainName: string, walletName: string | null, tokens: Chain['wallets'][0]['otherTokens']) => {
    const displayTokens = tokens.slice(0, 4);
    const remainingCount = tokens.length - 4;

    return (
      <div 
        className="flex items-center gap-1 relative"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoveredTokens({
            chainName,
            walletName,
            x: rect.left,
            y: rect.bottom,
            tokens
          });
        }}
        onMouseLeave={() => setHoveredTokens(null)}
      >
        {displayTokens.map((token, index) => (
          <div key={index} className="relative">
            <img src={token.icon} alt={token.name} className="w-5 h-5 rounded-full" />
          </div>
        ))}
        {remainingCount > 0 && (
          <span className="text-[#75849D] text-xs">
            +{remainingCount} more
          </span>
        )}

        {hoveredTokens && hoveredTokens.chainName === chainName && hoveredTokens.walletName === walletName && (
          <div 
            className="absolute z-50 bg-[var(--popup-bg)] border border-[#0066ff33] rounded-lg p-4 min-w-[200px]"
            style={{
              top: '100%',
              left: '0',
              marginTop: '8px'
            }}
          >
            <div className="space-y-3">
              {hoveredTokens.tokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={token.icon} alt={token.name} className="w-6 h-6 rounded-full" />
                    <span className="text-[var(--body-text)]">{token.name}</span>
                  </div>
                  <span className="text-[var(--body-text)]">{maskBalance(token.balance)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getSortIcon = (key: SortConfig['key']) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronDown className="w-4 h-4 text-[#75849D] opacity-50" />;
    }
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="w-4 h-4 text-[#0066ff]" />
      : <ChevronDown className="w-4 h-4 text-[#0066ff]" />;
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex items-center py-3 border-b border-[#0066ff33]">
        <div 
          className="w-[250px] text-[#75849D] text-[13px] font-medium font-inter pl-12 flex items-center gap-1 cursor-pointer"
          onClick={() => handleSort('network')}
        >
          Network {getSortIcon('network')}
        </div>
        <div 
          className="w-[200px] text-[#75849D] text-[13px] font-medium font-inter flex items-center gap-1 cursor-pointer"
          onClick={() => handleSort('wallets')}
        >
          Connected Wallets {getSortIcon('wallets')}
        </div>
        <div 
          className="w-[200px] text-[#75849D] text-[13px] font-medium font-inter flex items-center gap-1 cursor-pointer"
          onClick={() => handleSort('balance')}
        >
          Balance {getSortIcon('balance')}
        </div>
        <div 
          className="w-[200px] text-[#75849D] text-[13px] font-medium font-inter flex items-center gap-1 cursor-pointer"
          onClick={() => handleSort('holdings')}
        >
          Other Holdings {getSortIcon('holdings')}
        </div>
        <div className="flex-1 text-right text-[#75849D] text-[13px] font-medium font-inter pr-6">{t('actions')}</div>
      </div>
      <div className="h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar">
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 102, 255, 0.1);
              border-radius: 2px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(0, 102, 255, 0.3);
              border-radius: 2px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 102, 255, 0.4);
            }
          `}
        </style>
        {sortedChains.map((chain) => (
          <div key={chain.name} className={`border-b border-[#0066ff33] ${expandedChain === chain.name ? 'bg-[rgba(0,102,255,0.08)]' : ''}`}>
            <div 
              className={`flex items-center py-3 cursor-pointer hover:bg-[rgba(0,102,255,0.12)] transition-colors group ${
                expandedChain === chain.name ? 'bg-[rgba(0,102,255,0.12)]' : ''
              }`}
              onClick={() => toggleChain(chain.name)}
            >
              <div className="w-[250px]">
                <div className="flex items-center gap-3 pl-12">
                  <img src={chain.icon} alt={chain.name} className="w-8 h-8" />
                  <div>
                    <div className="text-[var(--body-text)] font-semibold">{chain.name}</div>
                    <div className="text-[#75849D] text-xs font-mono">{chain.wallets[0].address}</div>
                  </div>
                </div>
              </div>
              <div className="w-[200px] text-[var(--body-text)] text-[14px] font-semibold font-inter">
                {chain.wallets.length} Wallets
              </div>
              <div className="w-[200px] flex items-center gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={chain.icon} alt={chain.name} className="w-3 h-3" />
                    <div className="text-[var(--body-text)] text-[14px] font-semibold font-inter">
                      {maskBalance(chain.wallets.reduce((acc, wallet) => acc + parseFloat(wallet.balance.replace('$', '').replace(',', '')), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))}
                    </div>
                  </div>
                  <div className="text-[#75849D] text-[11px] font-normal font-inter">
                    {maskBalance(`${chain.wallets.reduce((acc, wallet) => acc + parseFloat(wallet.balance.replace('$', '').replace(',', '')), 0)} ${chain.name}`)}
                  </div>
                </div>
              </div>
              <div className="w-[200px]">
                {renderOtherTokens(chain.name, null, chain.wallets.reduce((acc, wallet) => [...acc, ...wallet.otherTokens], [] as Chain['wallets'][0]['otherTokens']))}
              </div>
              <div className="flex-1 flex justify-end gap-2 pr-6">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                    <img src="/copy.png" alt="Copy" className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                    <img src="/send.png" alt="Send" className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                    <img src="/receive.png" alt="Receive" className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                    <img src="/more.png" alt="More" className="w-4 h-4" />
                  </button>
                </div>
                {expandedChain === chain.name ? (
                  <ChevronUp className="w-4 h-4 text-[var(--body-text)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--body-text)]" />
                )}
              </div>
            </div>
            
            {expandedChain === chain.name && (
              <div>
                {chain.wallets.map((wallet) => (
                  <div 
                    key={wallet.address}
                    className="flex items-center justify-between py-3 border-t border-[#0066ff33] hover:bg-[rgba(0,102,255,0.16)] transition-colors group bg-[rgba(0,102,255,0.12)]"
                  >
                    <div className="w-[250px] pl-12">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${wallet.isActive ? 'bg-[#40B66B]' : 'bg-[#98A1C0]'}`} />
                        <img src="/metamask.png" alt="Wallet" className="w-4 h-4" />
                        <div>
                          <div className="text-[var(--body-text)] text-[14px] font-semibold font-inter">{wallet.name}</div>
                          <span className="text-[#75849D] text-[12px] font-normal font-inter">
                            {wallet.address}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[200px]"></div>
                    <div className="w-[200px] flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <img src={chain.icon} alt={chain.name} className="w-3 h-3" />
                          <div className="text-[var(--body-text)] text-[14px] font-semibold font-inter">
                            {maskBalance(wallet.balance)}
                          </div>
                        </div>
                        <div className="text-[#75849D] text-[11px] font-normal font-inter">
                          {maskBalance(`${wallet.balance} ${chain.name}`)}
                        </div>
                      </div>
                    </div>
                    <div className="w-[200px]">
                      {renderOtherTokens(chain.name, wallet.name, wallet.otherTokens)}
                    </div>
                    <div className="flex-1 flex justify-end gap-2 pr-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                        <img src="/send.png" alt="Send" className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                        <img src="/receive.png" alt="Receive" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ArchivedContent = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-1">
      <div className="w-1/2 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#b1fdf9] text-lg font-semibold font-inter">{t('archived')}</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-[#0066ff33] text-center">
            <p className="text-[#75849D]">{t('noArchivedAssets')}</p>
          </div>
        </div>
      </div>
      <div className="w-px bg-[rgba(0,102,255,0.2)] h-full" />
      <div className="w-1/2 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#b1fdf9] text-lg font-semibold font-inter">{t('archiveHistory')}</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-[#0066ff33] text-center">
            <p className="text-[#75849D]">{t('noArchiveHistory')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewContent = ({ showBalances }: { showBalances: boolean }) => {
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState<'1h' | '1d' | '1w' | 'all'>('1d');
  const maskBalance = (value: string) => showBalances ? value : '******';

  const renderTokenBalance = (balance: string, ticker: string) => {
    const parts = balance.split(' ');
    return (
      <span className="text-[var(--body-text)] text-[14px] font-semibold font-inter">
        {parts[0]}{' '}
        <span className="bg-[#0066ff0f] px-1">
          {ticker}
        </span>
      </span>
    );
  };

  return (
    <div className="flex flex-1">
      <div className="w-1/2 border-r border-[#0066ff33]">
        <div className="w-full flex flex-col h-full">
          <div className="flex items-center px-6 py-3 border-b border-[#0066ff33]">
            <div className="w-[200px] text-[#75849D] text-[13px] font-medium font-inter">{t('tokenName')}</div>
            <div className="w-[150px] text-[#75849D] text-[13px] font-medium font-inter">{t('holding')}</div>
            <div className="w-[150px] text-[#75849D] text-[13px] font-medium font-inter">{t('holdingsAmount')}</div>
            <div className="flex-1 text-right text-[#75849D] text-[13px] font-medium font-inter">{t('actions')}</div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {portfolioData.tokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center py-3 px-6 border-b border-[#0066ff33] hover:bg-[#0066ff0f] transition-colors group"
              >
                <div className="w-[200px] flex items-center gap-3">
                  <img src={token.icon} alt={token.name} className="w-8 h-8" />
                  <div>
                    <div className="text-[var(--body-text)] text-[14px] font-semibold font-inter">{token.name}</div>
                    <span className="bg-[#0066ff0f] text-[var(--body-text)]  w-[27px] h-[15px] inline-flex items-center justify-center text-[10.5px] font-medium font-inter">
                      {token.name === 'Ethereum' || token.name === 'Bitcoin' || token.name === 'Solana' ? 'Native' : 'ERC20'}
                    </span>
                  </div>
                </div>
                <div className="w-[150px]">
                  {renderTokenBalance(`${token.balance} ${token.ticker}`, token.ticker)}
                </div>
                <div className="w-[150px] flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={token.icon} alt={token.name} className="w-3 h-3" />
                      <div className="text-[var(--body-text)] text-[14px] font-semibold font-inter">
                        {maskBalance(token.balance)}
                      </div>
                    </div>
                    <div className="text-[#75849D] text-[11px] font-normal font-inter">
                      {maskBalance(token.value)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                    <img src="/copy.png" alt="Copy" className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center justify-center">
                    <img src="/more.png" alt="More" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#b1fdf9] text-lg font-semibold font-inter">Portfolio Analytics</h2>
          <div className="flex gap-2">
            {(['1h', '1d', '1w', 'all'] as const).map((tf) => (
              <Button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`h-8 px-3 rounded-lg text-sm ${
                  timeframe === tf
                    ? 'bg-[#0066ff] text-white'
                    : 'bg-[rgba(0,102,255,0.08)] text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)]'
                }`}
              >
                {tf.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-[#0066ff33] bg-[rgba(0,102,255,0.08)]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-[#75849D] text-sm mb-1">Total Portfolio Value</div>
                <div className="text-[var(--body-text)] text-2xl font-semibold">
                  {maskBalance(portfolioData.totalBalance)}
                </div>
              </div>
              <div className="text-[#40B66B] text-lg">
                {portfolioData.dayChangePercentage}
              </div>
            </div>
            <div className="h-[200px] bg-[rgba(0,102,255,0.04)] rounded-lg relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#0066ff1a] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0066ff]"></div>
              <div className="absolute bottom-[40px] left-[20%] w-[2px] h-[60px] bg-[#0066ff]"></div>
              <div className="absolute bottom-[80px] left-[40%] w-[2px] h-[20px] bg-[#0066ff]"></div>
              <div className="absolute bottom-[60px] left-[60%] w-[2px] h-[40px] bg-[#0066ff]"></div>
              <div className="absolute bottom-[90px] left-[80%] w-[2px] h-[10px] bg-[#0066ff]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Portfolio = ({ isConnected, onConnect }: PortfolioProps) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<PortfolioSection>('overview');
  const [showBalances, setShowBalances] = useState(true);

  if (!isConnected) {
    return (
      <div className="w-full h-[calc(100vh-84px)] flex items-center justify-center">
        <Button 
          className="h-[48px] bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-[13px] text-lg font-medium px-8"
          onClick={onConnect}
        >
          {t('connectWallet')}
        </Button>
      </div>
    );
  }

  const navigationItems: { key: PortfolioSection; label: string }[] = [
    { key: 'overview', label: t('assetOversight') },
    { key: 'wallets', label: t('myWallets') },
    { key: 'archived', label: t('archived') },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'wallets':
        return <WalletsContent showBalances={showBalances} />;
      case 'archived':
        return <ArchivedContent />;
      default:
        return <OverviewContent showBalances={showBalances} />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="w-full h-[calc(100vh-224px)] px-6 pb-[10px] flex items-start justify-center overflow-hidden">
        <div className="w-[1817px] h-full rounded-[10px] border border-[#0066ff33] bg-gradient-to-br from-[var(--card-bg-from)] via-[var(--card-bg-via)] to-[var(--card-bg-to)] flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 p-3 pl-6 border-b border-[rgba(0,102,255,0.2)]">
            {navigationItems.map((item, index) => (
              <React.Fragment key={item.key}>
                <div className="relative">
                  <button
                    onClick={() => setActiveSection(item.key)}
                    className={`text-[13.5px] font-semibold font-inter transition-colors duration-200 ${
                      activeSection === item.key
                        ? 'text-[var(--body-text)] border-b border-[#36AEF2]'
                        : 'text-[#75849D] hover:text-[var(--body-text)]'
                    }`}
                  >
                    {item.label}
                  </button>
                </div>
                {index < navigationItems.length - 1 && (
                  <Separator orientation="vertical" className="h-4 bg-white/20" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center justify-between text-[var(--body-text)] py-4 px-6 border-b border-[rgba(0,102,255,0.2)]">
            <div className="flex items-center gap-2">
              <span className="text-[#b1fdf9] text-[22px] font-semibold font-inter">{t('hello')},</span>
              <span className="text-[22px] font-semibold font-inter">{portfolioData.address}</span>
              <Button
                variant="ghost"
                className="ml-2 h-8 w-8 p-0 hover:bg-[#0066ff1a]"
                onClick={() => setShowBalances(!showBalances)}
              >
                {showBalances ? (
                  <Eye className="h-4 w-4 text-[var(--body-text)]" />
                ) : (
                  <EyeOff className="h-4 w-4 text-[var(--body-text)]" />
                )}
              </Button>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;