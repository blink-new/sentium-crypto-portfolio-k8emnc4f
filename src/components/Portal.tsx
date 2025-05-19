import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create portal container if it doesn't exist
    if (!portalRef.current) {
      const div = document.createElement('div');
      div.setAttribute('data-portal-container', '');
      document.body.appendChild(div);
      portalRef.current = div;
    }

    const current = portalRef.current;

    return () => {
      // Cleanup portal container on unmount
      if (current && document.body.contains(current)) {
        document.body.removeChild(current);
      }
    };
  }, []);

  if (!portalRef.current) {
    return null;
  }

  return createPortal(
    <RemoveScroll>
      <div className="fixed top-[84px] bottom-[30px] left-0 right-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-50">{children}</div>
      </div>
    </RemoveScroll>,
    portalRef.current
  );
};