import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Trophy, Star, Crown, Diamond, Shield } from 'lucide-react';
import { Badge } from './ui/badge';

interface RanksListProps {
  isOpen: boolean;
  onClose: () => void;
}

const ranks = [
  { 
    level: 1,
    name: 'Bronze',
    title: 'Novice Trader',
    color: '#CD7F32',
    icon: Shield,
    xpRequired: 0,
    perks: ['Basic trading features', 'Standard swap limits']
  },
  { 
    level: 2,
    name: 'Silver',
    title: 'Apprentice Trader',
    color: '#C0C0C0',
    icon: Star,
    xpRequired: 100,
    perks: ['Reduced trading fees', 'Higher swap limits']
  },
  { 
    level: 3,
    name: 'Gold',
    title: 'Skilled Trader',
    color: '#FFD700',
    icon: Trophy,
    xpRequired: 300,
    perks: ['Priority support', 'Advanced trading features']
  },
  { 
    level: 4,
    name: 'Platinum',
    title: 'Expert Trader',
    color: '#E5E4E2',
    icon: Diamond,
    xpRequired: 600,
    perks: ['VIP support', 'Custom swap limits']
  },
  { 
    level: 5,
    name: 'Diamond',
    title: 'Master Trader',
    color: '#B9F2FF',
    icon: Diamond,
    xpRequired: 1000,
    perks: ['Exclusive features', 'Maximum swap limits']
  },
  { 
    level: 6,
    name: 'Master',
    title: 'Elite Trader',
    color: '#FF4D4D',
    icon: Crown,
    xpRequired: 1500,
    perks: ['Early access to new features', 'Special rewards']
  },
  { 
    level: 7,
    name: 'Elite',
    title: 'Legendary Trader',
    color: '#9D00FF',
    icon: Crown,
    xpRequired: 2100,
    perks: ['Unique badge', 'Premium benefits']
  },
  { 
    level: 8,
    name: 'Legend',
    title: 'Divine Trader',
    color: '#00FFB2',
    icon: Crown,
    xpRequired: 2800,
    perks: ['Exclusive events access', 'Special rewards']
  },
  { 
    level: 9,
    name: 'Mythical',
    title: 'Mythical Trader',
    color: '#FF00FF',
    icon: Crown,
    xpRequired: 3600,
    perks: ['Unique profile features', 'Maximum benefits']
  },
  { 
    level: 10,
    name: 'Divine',
    title: 'Celestial Trader',
    color: '#FFD700',
    icon: Crown,
    xpRequired: 4500,
    perks: ['All platform benefits', 'Legendary status']
  }
];

export const RanksList = ({ isOpen, onClose }: RanksListProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#1a1b1e] border-[#0066ff33] text-[#e2ebfb]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Trading Ranks</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {ranks.map((rank) => (
            <div 
              key={rank.level}
              className="p-4 rounded-lg border border-[#0066ff33] bg-[rgba(0,102,255,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: rank.color }}
                >
                  <rank.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold">{rank.title}</span>
                    <Badge 
                      variant="outline" 
                      className="border-[#0066ff33]"
                      style={{ color: rank.color }}
                    >
                      {rank.name}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-[#75849D]">
                    Level {rank.level} • {rank.xpRequired} XP Required
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {rank.perks.map((perk, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-[#e2ebfb]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rank.color }} />
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};