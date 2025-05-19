import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { TokenSelect } from "./TokenSelect";
import { SlippageSettings } from "./SlippageSettings";
import { TradeSettings } from "./TradeSettings";
import { Markets } from "./Markets";
import { Portfolio } from "./Portfolio";
import { WalletPanel } from "./WalletPanel";
import { LanguagePopup } from "./LanguagePopup";
import { ChevronDown, ChevronUp, Globe, X, Github, Twitter, Disc as Discord, Moon, Sun, AlertTriangle, ExternalLink, ArrowUpDown, User, Trophy, Settings, SlidersHorizontal } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useXP } from '../contexts/XPContext';
import { Rewards } from './Rewards';
import { SwapNotification } from "./SwapNotification";

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
  const [watchlistTokens, setWatchlistTokens] = useState<Token[]>([]);
  const [showWatchlist, setShowWatchlist] = useState(false);

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

        <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-[var(--header-bg)] backdrop-blur-md bg-opacity-80 border-t border-[var(--header-border)]">
          <div className="h-full max-w-[1817px] mx-auto px-6 flex items-center justify-between">
            <nav className="flex items-center gap-8">
              {[
                { id: "Trade", label: t('trade') },
                { id: "Portfolio", label: t('portfolio') },
                { id: "Markets", label: t('markets') },
                { id: "Rewards", label: t('rewards') }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`text-[13px] font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-[var(--header-text-active)] font-semibold"
                      : "text-[var(--header-text)] hover:text-[var(--header-text-active)]"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full hover:bg-[#0066ff1a] transition-colors"
                  onClick={() => setShowLanguagePopup(true)}
                >
                  <Globe className="h-4 w-4 text-[var(--header-text)]" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full hover:bg-[#0066ff1a] transition-colors"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-[var(--header-text)]" />
                  ) : (
                    <Moon className="h-4 w-4 text-[var(--header-text)]" />
                  )}
                </Button>
              </div>

              <Button
                className="h-9 bg-[rgba(0,102,255,0.08)] hover:bg-[rgba(0,102,255,0.12)] rounded-full flex items-center gap-2 px-4 transition-colors"
                onClick={() => setShowWalletPanel(!showWalletPanel)}
              >
                <img src="/metamask.png" alt="MetaMask" className="w-4 h-4" />
                <span className="text-[13px] font-medium text-[var(--header-text)]">0x1234...5678</span>
                <ChevronDown className="w-4 h-4 text-[var(--header-text)]" />
              </Button>

              <Button
                className="w-8 h-8 bg-[rgba(0,102,255,0.08)] hover:bg-[rgba(0,102,255,0.12)] rounded-full flex items-center justify-center"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
              >
                <ChevronDown className="w-4 h-4 text-[var(--header-text)]" />
              </Button>
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