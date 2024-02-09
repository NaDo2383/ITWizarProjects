import React, { useEffect, useRef } from 'react';

const IFrame = ({ src }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if(iframe) {
        const resizeIframe = () => {
            iframe.style.height = iframe?.contentWindow?.document.body.scrollHeight + 20 + 'px';
        };
        
        const handleLoad = () => {
            resizeIframe();
            if(iframe?.contentWindow) iframe.contentWindow?.addEventListener('resize', resizeIframe);
        };

        iframe.addEventListener('load', handleLoad);
        
        return () => {
            iframe.removeEventListener('load', handleLoad);
            iframe?.contentWindow?.removeEventListener('resize', resizeIframe);
        };
    }
}, [src]);

const cssLink= '<link href="/css/iframes.css" rel="stylesheet" type="text/css" />';

  return (
    <iframe
      ref={iframeRef}
      srcDoc={`<!DOCTYPE html><html><head>${cssLink}</head><body>${src}</body></html>`}
      frameBorder="0"
      scrolling="no"
      style={{ 
        width: '100%', 
        display: 'block',
      }}
    />
  );
};

export default IFrame;
