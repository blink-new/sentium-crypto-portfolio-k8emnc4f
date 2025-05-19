import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useXP } from '../contexts/XPContext';
import { Trophy, Star, Target, Zap, Award, ChevronRight, Gift, Sparkles, Clock, Lock, Copy, Check, Shield, Users, Edit2 } from 'lucide-react';
import { XPDisplay } from './XPDisplay';
import { Input } from './ui/input';
import { BadgesList } from './BadgesList';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface RewardsProps {
  isConnected: boolean;
  onConnect: () => void;
}

type Tab = 'active' | 'completed' | 'upcoming';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'active', label: 'Active', icon: Sparkles },
  { id: 'completed', label: 'Completed', icon: Award },
  { id: 'upcoming', label: 'Upcoming', icon: Clock }
];

const rewards = [
  {
    title: 'Trading Volume',
    description: 'Trade more to earn more rewards',
    progress: 45,
    target: '$1,000',
    current: '$450',
    icon: Trophy,
    status: 'active',
    rewards: [
      { milestone: '$100', xp: 50, claimed: true },
      { milestone: '$500', xp: 100, claimed: false },
      { milestone: '$1,000', xp: 200, claimed: false }
    ]
  },
  {
    title: 'Daily Streaks',
    description: 'Login daily to maintain your streak',
    progress: 60,
    target: '30 days',
    current: '18 days',
    icon: Star,
    status: 'active',
    rewards: [
      { milestone: '7 days', xp: 70, claimed: true },
      { milestone: '14 days', xp: 140, claimed: true },
      { milestone: '30 days', xp: 300, claimed: false }
    ]
  },
  {
    title: 'Swap Milestones',
    description: 'Complete more swaps to earn rewards',
    progress: 30,
    target: '100 swaps',
    current: '30 swaps',
    icon: Target,
    status: 'active',
    rewards: [
      { milestone: '10 swaps', xp: 100, claimed: true },
      { milestone: '50 swaps', xp: 250, claimed: false },
      { milestone: '100 swaps', xp: 500, claimed: false }
    ]
  },
  {
    title: 'Quick Trades',
    description: 'Complete trades within 1 minute',
    progress: 80,
    target: '50 quick trades',
    current: '40 quick trades',
    icon: Zap,
    status: 'active',
    rewards: [
      { milestone: '10 trades', xp: 50, claimed: true },
      { milestone: '25 trades', xp: 125, claimed: true },
      { milestone: '50 trades', xp: 250, claimed: false }
    ]
  },
  {
    title: 'First Trade',
    description: 'Complete your first trade',
    progress: 100,
    target: '1 trade',
    current: '1 trade',
    icon: Gift,
    status: 'completed',
    rewards: [
      { milestone: '1 trade', xp: 100, claimed: true }
    ]
  }
];

const upcomingRewards = [
  {
    title: 'Trading Competition',
    description: 'Top traders win exclusive rewards',
    icon: Trophy,
    unlockDate: new Date('2024-04-01T00:00:00'),
    rewards: [
      { position: '1st Place', reward: '1000 XP + Limited Edition NFT' },
      { position: '2nd Place', reward: '750 XP + Rare Badge' },
      { position: '3rd Place', reward: '500 XP + Special Title' }
    ]
  },
  {
    title: 'Community Event',
    description: 'Participate in community activities',
    icon: Star,
    unlockDate: new Date('2024-03-15T00:00:00'),
    rewards: [
      { position: 'Participation', reward: '200 XP' },
      { position: 'Top Contributor', reward: '500 XP' }
    ]
  },
  {
    title: 'Liquidity Provider Program',
    description: 'Provide liquidity to earn special rewards',
    icon: Target,
    unlockDate: new Date('2024-03-20T00:00:00'),
    rewards: [
      { position: 'Bronze Tier', reward: '300 XP + 0.5% Fee Reduction' },
      { position: 'Silver Tier', reward: '600 XP + 1% Fee Reduction' },
      { position: 'Gold Tier', reward: '1000 XP + 2% Fee Reduction' }
    ]
  }
];

