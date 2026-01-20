"use client";

import Script from "next/script";

export const AdPixels = () => {
  return (
    <>
      {/* --------------------------------------------------------------------------------
         * PRO TIP: We use strategy="afterInteractive" to load these scripts 
         * AFTER the page is interactive. This ensures they don't block the 
         * initial UI load (LCP/FCP) but still capture early user events.
         * -------------------------------------------------------------------------------- */}

      {/* --- META PIXEL (Facebook/Instagram) --- */}
      {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* --- LINKEDIN INSIGHT TAG --- */}
      {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
        <Script
          id="linkedin-insight"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
      )}

      {/* --- REDDIT PIXEL --- */}
      {process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID && (
        <Script
          id="reddit-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?
            p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];
            var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;
            var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
            rdt('init','${process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID}', {"optOut":false,"useDecimalCurrencyValues":true});
            rdt('track', 'PageVisit');
            `,
          }}
        />
      )}

      {/* --- TWITTER (X) PIXEL --- */}
      {process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID && (
        <Script
          id="twitter-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('init','${process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID}');
            twq('track','PageView');
            `,
          }}
        />
      )}

      {/* --- GOOGLE ADS TAG (gtag.js) --- */}
      {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
        <>
          <Script
             async
             src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
             strategy="afterInteractive"
          />
          <Script
            id="google-ads-tag"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
              `,
            }}
          />
        </>
      )}

      {/* --- PINTEREST TAG --- */}
      {process.env.NEXT_PUBLIC_PINTEREST_ID && (
        <Script
          id="pinterest-tag"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', '${process.env.NEXT_PUBLIC_PINTEREST_ID}');
              pintrk('page');
            `,
          }}
        />
      )}

      {/* --- MICROSOFT UET TAG (Bing Ads) --- */}
      {process.env.NEXT_PUBLIC_BING_ADS_ID && (
        <Script
          id="bing-uet-tag"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){
              var o={ti:"${process.env.NEXT_PUBLIC_BING_ADS_ID}", enableAutoSpaTracking: true};
              o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},
              n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
              var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),
              n.onload=n.onreadystatechange=null)},
              i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
              })(window,document,"script","//bat.bing.com/bat.js","uetq");
            `,
          }}
        />
      )}

      {/* --- TIKTOK PIXEL --- */}
      {process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
             !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}
    </>
  );
};
