import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Trophy, Star, Crown, Diamond, Shield, ChevronRight, Lock } from 'lucide-react';
import { Badge } from './ui/badge';

interface BadgesListProps {
  isOpen: boolean;
  onClose: () => void;
}

const badges = [
  { 
    name: 'Connect Twitter / X',
    description: 'This badge is awarded to users who have connected their Twitter account.',
    icon: Star,
    color: '#1DA1F2',
    earned: false,
    xp: 50,
    requirements: ['Connect your Twitter/X account']
  },
  { 
    name: 'Connect Discord',
    description: 'This badge is awarded to users who have connected their Discord account.',
    icon: Shield,
    color: '#7289DA',
    earned: false,
    xp: 50,
    requirements: ['Connect your Discord account']
  },
  { 
    name: 'Fund Your Account',
    description: 'This badge is awarded to those who have funded their account.',
    icon: Diamond,
    color: '#40B66B',
    earned: true,
    xp: 100,
    requirements: ['Fund your account with any amount']
  },
  { 
    name: 'App Voter',
    description: 'This badge is awarded to those who have upvoted at least one app in the portal.',
    icon: Crown,
    color: '#FFD700',
    earned: false,
    xp: 75,
    requirements: ['Upvote at least one app in the portal']
  },
  { 
    name: 'The Trader',
    description: 'This badge is awarded to users who trade on the Portal at least once.',
    icon: Trophy,
    color: '#FF6B6B',
    earned: true,
    xp: 150,
    requirements: ['Complete at least one trade']
  }
];

export const BadgesList = ({ isOpen, onClose }: BadgesListProps) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'earned' | 'unearned'>('all');

  const filteredBadges = badges.filter(badge => {
    if (selectedFilter === 'earned') return badge.earned;
    if (selectedFilter === 'unearned') return !badge.earned;
    return true;
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[900px] bg-[var(--popup-bg)] border-[#0066ff33] text-[#e2ebfb]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-4">Achievement Badges</DialogTitle>
          <div className="flex justify-center gap-2">
            {(['all', 'earned', 'unearned'] as const).map((filter) => (
              <Button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`h-8 px-4 rounded-lg capitalize ${
                  selectedFilter === filter
                    ? 'bg-[#0066ff] text-white'
                    : 'bg-[rgba(0,102,255,0.08)] text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)]'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </DialogHeader>
        
        <div className="mt-4 grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {filteredBadges.map((badge, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                badge.earned
                  ? 'border-[#0066ff] bg-[rgba(0,102,255,0.12)]'
                  : 'border-[#0066ff33] bg-[rgba(0,102,255,0.08)]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center relative ${
                    badge.earned ? 'ring-2 ring-[#0066ff] ring-offset-2 ring-offset-[var(--popup-bg)]' : ''
                  }`}
                  style={{ backgroundColor: badge.color }}
                >
                  <badge.icon className="w-8 h-8 text-white" />
                  {!badge.earned && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#75849D] rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold">{badge.name}</span>
                    <Badge 
                      variant="outline" 
                      className={`${
                        badge.earned 
                          ? 'border-[#0066ff] text-[#0066ff] bg-[rgba(0,102,255,0.08)]' 
                          : 'border-[#75849D] text-[#75849D]'
                      }`}
                    >
                      {badge.earned ? 'Earned' : 'Locked'}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-[#FFD700] text-[#FFD700] bg-[rgba(255,215,0,0.08)]"
                    >
                      +{badge.xp} XP
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-[#75849D] mb-3">{badge.description}</p>

                  <div className="space-y-2">
                    {badge.requirements.map((req, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${badge.earned ? 'bg-[#40B66B]' : 'bg-[#75849D]'}`} />
                        <span className={badge.earned ? 'text-[#40B66B]' : 'text-[#75849D]'}>
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};