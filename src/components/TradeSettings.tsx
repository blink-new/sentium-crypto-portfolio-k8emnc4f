import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { X, ChevronLeft } from 'lucide-react';
import { Portal } from './Portal';

interface TradeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const liquiditySources = [
  { name: 'Jupiter', percentage: 45, enabled: true },
  { name: 'Raydium', percentage: 30, enabled: true },
  { name: 'Orca', percentage: 25, enabled: true },
  { name: 'Lifinity', percentage: 0, enabled: false },
  { name: 'Meteora', percentage: 0, enabled: false },
  { name: 'GooseFX', percentage: 0, enabled: false },
  { name: 'Crema', percentage: 0, enabled: false },
  { name: 'Saros', percentage: 0, enabled: false },
  { name: 'Step', percentage: 0, enabled: false },
];

export const TradeSettings = ({ isOpen, onClose }: TradeSettingsProps) => {
  const [showLiquiditySources, setShowLiquiditySources] = useState(false);
  const [deadline, setDeadline] = useState(30);
  const [directRoute, setDirectRoute] = useState(false);
  const [smartRouting, setSmartRouting] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [sources, setSources] = useState(liquiditySources);

  const handleChange = () => {
    setIsModified(true);
  };

  const resetDefaults = () => {
    setDeadline(30);
    setDirectRoute(false);
    setSmartRouting(true);
    setSources(liquiditySources);
    setIsModified(false);
  };

  const toggleSource = (index: number) => {
    setSources(prev => {
      const newSources = [...prev];
      newSources[index] = {
        ...newSources[index],
        enabled: !newSources[index].enabled
      };
      return newSources;
    });
    handleChange();
  };

  if (showLiquiditySources) {
    return (
      <Portal>
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
          <DialogContent className="w-[417px] h-[335px] bg-black border border-[rgba(255,255,255,0.5)] shadow-[0px_4px_24px_rgba(105,97,255,0.4)] rounded-[20px] p-0">
            <DialogHeader className="flex flex-row items-center justify-between p-4">
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setShowLiquiditySources(false)}
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </Button>
              <DialogTitle className="text-center flex-1 text-white font-inter text-lg font-semibold">Liquidity Sources</DialogTitle>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </DialogHeader>

            <div className="p-6 space-y-4">
              {sources.map((source, index) => (
                <div key={source.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[rgba(255,255,255,0.7)] font-montserrat text-sm">{source.name}</span>
                    <span className="ml-2 text-white text-sm">{source.percentage}%</span>
                  </div>
                  <div 
                    className={`w-[60px] h-[23px] rounded-[10px] border border-[rgba(0,102,255,0.57)] relative cursor-pointer transition-all duration-200 ${
                      source.enabled ? 'bg-[rgba(0,102,255,0.23)]' : 'bg-[rgba(0,102,255,0.08)]'
                    }`}
                    onClick={() => toggleSource(index)}
                  >
                    <div 
                      className={`absolute w-4 h-4 top-[3px] rounded-full transition-all duration-200 ${
                        source.enabled 
                          ? 'bg-[#0066FF] right-[5px]' 
                          : 'bg-[#75849D] left-[5px]'
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </Portal>
    );
  }

  return (
    <Portal>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="w-[417px] h-[335px] bg-black border border-[rgba(255,255,255,0.5)] shadow-[0px_4px_24px_rgba(105,97,255,0.4)] rounded-[20px] p-0">
          <DialogHeader className="flex flex-row items-center justify-between p-4">
            <DialogTitle className="text-center flex-1 text-white font-inter text-lg font-semibold">Trade Settings</DialogTitle>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <Button
              variant="ghost"
              className="w-full justify-between text-[rgba(255,255,255,0.7)] hover:text-white font-montserrat"
              onClick={() => setShowLiquiditySources(true)}
            >
              <span>Liquidity Sources</span>
              <span className="text-[#0066FF]">
                {sources.filter(s => s.enabled).length} enabled
              </span>
            </Button>

            <div className="flex justify-between items-center">
              <span className="text-[rgba(255,255,255,0.7)] font-montserrat">Transaction Deadline</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={deadline}
                  onChange={(e) => {
                    setDeadline(Number(e.target.value));
                    handleChange();
                  }}
                  className="w-[60px] h-[23px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.57)] rounded-[10px] text-center text-white"
                />
                <span className="text-white font-inter text-sm">10m</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[rgba(255,255,255,0.7)] font-montserrat">Direct Route Only</span>
              <div 
                className={`w-[60px] h-[23px] rounded-[10px] border border-[rgba(0,102,255,0.57)] relative cursor-pointer transition-all duration-200 ${
                  directRoute ? 'bg-[rgba(0,102,255,0.23)]' : 'bg-[rgba(0,102,255,0.08)]'
                }`}
                onClick={() => {
                  setDirectRoute(!directRoute);
                  handleChange();
                }}
              >
                <div 
                  className={`absolute w-4 h-4 top-[3px] rounded-full transition-all duration-200 ${
                    directRoute 
                      ? 'bg-[#0066FF] right-[5px]' 
                      : 'bg-[#75849D] left-[5px]'
                  }`} 
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[rgba(255,255,255,0.7)] font-montserrat">Smart Routing</span>
              <div 
                className={`w-[60px] h-[23px] rounded-[10px] border border-[rgba(0,102,255,0.57)] relative cursor-pointer transition-all duration-200 ${
                  smartRouting ? 'bg-[rgba(0,102,255,0.23)]' : 'bg-[rgba(0,102,255,0.08)]'
                }`}
                onClick={() => {
                  setSmartRouting(!smartRouting);
                  handleChange();
                }}
              >
                <div 
                  className={`absolute w-4 h-4 top-[3px] rounded-full transition-all duration-200 ${
                    smartRouting 
                      ? 'bg-[#0066FF] right-[5px]' 
                      : 'bg-[#75849D] left-[5px]'
                  }`} 
                />
              </div>
            </div>

            {isModified && (
              <div className="space-y-4 mt-8">
                <Button
                  variant="ghost"
                  className="w-full text-[#0066FF] font-montserrat"
                  onClick={resetDefaults}
                >
                  Reset to defaults
                </Button>

                <Button
                  className="w-[372px] h-[45px] bg-[#0066FF] rounded-[12px] text-white font-montserrat mx-auto block"
                  onClick={() => {
                    setIsModified(false);
                    onClose();
                  }}
                >
                  Save Settings
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};