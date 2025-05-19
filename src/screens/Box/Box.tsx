// (File content up to the footer remains unchanged)
// ...
// Footer section (fixed, no repeated divider):
<div className="absolute bottom-0 w-full">
  <div className="w-full border-t border-[#0066ff66]">
    <div className="flex items-center ml-[31px] my-1">
      <div className="text-[#0066ff] font-black text-xs">V0.01</div>
      <Separator orientation="vertical" className="h-[11px] mx-2 bg-[#0066ff33]" />
      <div 
        className="relative flex items-center group px-2"
        onMouseEnter={() => setShowNetworkStatus(true)}
        onMouseLeave={() => setShowNetworkStatus(false)}
      >
        <div className="w-1.5 h-1.5 bg-[#ffbe58] rounded-[3px] shadow-[0px_0px_0px_4px_#40b66b3d]" />
        <span className="ml-2 text-[#40B66B] text-xs font-semibold font-inter">
          {networkStatus.connection}
        </span>
        {showNetworkStatus && (
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-[var(--popup-bg)] border border-[#0066ff33] rounded-lg p-3 shadow-lg">
            <div className="text-[var(--body-text)] text-sm font-semibold mb-2">{t('networkStatus')}</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[var(--body-text)] text-xs">{t('network')}</span>
                <span className="text-[var(--body-text)] text-xs">{networkStatus.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--body-text)] text-xs">{t('status')}</span>
                <span className="text-[#40b66b] text-xs">{networkStatus.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Removed the extra separator here */}
      {isWalletConnected && (
        <>
          <Separator orientation="vertical" className="h-[11px] mx-2 bg-[#0066ff33]" />
          <Button
            className="h-[22px] bg-[rgba(0,102,255,0.08)] border border-[rgba(0,102,255,0.2)] rounded-lg px-2 text-xs text-[var(--body-text)] hover:bg-[rgba(0,102,255,0.12)] flex items-center gap-1"
            onClick={() => setShowSlippageSettings(true)}
          >
            <img src="/slippage.png" alt="Preset" className="w-3 h-3" />
            PRESET 1
          </Button>
          <Separator orientation="vertical" className="h-[11px] mx-2 bg-[#0066ff33]" />
          <div className="flex items-center gap-1 text-xs text-[var(--body-text)]">
            <img src="/image-74.png" alt="Wallets" className="w-3 h-3" />
            1
          </div>
        </>
      )}
      <Separator orientation="vertical" className="h-[11px] mx-2 bg-[#0066ff33]" />
      <div className="flex-1 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 z-10" style={footerMarqueeGradientStyle} />
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="text-[var(--body-text)] text-sm font-bold">
              {t('tradingRewards')}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  </div>
</div>
// ... (rest of the file remains unchanged)
