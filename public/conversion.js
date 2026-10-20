/**
 * BSV10 Meta Pixel & Google Tags Conversion Engine
 * Otomatis menginisialisasi Tracking & melacak Banner serta Tombol Halaman.
 */
(() => {
  'use strict';

  const c = window.BannerConversion || {};
  const fired = new Set();

  // 1a. Inisialisasi Google Tag Otomatis (Mandiri)
  function initGoogleTag() {
    if (!c.googleAdsId || typeof c.googleAdsId !== 'string') return;
    const tagId = c.googleAdsId.trim();
    if (!tagId) return;

    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', tagId);
    }

    const selector = `script[src*="googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}"]`;
    if (!document.querySelector(selector)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
      (document.head || document.documentElement).appendChild(script);
    }
  }

  // 1b. Inisialisasi Meta Pixel Otomatis (Mandiri jika metaPixelId diisi di conversion-setup.js)
  function initMetaPixel() {
    if (!c.metaPixelId || typeof c.metaPixelId !== 'string') return;
    const pixelId = c.metaPixelId.trim();
    if (!pixelId) return;

    if (typeof window.fbq !== 'function') {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }

  initGoogleTag();
  initMetaPixel();

  // Helper deduplikasi satu kali per aksi lifecycle
  function once(key, fn) {
    if (fired.has(key)) return;
    try {
      if (fn() !== false) fired.add(key);
    } catch (e) {
      console.warn('[BSV10 Conversion]', e.message);
    }
  }

  // 2. Fungsi Pengiriman Konversi Google Ads dengan Beacon Transport
  function trackGoogleConversion(label, sourceName) {
    if (!c.leadEnabled || !c.googleAdsId) return false;

    const conversionLabel = label || c.googleAdsConversionLabel;
    if (!conversionLabel) return false;

    const tagId = c.googleAdsId.trim();
    const payload = {
      send_to: `${tagId}/${conversionLabel.trim()}`,
      value: Number(c.leadValue) || 1000,
      currency: c.currency || 'IDR',
      transport_type: 'beacon'
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', payload);
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'bsv_conversion',
        conversion_source: sourceName,
        ...payload
      });
    }
    return true;
  }

  // 3. Listener Tampilan Banner (ViewContent)
  window.addEventListener('ulb:shown', () => {
    once('metaView', () => {
      if (!c.viewContentEnabled || typeof window.fbq !== 'function') return false;
      window.fbq('track', 'ViewContent', {
        value: Number(c.viewContentValue) || 100,
        currency: c.currency || 'IDR'
      });
    });
  });

  // 4. Listener Klik Banner CTA
  window.addEventListener('ulb:click', () => {
    // Meta Pixel Lead
    once('metaBannerLead', () => {
      if (!c.leadEnabled || c.bannerLeadEnabled === false || !c.metaPixelEnabled || typeof window.fbq !== 'function') return false;
      window.fbq('track', 'Lead', {
        value: Number(c.leadValue) || 1000,
        currency: c.currency || 'IDR'
      });
    });

    // Google Ads Banner Conversion
    once('googleBannerLead', () => {
      if (c.bannerLeadEnabled === false) return false;
      const label = c.bannerConversionLabel || c.googleAdsConversionLabel;
      return trackGoogleConversion(label, 'banner_cta');
    });
  });

  // 5. Listener Tombol Halaman Reguler (/go/page-cta)
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="/go/page-cta"]');
    if (!link) return;

    if (c.pageLeadEnabled === false) return;

    // Google Ads Page Conversion
    once('googlePageLead', () => {
      const label = c.pageConversionLabel || c.googleAdsConversionLabel;
      return trackGoogleConversion(label, 'page_cta');
    });

    // Meta Pixel Page Lead
    once('metaPageLead', () => {
      if (!c.leadEnabled || !c.metaPixelEnabled || typeof window.fbq !== 'function') return false;
      window.fbq('track', 'Lead', {
        value: Number(c.leadValue) || 1000,
        currency: c.currency || 'IDR'
      });
    });
  }, true);
})();
