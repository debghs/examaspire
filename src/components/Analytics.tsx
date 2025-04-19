import Script from 'next/script'
import React from 'react'

function Analytics() {
  // Don't render analytics in development
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0BNX16PF8Z" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0BNX16PF8Z');
        `}
      </Script>
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qa6kpcvbuu");
              `}
      </Script>
    </>
  )
}

export default Analytics
