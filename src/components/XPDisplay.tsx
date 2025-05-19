import React, { useState } from 'react';
import { useXP } from '../contexts/XPContext';
import { Badge } from './ui/badge';
import { Trophy, Star, Crown, Diamond, Shield, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { RanksList } from './RanksList';

const badges = {
  1: { name: 'Bronze', color: '#CD7F32', icon: Shield },
  2: { name: 'Silver', color: '#C0C0C0', icon: Star },
  3: { name: 'Gold', color: '#FFD700', icon: Trophy },
  4: { name: 'Platinum', color: '#E5E4E2', icon: Diamond },
  5: { name: 'Diamond', color: '#B9F2FF', icon: Diamond },
  6: { name: 'Master', color: '#FF4D4D', icon: Crown },
  7: { name: 'Elite', color: '#9D00FF', icon: Crown },
  8: { name: 'Legend', color: '#00FFB2', icon: Crown },
  9: { name: 'Mythical', color: '#FF00FF', icon: Crown },
  10: { name: 'Divine', color: '#FFD700', icon: Crown }
};

export const XPDisplay = () => {
  const { xp, level, progress } = useXP();
  const badge = badges[level.level as keyof typeof badges];
  const [showRanks, setShowRanks] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[rgba(0,102,255,0.1)] border-2 border-[#0066ff] flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0066ff]">{level.level}</span>
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: badge.color }}
          >
            <badge.icon className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#e2ebfb] text-lg font-bold">{level.title}</span>
            <Badge 
              variant="outline" 
              className="border-[#0066ff33] text-[#0066ff]"
            >
              {badge.name}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 p-0 hover:bg-[rgba(0,102,255,0.12)]"
              onClick={() => setShowRanks(true)}
            >
              <ChevronRight className="w-4 h-4 text-[#75849D]" />
            </Button>
          </div>

          <div className="relative w-full">
            <div className="w-full h-2 bg-[rgba(0,102,255,0.1)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#0066ff] to-[#36aef2] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="absolute -top-1 left-0 w-full">
              {[25, 50, 75].map((milestone) => (
                <div
                  key={milestone}
                  className={`absolute w-1 h-4 ${
                    progress >= milestone ? 'bg-[#0066ff]' : 'bg-[rgba(0,102,255,0.2)]'
                  }`}
                  style={{ left: `${milestone}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-[#75849D] text-sm">{xp} XP</span>
            <span className="text-[#75849D] text-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <RanksList isOpen={showRanks} onClose={() => setShowRanks(false)} />
    </>
  );
};