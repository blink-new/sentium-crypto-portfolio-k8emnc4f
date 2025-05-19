import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { TokenSelect } from "../../components/TokenSelect";
import { SlippageSettings } from "../../components/SlippageSettings";
import { TradeSettings } from "../../components/TradeSettings";
import { Markets } from "../../components/Markets";
import { Portfolio } from "../../components/Portfolio";
import { WalletPanel } from "../../components/WalletPanel";
import { LanguagePopup } from "../../components/LanguagePopup";
import { ChevronDown, ChevronUp, Globe, X, Github, Twitter, Disc as Discord, Moon, Sun, AlertTriangle, ExternalLink, ArrowUpDown, User, Trophy, Settings, SlidersHorizontal } from "lucide-react";
import Marquee from "react-fast-marquee";
import { portfolioData } from "../../data/portfolio";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useXP } from '../../contexts/XPContext';
import { Rewards } from '../../components/Rewards';
import { SwapNotification } from "../../components/SwapNotification";

interface Token {
  name: string;
  icon: string;
  type?: string;
  isVerified?: boolean;
  network?: string;
}

export const Box = (): JSX.Element => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { addXP } = useXP();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("Trade");
  const [isTrending, setIsTrending] = useState(true);
  const [showNetworkStatus, setShowNetworkStatus] = useState(false);
  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [showSlippageSettings, setShowSlippageSettings] = useState(false);
  const [showTradeSettings, setShowTradeSettings] = useState(false);
  const [showWalletPanel, setShowWalletPanel] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [isPencilVisible, setIsPencilVisible] = useState(true);
  const [showSocialPopup, setShowSocialPopup] = useState(false);
  const [selectingTokenFor, setSelectingTokenFor] = useState<'swap' | 'receive' | null>(null);
  const [slippageValue, setSlippageValue] = useState<number | 'auto'>('auto');
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [priceImpact, setPriceImpact] = useState(4.5);
  const [isPriceFlipped, setIsPriceFlipped] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'swap' | 'receive' | 'send';
    fromAmount?: string;
    fromToken?: string;
    toAmount?: string;
    toToken?: string;
  } | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [swapAmount, setSwapAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [swapToken, setSwapToken] = useState<Token>({ icon: "/image323.png", name: "USDC", isVerified: true, network: "ETH" });
  const [receiveToken, setReceiveToken] = useState<Token>({ icon: "", name: t('selectToken') });
  const [showRewards, setShowRewards] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [bothTokensSelected, setBothTokensSelected] = useState(false);

  const getTokenBalance = (tokenName: string) => {
    return "0.0";
  };

  const handleMaxClick = () => {
    // Implementation
  };

  const handleRefresh = () => {
    // Implementation
  };

  const handleSlippageChange = (value: number | 'auto') => {
    setSlippageValue(value);
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <div className="w-full h-[calc(100vh-84px)] bg-[var(--body-bg)] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-start gap-3">
              <div className="w-[495px] rounded-[13px] border border-[#0066FF33] bg-[var(--card-bg-from)]">
                <div className="flex justify-between items-center p-4">
                  <div className="flex gap-[7px]">
                    <Button 
                      className="w-[28px] h-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] p-0 flex items-center justify-center hover:border-[#0066ff] hover:border-2 transition-all"
                      onClick={() => setShowTradeSettings(true)}
                    >
                      <Settings className="w-3 h-3 text-[var(--body-text)]" />
                    </Button>
                    <Button 
                      className="h-[28px] px-3 bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] flex items-center gap-2 hover:border-[#0066ff] hover:border-2 transition-all"
                      onClick={() => setShowSlippageSettings(true)}
                    >
                      <SlidersHorizontal className="w-3 h-3 text-[var(--body-text)]" />
                      <span className="text-[var(--body-text)] text-xs">
                        {slippageValue === 'auto' ? t('auto') : `${slippageValue}%`}
                      </span>
                    </Button>
                  </div>
                  <Button 
                    className="w-[28px] h-[28px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-[10px] p-0 flex items-center justify-center hover:border-[#0066ff] hover:border-2 transition-all"
                    onClick={handleRefresh}
                  >
                    <img 
                      className={`w-3 h-3 ${isSpinning ? 'animate-spin' : ''}`} 
                      alt="Refresh" 
                      src={theme === 'dark' ? "/refresh.png" : "/refresh-light.png"} 
                    />
                  </Button>
                </div>

                <div className="border border-[#0066ff33] rounded-[10px] p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--body-text)] text-xs font-semibold font-inter">{t('youSwap')}</span>
                    {isWalletConnected && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#98A1C0] text-xs font-medium font-inter">
                          {getTokenBalance(swapToken.name)} {swapToken.name}
                        </span>
                        {getTokenBalance(swapToken.name) !== "0.0" && (
                          <Button
                            className="box-border flex items-center justify-center w-[49px] h-[25px] bg-[rgba(0,102,255,0.08)] text-[rgba(232,239,251,0.6)] text-[11px] font-medium font-inter border border-[rgba(0,102,255,0.2)] rounded-lg"
                            onClick={handleMaxClick}
                          >
                            {t('max')}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {isWalletConnected && bothTokensSelected && (
                    <>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[#75849D] text-xs font-medium font-inter">
                          {t('routesAndMarkets', { routes: 2, markets: 3 })}
                        </span>
                        <button 
                          className="text-[#75849D] text-[11px] italic underline font-inter hover:opacity-80"
                          onClick={() => setShowRouteDetails(!showRouteDetails)}
                        >
                          {t('details')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TradeSettings
        isOpen={showTradeSettings}
        onClose={() => setShowTradeSettings(false)}
      />

      <SlippageSettings
        isOpen={showSlippageSettings}
        onClose={() => setShowSlippageSettings(false)}
        onSlippageChange={handleSlippageChange}
      />
    </>
  );
};