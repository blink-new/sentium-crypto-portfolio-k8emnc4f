import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { X, Search, AlertTriangle, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Portal } from './Portal';

const networks = [
  { ticker: 'ETH', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', name: 'Ethereum' },
  { ticker: 'SOL', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', name: 'Solana' },
  { ticker: 'ARB', icon: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg', name: 'Arbitrum' },
  { ticker: 'AVAX', icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', name: 'Avalanche' },
  { ticker: 'MATIC', icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png', name: 'Polygon' },
  { ticker: 'BNB', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', name: 'BNB Chain' },
  { ticker: 'BTC', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', name: 'Bitcoin' },
  { ticker: 'BASE', icon: 'https://assets.coingecko.com/coins/images/32319/small/base.png', name: 'Base' },
  { ticker: 'TRON', icon: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png', name: 'Tron' },
  { ticker: 'OP', icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png', name: 'Optimism' },
  { ticker: 'FTM', icon: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png', name: 'Fantom' },
  { ticker: 'NEAR', icon: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg', name: 'NEAR' }
];

const categories = [
  { key: 'my_tokens', label: 'MY TOKENS' },
  { key: 'popular', label: 'POPULAR' },
  { key: 'meme', label: 'MEME' },
  { key: 'defi', label: 'DEFI' },
  { key: 'stablecoins', label: 'STABLECOINS' }
];

const quickAccessTokens = [
  { name: 'ETH', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', network: 'ETH', isVerified: true },
  { name: 'USDC', icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png', network: 'ETH', isVerified: true },
  { name: 'BTC', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', network: 'BTC', isVerified: true },
  { name: 'USDT', icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png', network: 'ETH', isVerified: true },
  { name: 'SOL', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', network: 'SOL', isVerified: true },
  { name: 'BNB', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', network: 'BNB', isVerified: true }
];

const verifiedTokens = [
  'ETH', 'BTC', 'SOL', 'USDT', 'USDC', 'BNB', 'MATIC', 'AVAX', 'ARB', 'OP', 'LINK', 'UNI', 'AAVE', 'WAVAX'
];

const connectedBalances = {
  'ETH': '1.5',
  'BTC': '0.1',
  'SOL': '25.0',
  'USDC': '1000.0',
  'USDT': '500.0',
  'LINK': '100.0',
  'UNI': '50.0',
  'AAVE': '10.0',
  'SHIB': '1000000.0',
  'BONK': '100000.0',
  'RAY': '100.0',
  'ORCA': '200.0',
  'BNB': '10.0',
  'CAKE': '200.0',
  'FLOKI': '50000.0',
  'ARB': '500.0',
  'GMX': '20.0',
  'MAGIC': '1000.0',
  'AVAX': '100.0',
  'JOE': '1000.0',
  'WAVAX': '50.0',
  'MATIC': '2000.0',
  'QUICK': '50.0',
  'GHST': '100.0',
  'BASE': '100.0',
  'WBTC': '0.05',
  'TRX': '10000.0',
  'JST': '5000.0',
  'SUN': '1000.0',
  'OP': '500.0',
  'SNX': '200.0',
  'VELO': '1000.0',
  'FTM': '1000.0',
  'SPIRIT': '500.0',
  'TOMB': '200.0',
  'NEAR': '200.0',
  'AURORA': '1000.0',
  'OCT': '500.0',
  'PEPE': '1000000.0',
  'WIF': '5000.0',
  'MYRO': '10000.0',
  'BOOK': '50000.0',
  'SLERF': '75000.0',
  'POPCAT': '200000.0',
  'DOGWIFHAT': '15000.0',
  'SAMO': '300000.0',
  'BOME': '150000.0'
};

const allTokens = [
  // Ethereum Tokens
  { name: 'ETH', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', balance: '0.0', category: 'my_tokens', type: 'Native', network: 'ETH', address: '0x0000000000000000000000000000000000000000' },
  { name: 'USDT', icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png', balance: '0.0', category: 'stablecoins', type: 'ERC20', network: 'ETH', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
  { name: 'USDC', icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png', balance: '0.0', category: 'stablecoins', type: 'ERC20', network: 'ETH', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { name: 'UNI', icon: 'https://assets.coingecko.com/coins/images/12504/small/uni.jpg', balance: '0.0', category: 'defi', type: 'ERC20', network: 'ETH', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' },
  { name: 'LINK', icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'ETH', address: '0x514910771af9ca656af840dff83e8264ecf986ca' },
  { name: 'AAVE', icon: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'ETH', address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' },
  { name: 'SHIB', icon: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png', balance: '0.0', category: 'meme', type: 'ERC20', network: 'ETH', address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce' },
  
  // Solana Tokens
  { name: 'SOL', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', balance: '0.0', category: 'my_tokens', type: 'Native', network: 'SOL', address: 'So11111111111111111111111111111111111111111' },
  { name: 'BONK', icon: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg', balance: '0.0', category: 'meme', type: 'SPL', network: 'SOL', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  { name: 'RAY', icon: 'https://assets.coingecko.com/coins/images/13913/small/SOL_RAY_LOGO.jpg', balance: '0.0', category: 'defi', type: 'SPL', network: 'SOL', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
  { name: 'ORCA', icon: 'https://assets.coingecko.com/coins/images/17984/small/Orca_Logo.png', balance: '0.0', category: 'defi', type: 'SPL', network: 'SOL', address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE' },
  
  // BNB Chain Tokens
  { name: 'BNB', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', balance: '0.0', category: 'my_tokens', type: 'Native', network: 'BNB', address: '0x0000000000000000000000000000000000000000' },
  { name: 'CAKE', icon: 'https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png', balance: '0.0', category: 'defi', type: 'BEP20', network: 'BNB', address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' },
  { name: 'FLOKI', icon: 'https://assets.coingecko.com/coins/images/16746/small/FLOKI.png', balance: '0.0', category: 'meme', type: 'BEP20', network: 'BNB', address: '0xfb5b838b6cfeedc2873ab27866079ac55363d37e' },
  
  // Arbitrum Tokens
  { name: 'ARB', icon: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg', balance: '0.0', category: 'popular', type: 'Native', network: 'ARB', address: '0x912ce59144191c1204e64559fe8253a0e49e6548' },
  { name: 'GMX', icon: 'https://assets.coingecko.com/coins/images/18323/small/arbit.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'ARB', address: '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a' },
  { name: 'MAGIC', icon: 'https://assets.coingecko.com/coins/images/18623/small/magic.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'ARB', address: '0x539bde0d7dbd336b79148aa742883198bbf60342' },
  
  // Avalanche Tokens
  { name: 'AVAX', icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', balance: '0.0', category: 'my_tokens', type: 'Native', network: 'AVAX', address: '0x0000000000000000000000000000000000000000' },
  { name: 'JOE', icon: 'https://assets.coingecko.com/coins/images/17569/small/JoeToken.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'AVAX', address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd' },
  { name: 'WAVAX', icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', balance: '0.0', category: 'popular', type: 'Native', network: 'AVAX', address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' },
  
  // Polygon Tokens
  { name: 'MATIC', icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png', balance: '0.0', category: 'popular', type: 'Native', network: 'MATIC', address: '0x0000000000000000000000000000000000000000' },
  { name: 'QUICK', icon: 'https://assets.coingecko.com/coins/images/13970/small/1_pOU6pBMEmiL-ZJVb0CYRjQ.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'MATIC', address: '0x831753dd7087cac61ab5644b308642cc1c33dc13' },
  { name: 'GHST', icon: 'https://assets.coingecko.com/coins/images/12467/small/ghst_200.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'MATIC', address: '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7' },
  
  // Base Tokens
  { name: 'BASE', icon: 'https://assets.coingecko.com/coins/images/32319/small/base.png', balance: '0.0', category: 'popular', type: 'Native', network: 'BASE', address: '0x0000000000000000000000000000000000000000' },
  
  // Bitcoin
  { name: 'BTC', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', balance: '0.0', category: 'my_tokens', type: 'Native', network: 'BTC', address: '0x0000000000000000000000000000000000000000' },
  { name: 'WBTC', icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png', balance: '0.0', category: 'popular', type: 'ERC20', network: 'ETH', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' },
  
  // Tron Tokens
  { name: 'TRX', icon: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png', balance: '0.0', category: 'popular', type: 'Native', network: 'TRON', address: 'T0000000000000000000000000000000000000000' },
  { name: 'JST', icon: 'https://assets.coingecko.com/coins/images/10803/small/JUST.png', balance: '0.0', category: 'defi', type: 'TRC20', network: 'TRON', address: 'TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9' },
  { name: 'SUN', icon: 'https://assets.coingecko.com/coins/images/12424/small/RSunLogo.png', balance: '0.0', category: 'defi', type: 'TRC20', network: 'TRON', address: 'TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S' },
  
  // Optimism Tokens
  { name: 'OP', icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png', balance: '0.0', category: 'popular', type: 'Native', network: 'OP', address: '0x4200000000000000000000000000000000000042' },
  { name: 'SNX', icon: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'OP', address: '0x8700daec35af8ff88c16bdf0418774cb3d7599b4' },
  { name: 'VELO', icon: 'https://assets.coingecko.com/coins/images/25252/small/velodrome.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'OP', address: '0x3c8b650257cfb5f272f799f5e2b4e65093a11a05' },
  
  // Fantom Tokens
  { name: 'FTM', icon: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png', balance: '0.0', category: 'popular', type: 'Native', network: 'FTM', address: '0x0000000000000000000000000000000000000000' },
  { name: 'SPIRIT', icon: 'https://assets.coingecko.com/coins/images/15577/small/spirit.PNG', balance: '0.0', category: 'defi', type: 'ERC20', network: 'FTM', address: '0x5cc61a78f164885776aa610fb0fe1257df78e59b' },
  { name: 'TOMB', icon: 'https://assets.coingecko.com/coins/images/16133/small/tomb_icon_noBG.png', balance: '0.0', category: 'defi', type: 'ERC20', network: 'FTM', address: '0x6c021ae822bea943b2e66552bde1d2696a53fbb7' },
  
  // NEAR Tokens
  { name: 'NEAR', icon: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg', balance: '0.0', category: 'popular', type: 'Native', network: 'NEAR', address: 'near' },
  { name: 'AURORA', icon: 'https://assets.coingecko.com/coins/images/20582/small/aurora.jpg', balance: '0.0', category: 'defi', type: 'NEP141', network: 'NEAR', address: 'aurora' },
  { name: 'OCT', icon: 'https://assets.coingecko.com/coins/images/18631/small/octopus-logo.png', balance: '0.0', category: 'defi', type: 'NEP141', network: 'NEAR', address: 'oct.near' },

  // Adding more meme tokens from DexScreener
  { 
    name: 'PEPE', 
    icon: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg', 
    balance: '0.0', 
    category: 'meme', 
    type: 'ERC20', 
    network: 'ETH', 
    address: '0x6982508145454ce325ddbe47a25d4ec3d2311933'
  },
  { 
    name: 'WIF', 
    icon: 'https://assets.coingecko.com/coins/images/33374/small/wif.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'SPL', 
    network: 'SOL', 
    address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65QAmi'
  },
  { 
    name: 'MYRO', 
    icon: 'https://assets.coingecko.com/coins/images/33969/small/myro.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'ERC20', 
    network: 'ETH', 
    address: '0x0e97c7a0f8b2c9885c8ac9fc6136e829cbc21d42'
  },
  { 
    name: 'BOOK', 
    icon: 'https://assets.coingecko.com/coins/images/33921/small/book.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'ERC20', 
    network: 'ETH', 
    address: '0x9f6aef5d4dec32cf7f4e1daa9dd1c7b5d1d18470'
  },
  { 
    name: 'SLERF', 
    icon: 'https://assets.coingecko.com/coins/images/33977/small/slerf.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'SPL', 
    network: 'SOL', 
    address: 'SLFv6yDEWE5cTmMaYiXgHCjJME2NnixF9YhGKZzuqNh'
  },
  { 
    name: 'POPCAT', 
    icon: 'https://assets.coingecko.com/coins/images/33968/small/popcat.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'ERC20', 
    network: 'ETH', 
    address: '0x2c9c72ff3386411cc35d647f624517d2c358cc69'
  },
  { 
    name: 'DOGWIFHAT', 
    icon: 'https://assets.coingecko.com/coins/images/33983/small/WIF.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'SPL', 
    network: 'SOL', 
    address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65QAmi'
  },
  { 
    name: 'FLOKI', 
    icon: 'https://assets.coingecko.com/coins/images/16746/small/FLOKI.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'ERC20', 
    network: 'ETH', 
    address: '0xcf0c122c6b73ff809c693db761e7baebe62b6a2e'
  },
  { 
    name: 'SAMO', 
    icon: 'https://assets.coingecko.com/coins/images/15051/small/samo.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'SPL', 
    network: 'SOL', 
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
  },
  { 
    name: 'BOME', 
    icon: 'https://assets.coingecko.com/coins/images/33970/small/bome.png', 
    balance: '0.0', 
    category: 'meme', 
    type: 'ERC20', 
    network: 'ETH', 
    address: '0x59544f91a3c8f4c10a0e4b10f8a9a13f2bf8b245'
  }
].map(token => ({
  ...token,
  isVerified: verifiedTokens.includes(token.name)
}));

interface TokenSelectProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: { name: string; icon: string; type?: string; isVerified?: boolean }) => void;
  isWalletConnected?: boolean;
  currentToken?: { name: string; icon: string };
  otherToken?: { name: string; icon: string };
  disabledTokens?: string[];
}

export const TokenSelect = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  isWalletConnected = false, 
  currentToken, 
  otherToken,
  disabledTokens = []
}: TokenSelectProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleNetwork = (ticker: string) => {
    setSelectedNetworks(prev => 
      prev.includes(ticker) 
        ? prev.filter(t => t !== ticker)
        : [...prev, ticker]
    );
    setSelectedCategories([]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setSelectedNetworks([]);
  };

  const toggleAllNetworks = () => {
    setSelectedNetworks(prev => 
      prev.length === networks.length 
        ? [] 
        : networks.map(n => n.ticker)
    );
    setSelectedCategories([]);
  };

  const filteredTokens = useMemo(() => {
    return allTokens
      .filter(token => {
        if (disabledTokens.includes(token.name) || token.name === otherToken?.name) {
          return false;
        }
        
        if (searchQuery && !token.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        if (selectedNetworks.length > 0) {
          return selectedNetworks.includes(token.network);
        }

        if (selectedCategories.length === 0) {
          if (!isWalletConnected) {
            return token.category === 'popular';
          }
          return token.category === 'my_tokens' || token.category === 'popular';
        }

        return selectedCategories.includes(token.category);
      })
      .map(token => ({
        ...token,
        balance: isWalletConnected ? (connectedBalances[token.name] || '0.0') : '0.0'
      }));
  }, [selectedCategories, selectedNetworks, searchQuery, isWalletConnected, otherToken, disabledTokens]);

  const groupedTokens = useMemo(() => {
    const groups: { [key: string]: typeof allTokens } = {};
    
    if (selectedNetworks.length > 0) {
      selectedNetworks.forEach(network => {
        groups[network] = filteredTokens.filter(t => t.network === network);
      });
    } else if (selectedCategories.length === 0) {
      if (isWalletConnected) {
        groups['my_tokens'] = filteredTokens.filter(t => t.category === 'my_tokens');
      }
      groups['popular'] = filteredTokens.filter(t => t.category === 'popular');
    } else {
      selectedCategories.forEach(category => {
        groups[category] = filteredTokens.filter(t => t.category === category);
      });
    }

    return groups;
  }, [filteredTokens, selectedNetworks, selectedCategories, isWalletConnected]);

  const formatBalance = (balance: string) => {
    if (!balance || balance === "0.0" || parseFloat(balance) === 0) return "0";
    return parseFloat(balance).toLocaleString('en-US', { 
      maximumFractionDigits: 6,
      minimumFractionDigits: 0
    });
  };

  const calculateUsdValue = (balance: string, tokenName: string) => {
    const mockPrices: { [key: string]: number } = {
      'ETH': 2418.66,
      'BTC': 52418.66,
      'SOL': 418.66,
      'USDC': 1,
      'USDT': 1,
    };

    const price = mockPrices[tokenName] || 1;
    const value = parseFloat(balance) * price;
    
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Portal>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="sm:max-w-[550px] h-[600px] overflow-hidden bg-[var(--popup-bg)] border-[#0066ff33]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-center flex-1 text-[var(--body-text)]">Select token</DialogTitle>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-[var(--body-text)]"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="flex flex-col h-[calc(100%-60px)]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--body-text)]" />
              <Input
                placeholder="Search token by name"
                className="pl-10 bg-transparent border-[#0066ff33] text-[var(--body-text)] h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-[#b1fdf9]">All Networks</div>
                <Button
                  variant="ghost"
                  className="text-[#0066ff] text-xs hover:text-[#0052cc] h-6 px-2"
                  onClick={toggleAllNetworks}
                >
                  {selectedNetworks.length === networks.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {networks.slice(0, 6).map((network) => (
                  <button
                    key={network.ticker}
                    onClick={() => toggleNetwork(network.ticker)}
                    className={`
                      w-[52px] h-[26px] relative
                      bg-[rgba(0,102,255,0.08)] 
                      border border-[rgba(0,102,255,0.08)]
                      rounded-[5px]
                      flex items-center
                      transition-colors
                      ${selectedNetworks.includes(network.ticker) ? 'bg-[rgba(0,102,255,0.2)] border-[#0066ff]' : ''}
                    `}
                  >
                    <img 
                      src={network.icon} 
                      alt={network.ticker} 
                      className="w-4 h-4 rounded-full ml-2" 
                    />
                    <span className="ml-1 font-poppins text-[10px] font-semibold leading-[18px] tracking-[0.33px] text-[var(--body-text)] capitalize">
                      {network.ticker.toLowerCase()}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-1.5">
                {networks.slice(6).map((network) => (
                  <button
                    key={network.ticker}
                    onClick={() => toggleNetwork(network.ticker)}
                    className={`
                      w-[52px] h-[26px] relative
                      bg-[rgba(0,102,255,0.08)] 
                      border border-[rgba(0,102,255,0.08)]
                      rounded-[5px]
                      flex items-center
                      transition-colors
                      ${selectedNetworks.includes(network.ticker) ? 'bg-[rgba(0,102,255,0.2)] border-[#0066ff]' : ''}
                    `}
                  >
                    <img 
                      src={network.icon} 
                      alt={network.ticker} 
                      className="w-4 h-4 rounded-full ml-2" 
                    />
                    <span className="ml-1 font-poppins text-[10px] font-semibold leading-[18px] tracking-[0.33px] text-[var(--body-text)] capitalize">
                      {network.ticker.toLowerCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-3 bg-[#0066ff33]" />

            <div className="flex items-center justify-between">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => toggleCategory(category.key)}
                  className={`
                    h-[26px] px-2
                    bg-[rgba(0,102,255,0.08)]
                    rounded-lg
                    font-poppins text-[10px] font-semibold
                    leading-[18px] tracking-[0.33px]
                    transition-colors
                    text-[var(--body-text)]
                    ${selectedCategories.includes(category.key) ? 'border border-[#0066ff] bg-[rgba(0,102,255,0.2)]' : 'border border-[rgba(0,102,255,0.2)]'}
                    ${!isWalletConnected && category.key === 'my_tokens' ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  disabled={!isWalletConnected && category.key === 'my_tokens'}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <Separator className="my-3 bg-[#0066ff33]" />

            <div className="flex flex-wrap gap-1.5">
              {quickAccessTokens
                .filter(token => !disabledTokens.includes(token.name) && token.name !== otherToken?.name)
                .map((token) => (
                  <button
                    key={token.name}
                    onClick={() => {
                      onSelect(token);
                      onClose();
                    }}
                    className="h-[26px] px-2 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg flex items-center gap-1.5 hover:bg-[rgba(0,102,255,0.12)] transition-colors"
                  >
                    <img src={token.icon} alt={token.name} className="w-4 h-4" />
                    <span className="text-[var(--body-text)] text-xs font-medium">{token.name}</span>
                  </button>
                ))}
            </div>

            <Separator className="my-3 bg-[#0066ff33]" />

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
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
              <div className="space-y-4">
                {Object.entries(groupedTokens).map(([key, tokens]) => (
                  <div key={key}>
                    <div className="text-[#b1fdf9] text-sm font-semibold mb-2">
                      {selectedNetworks.length > 0 
                        ? networks.find(n => n.ticker === key)?.name
                        : categories.find(c => c.key === key)?.label}
                    </div>
                    <div className="space-y-1">
                      {tokens.map((token, index) => (
                        <Button
                          key={`${token.name}-${index}`}
                          variant="ghost"
                          className="w-full justify-between hover:bg-[#0066ff1a] text-[var(--body-text)] py-2 px-3 h-auto"
                          onClick={() => {
                            onSelect({ ...token, isVerified: token.isVerified });
                            onClose();
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img src={token.icon} alt={token.name} className="w-8 h-8 rounded-full" />
                              {token.network && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--popup-bg)] overflow-hidden">
                                  <img 
                                    src={networks.find(n => n.ticker === token.network)?.icon} 
                                    alt={token.network}
                                    className="w-full h-full rounded-full"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <div className="flex items-center gap-2">
                                <span className="text-base leading-5">{token.name}</span>
                                {token.isVerified && (
                                  <Check className="w-4 h-4 text-[#40B66B]" />
                                )}
                                <div className="h-3 bg-[rgba(0,102,255,0.08)] rounded px-1 flex items-center">
                                  <span className="text-[9px] text-[var(--body-text)] font-medium font-inter">
                                    {token.address.slice(0, 4)}...{token.address.slice(-4)}
                                  </span>
                                </div>
                                {!token.isVerified && (
                                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[rgba(225,255,0,0.1)] rounded">
                                    <AlertTriangle className="w-3 h-3 text-[#E1FF00]" />
                                    <span className="text-[10px] text-[#E1FF00]">Unverified</span>
                                  </div>
                                )}
                              </div>
                              <span className="text-[11px] text-[#75849D] font-medium italic uppercase">
                                {token.type}
                              </span>
                            </div>
                          </div>
                          {isWalletConnected ? (
                            <div className="flex flex-col items-end">
                              <span className="text-[14px] font-medium font-inter text-[var(--body-text)]">
                                {formatBalance(token.balance)}
                              </span>
                              <span className="text-[12px] font-medium font-inter text-[#75849D]">
                                {calculateUsdValue(token.balance, token.name)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[#75849D] text-xs font-medium font-inter">
                              Balance: -
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};