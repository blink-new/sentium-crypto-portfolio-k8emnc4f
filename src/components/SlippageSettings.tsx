import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { X, ChevronLeft } from 'lucide-react';
import { Portal } from './Portal';

interface SlippageSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSlippageChange: (value: number | 'auto') => void;
}

const liquiditySources = [
  { name: 'Jupiter', enabled: true },
  { name: 'Raydium', enabled: true },
  { name: 'Orca', enabled: true },
  { name: 'Lifinity', enabled: false },
  { name: 'Meteora', enabled: false },
  { name: 'GooseFX', enabled: false },
  { name: 'Crema', enabled: false },
  { name: 'Saros', enabled: false },
  { name: 'Step', enabled: false },
  { name: 'Aldrin', enabled: false },
  { name: 'Serum', enabled: false },
  { name: 'Saber', enabled: false },
  { name: 'Mercurial', enabled: false },
  { name: 'Atrix', enabled: false },
  { name: 'Phoenix', enabled: false },
  { name: 'Invariant', enabled: false },
  { name: 'Penguin', enabled: false },
  { name: 'Dexlab', enabled: false },
  { name: 'Cropper', enabled: false },
  { name: 'Marinade', enabled: false }
];

export const SlippageSettings = ({ isOpen, onClose, onSlippageChange }: SlippageSettingsProps) => {
  const [showLiquiditySources, setShowLiquiditySources] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<number | 'auto'>('auto');
  const [deadline, setDeadline] = useState(30);
  const [directRoute, setDirectRoute] = useState(false);
  const [smartRouting, setSmartRouting] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [sources, setSources] = useState(liquiditySources);

  const presetValues = [0.1, 0.5, 1.0];

  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomValue(value);
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        setSelectedValue(numValue);
        onSlippageChange(numValue);
      }
    }
  };

  const handlePresetClick = (value: number) => {
    setSelectedValue(value);
    setCustomValue('');
    onSlippageChange(value);
  };

  const handleSmartClick = () => {
    setSelectedValue('auto');
    setCustomValue('');
    onSlippageChange('auto');
  };

  const handleChange = () => {
    setIsModified(true);
  };

  const resetDefaults = () => {
    setDeadline(30);
    setDirectRoute(false);
    setSmartRouting(true);
    setSources(liquiditySources);
    setIsModified(false);
    setSelectedValue('auto');
    setCustomValue('');
    onSlippageChange('auto');
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
          <DialogContent 
            className="sm:max-w-[425px] bg-[#1a1b1e] border-[#0066ff33] text-[#e2ebfb]"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogHeader className="flex flex-row items-center justify-between">
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setShowLiquiditySources(false)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-center flex-1">Liquidity Sources</DialogTitle>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {sources.map((source, index) => (
                <div key={source.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>{source.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className={`w-12 h-6 rounded-full ${source.enabled ? 'bg-[#0066ff]' : 'bg-[#2a2b2e]'}`}
                    onClick={() => toggleSource(index)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${source.enabled ? 'translate-x-2' : '-translate-x-2'}`} />
                  </Button>
                </div>
              ))}
            </div>

            {isModified && (
              <div className="mt-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-[#0066ff]"
                  onClick={resetDefaults}
                >
                  Reset to defaults
                </Button>
                <Button
                  className="w-full bg-[#0066ff] hover:bg-[#0052cc]"
                  onClick={() => {
                    setIsModified(false);
                    setShowLiquiditySources(false);
                  }}
                >
                  Save Settings
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Portal>
    );
  }

  return (
    <Portal>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent 
          className="sm:max-w-[425px] bg-[#1a1b1e] border-[#0066ff33] text-[#e2ebfb]"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-center flex-1">Trade Settings</DialogTitle>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="text-[#b1fdf9] text-sm font-semibold mb-2">Slippage Tolerance</div>
            <div className="flex gap-2 mb-4">
              <Button
                variant="ghost"
                className={`flex-1 h-10 ${
                  selectedValue === 'auto'
                    ? 'bg-[#0066ff] text-white'
                    : 'bg-[#0066ff0f] text-[#e2ebfb] border border-[#0066ff33]'
                }`}
                onClick={handleSmartClick}
              >
                Smart
              </Button>
              {presetValues.map((value) => (
                <Button
                  key={value}
                  variant="ghost"
                  className={`flex-1 h-10 ${
                    selectedValue === value
                      ? 'bg-[#0066ff] text-white'
                      : 'bg-[#0066ff0f] text-[#e2ebfb] border border-[#0066ff33]'
                  }`}
                  onClick={() => handlePresetClick(value)}
                >
                  {value}%
                </Button>
              ))}
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                value={customValue}
                onChange={handleCustomValueChange}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                placeholder="Custom"
                className="w-full h-10 bg-[#0066ff0f] text-[#e2ebfb] border border-[#0066ff33] rounded-md px-3 focus:outline-none focus:border-[#0066ff]"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#e2ebfb]">%</span>
            </div>

            <div className="space-y-4">
              <div className="text-[#b1fdf9] text-sm font-semibold mb-2">Transaction Settings</div>
              
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-[#0066ff1a]"
                onClick={() => setShowLiquiditySources(true)}
              >
                <span>Liquidity Sources</span>
                <span className="text-[#40b66b]">
                  {sources.filter(s => s.enabled).length} enabled
                </span>
              </Button>

              <div className="flex justify-between items-center">
                <span>Transaction deadline</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={deadline}
                    onChange={(e) => {
                      setDeadline(Number(e.target.value));
                      handleChange();
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    className="w-16 bg-transparent border border-[#0066ff33] rounded px-2 py-1"
                  />
                  <span>minutes</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Direct route only</span>
                <Button
                  variant="ghost"
                  className={`w-12 h-6 rounded-full ${directRoute ? 'bg-[#0066ff]' : 'bg-[#2a2b2e]'}`}
                  onClick={() => {
                    setDirectRoute(!directRoute);
                    handleChange();
                  }}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${directRoute ? 'translate-x-2' : '-translate-x-2'}`} />
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <span>Smart routing</span>
                <Button
                  variant="ghost"
                  className={`w-12 h-6 rounded-full ${smartRouting ? 'bg-[#0066ff]' : 'bg-[#2a2b2e]'}`}
                  onClick={() => {
                    setSmartRouting(!smartRouting);
                    handleChange();
                  }}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${smartRouting ? 'translate-x-2' : '-translate-x-2'}`} />
                </Button>
              </div>
            </div>

            {isModified && (
              <div className="mt-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-[#0066ff]"
                  onClick={resetDefaults}
                >
                  Reset to defaults
                </Button>

                <Button
                  className="w-full bg-[#0066ff] hover:bg-[#0052cc]"
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