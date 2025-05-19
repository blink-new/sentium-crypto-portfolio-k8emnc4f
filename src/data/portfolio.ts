export const portfolioData = {
  address: '0x1234...5678',
  totalBalance: '$102,345.67',
  dayChange: '+$523.45',
  dayChangePercentage: '+4.20%',
  biggestGainer: {
    name: 'Bitcoin',
    ticker: 'BTC',
    icon: '/image324.png',
    change: '+5.8%'
  },
  biggestLoser: {
    name: 'Solana',
    ticker: 'SOL',
    icon: '/image325.png',
    change: '-1.2%'
  },
  portfolioAge: '127 days',
  wallets: [
    {
      name: 'Main Wallet',
      address: '0x1234...5678',
      balance: '2.5 ETH',
      isActive: true
    },
    {
      name: 'Trading Wallet',
      address: '0x8765...4321',
      balance: '0.5 BTC',
      isActive: false
    },
    {
      name: 'DeFi Wallet',
      address: '0x9876...2345',
      balance: '1000 USDT',
      isActive: false
    }
  ],
  tokens: [
    {
      name: 'Ethereum',
      ticker: 'ETH',
      icon: '/image323.png',
      balance: '1.5',
      value: '$3,627.99',
      change: '+8.29%'
    },
    {
      name: 'Bitcoin',
      ticker: 'BTC',
      icon: '/image324.png',
      balance: '0.1',
      value: '$5,241.87',
      change: '+7.2%'
    },
    {
      name: 'Solana',
      ticker: 'SOL',
      icon: '/image325.png',
      balance: '25.0',
      value: '$10,466.56',
      change: '+5.37%'
    },
    {
      name: 'Arbitrum',
      ticker: 'ARB',
      icon: '/image326.png',
      balance: '1000.0',
      value: '$1,000.00',
      change: '+4.1%'
    }
  ],
  recentTransactions: [
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
      status: 'Completed',
      time: '2h ago'
    },
    {
      type: 'Receive',
      to: {
        amount: '100',
        ticker: 'USDT'
      },
      status: 'Completed',
      time: '5h ago'
    },
    {
      type: 'Send',
      from: {
        amount: '0.5',
        ticker: 'ETH'
      },
      status: 'Completed',
      time: '1d ago'
    }
  ]
};