export const Rewards: React.FC<RewardsProps> = ({ isConnected, onConnect }) => {
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  const [redeemCode, setRedeemCode] = useState('');
  const [referralCode, setReferralCode] = useState('BOLT-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [newReferralCode, setNewReferralCode] = useState('');
  const [referralError, setReferralError] = useState('');
  const [copied, setCopied] = useState(false);
  const [redeemError, setRedeemError] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState('');
  const [showBadges, setShowBadges] = useState(false);
  const [referralStats] = useState({
    total: 15,
    active: 12,
    pending: 3,
    earned: 3000,
    nextMilestone: 20,
    progress: 75
  });

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: { [key: string]: string } = {};
      upcomingRewards.forEach((reward) => {
        const now = new Date().getTime();
        const distance = reward.unlockDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        newCountdowns[reward.title] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });
      setCountdowns(newCountdowns);
    };

    const timer = setInterval(updateCountdowns, 1000);
    updateCountdowns();

    return () => clearInterval(timer);
  }, []);

  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEditReferralCode = () => {
    setNewReferralCode(referralCode);
    setIsEditingCode(true);
    setReferralError('');
  };

  const validateReferralCode = (code: string) => {
    if (code.length < 4) return 'Code must be at least 4 characters';
    if (code.length > 12) return 'Code must be less than 12 characters';
    if (!/^[A-Z0-9-]+$/.test(code)) return 'Only uppercase letters, numbers, and hyphens allowed';
    return '';
  };

  const handleSaveReferralCode = () => {
    const error = validateReferralCode(newReferralCode);
    if (error) {
      setReferralError(error);
      return;
    }

    setReferralCode(newReferralCode);
    setIsEditingCode(false);
    setReferralError('');
  };

  const handleRedeemCode = () => {
    if (!redeemCode) {
      setRedeemError('Please enter a code');
      return;
    }

    if (redeemCode === 'WELCOME2024') {
      setRedeemSuccess('Successfully redeemed! +100 XP');
      setRedeemError('');
      setRedeemCode('');
    } else {
      setRedeemError('Invalid code');
      setRedeemSuccess('');
    }
  };

  if (!isConnected) {
    return (
      <div className="w-full h-[calc(100vh-84px)] flex items-center justify-center">
        <Button 
          className="h-[48px] bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-[13px] text-lg font-medium px-8"
          onClick={onConnect}
        >
          Connect Wallet
        </Button>
      </div>
    );
  }

  const filteredRewards = rewards.filter(reward => {
    if (activeTab === 'active') return reward.status === 'active';
    if (activeTab === 'completed') return reward.status === 'completed';
    return false;
  });

  const renderUpcomingContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {upcomingRewards.map((reward, index) => (
        <div 
          key={index}
          className="border border-[#0066ff33] rounded-lg bg-[rgba(0,102,255,0.08)] p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#0066ff] flex items-center justify-center">
              <reward.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-[#e2ebfb] text-lg font-semibold">{reward.title}</h3>
              <p className="text-[#75849D] text-sm">{reward.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-[#75849D]" />
            <span className="text-[#75849D] text-sm">Unlocks in: </span>
            <span className="text-[#0066ff] font-medium">{countdowns[reward.title]}</span>
          </div>

          <div className="space-y-3">
            {reward.rewards.map((tier, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg border border-[#0066ff33] bg-[rgba(0,102,255,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-[#75849D]" />
                  <div>
                    <div className="text-[#e2ebfb] text-sm font-medium">{tier.position}</div>
                    <div className="text-[#75849D] text-xs">{tier.reward}</div>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-[#75849D]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-[calc(100vh-84px)] p-6 overflow-auto">
      <div className="max-w-[1200px] mx-auto">
        <div className="w-full border border-[#0066ff33] rounded-lg bg-[rgba(0,102,255,0.08)] p-6 mb-6">
          <XPDisplay />
          <div className="mt-4 flex justify-end">
            <Button
              className="h-12 px-4 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)] flex items-center gap-2"
              onClick={() => setShowBadges(true)}
            >
              <Shield className="w-5 h-5" />
              View Badges
            </Button>
          </div>
        </div>

        <div className="border border-[#0066ff33] rounded-lg bg-[rgba(0,102,255,0.08)] p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[#e2ebfb] text-lg font-semibold mb-1">Your Referral Code</h3>
                  <p className="text-[#75849D] text-sm">Share with friends to earn rewards</p>
                </div>
                <div className="flex items-center gap-2 bg-[rgba(0,102,255,0.04)] border border-[#0066ff33] rounded-lg px-3 py-1">
                  <Users className="w-4 h-4 text-[#0066ff]" />
                  <span className="text-[#e2ebfb] font-medium">{referralStats.total} Referrals</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-[rgba(0,102,255,0.04)] border border-[#0066ff33] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    {isEditingCode ? (
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          value={newReferralCode}
                          onChange={(e) => setNewReferralCode(e.target.value.toUpperCase())}
                          className="flex-1 bg-[rgba(0,102,255,0.08)] border border-[#0066ff33] text-[#e2ebfb] font-mono"
                          placeholder="Enter new code"
                          maxLength={12}
                        />
                        <Button
                          className="h-8 px-3 bg-[#40B66B] text-white rounded-lg hover:bg-[#359759]"
                          onClick={handleSaveReferralCode}
                        >
                          Save
                        </Button>
                        <Button
                          className="h-8 px-3 bg-[#FF3B3B] text-white rounded-lg hover:bg-[#CC2F2F]"
                          onClick={() => {
                            setIsEditingCode(false);
                            setReferralError('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="font-mono text-[#e2ebfb] text-lg">{referralCode}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            className="h-8 w-8 bg-[rgba(0,102,255,0.08)] border border-[#0066ff33] rounded-lg hover:bg-[rgba(0,102,255,0.12)] p-0"
                            onClick={handleEditReferralCode}
                          >
                            <Edit2 className="w-4 h-4 text-[#e2ebfb]" />
                          </Button>
                          <Button
                            className="h-8 px-3 bg-[#0066ff] text-white rounded-lg hover:bg-[#0052cc] flex items-center gap-2"
                            onClick={handleCopyReferral}
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  {referralError && (
                    <p className="text-[#FF3B3B] text-sm mb-2">{referralError}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[#40B66B]">
                      {referralStats.active} Active
                    </span>
                    <span className="text-[#75849D]">
                      {referralStats.pending} Pending
                    </span>
                    <span className="text-[#0066ff]">
                      {referralStats.earned} XP Earned
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(0,102,255,0.04)] border border-[#0066ff33] rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#75849D] text-sm">Next Milestone: {referralStats.nextMilestone} Referrals</span>
                  <span className="text-[#0066ff] text-sm font-medium">+500 XP</span>
                </div>
                <div className="w-full h-2 bg-[rgba(0,102,255,0.2)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0066ff] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${referralStats.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <Separator orientation="vertical" className="mx-6 bg-[#0066ff33]" />
              
              <div className="flex-1">
                <h3 className="text-[#e2ebfb] text-lg font-semibold mb-2">Redeem Code</h3>
                <p className="text-[#75849D] text-sm mb-4">Enter a code to claim rewards</p>
                <div className="flex items-center gap-2">
                  <Input
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 bg-[rgba(0,102,255,0.04)] border border-[#0066ff33] text-[#e2ebfb]"
                  />
                  <Button
                    className="h-12 px-6 bg-[#0066ff] text-white rounded-lg hover:bg-[#0052cc]"
                    onClick={handleRedeemCode}
                  >
                    Redeem
                  </Button>
                </div>
                {redeemError && <p className="text-[#FF3B3B] text-sm mt-2">{redeemError}</p>}
                {redeemSuccess && <p className="text-[#40B66B] text-sm mt-2">{redeemSuccess}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0066ff] text-white'
                  : 'bg-[rgba(0,102,255,0.08)] text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'upcoming' ? (
          renderUpcomingContent()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRewards.map((reward, index) => (
              <div 
                key={index}
                className="border border-[#0066ff33] rounded-lg bg-[rgba(0,102,255,0.08)] p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0066ff] flex items-center justify-center">
                    <reward.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#e2ebfb] text-lg font-semibold">{reward.title}</h3>
                    <p className="text-[#75849D] text-sm">{reward.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#75849D]">{reward.current}</span>
                    <span className="text-[#e2ebfb]">{reward.target}</span>
                  </div>
                  <div className="w-full h-2 bg-[rgba(0,102,255,0.2)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0066ff] rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${reward.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {reward.rewards.map((milestone, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-[#0066ff33] bg-[rgba(0,102,255,0.04)]"
                    >
                      <div className="flex items-center gap-3">
                        <Award className={`w-5 h-5 ${milestone.claimed ? 'text-[#40B66B]' : 'text-[#75849D]'}`} />
                        <div>
                          <div className="text-[#e2ebfb] text-sm font-medium">{milestone.milestone}</div>
                          <div className="text-[#75849D] text-xs">{milestone.xp} XP</div>
                        </div>
                      </div>
                      {milestone.claimed ? (
                        <span className="text-[#40B66B] text-sm">Claimed</span>
                      ) : (
                        <Button 
                          className="h-8 px-4 bg-[#0066ff] text-white text-sm rounded-lg disabled:opacity-50"
                          disabled={reward.progress < 100}
                        >
                          Claim
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <BadgesList isOpen={showBadges} onClose={() => setShowBadges(false)} />
      </div>
    </div>
  );
};