// Konfigurasi Tracking Meta Pixel & Google Tags BSV10 untuk SL168 kustom
window.BannerConversion = Object.freeze({
  // 1. Meta Pixel ID (Facebook & Instagram Ads)
  metaPixelId: '1082089104715426',
  metaPixelEnabled: true,
  viewContentEnabled: true,
  viewContentValue: 100,

  // 2. Kontrol Sumber Lead Tracking
  leadEnabled: true,
  bannerLeadEnabled: true,   // AKTIF: Klik dari Banner CTA dihitung Lead
  pageLeadEnabled: true,     // AKTIF: Klik dari Tombol Halaman (/go/page-cta) dihitung Lead
  leadValue: 1000,
  currency: 'IDR',

  // 3. Google Ads Tag ID (Opsional - Kosongkan jika hanya menggunakan Meta Ads)
  googleAdsId: '',
  bannerConversionLabel: '',    // Label konversi untuk klik Banner CTA
  pageConversionLabel: '',      // Label konversi untuk klik Tombol Halaman (/go/page-cta)
  googleAdsConversionLabel: ''  // Fallback jika ingin menggunakan 1 label yang sama untuk keduanya
});
