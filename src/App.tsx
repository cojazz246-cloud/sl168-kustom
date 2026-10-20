import React, { useState } from 'react';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lastCta, setLastCta] = useState<number>(0);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    if (Date.now() - lastCta < 1000) return;
    setLastCta(Date.now());
    window.open('/go/page-cta', '_blank', 'noopener');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    {
      title: 'Sablon Baju & Kaos Custom',
      price: 'Mulai Rp 15.000 / pcs',
      desc: 'Layanan sablon kaos satuan maupun partai ribuan pcs. Menyediakan teknik DTF High-Definition full color tanpa batasan gradasi, Rubber premium, hingga Plastisol tahan lama.',
      tags: ['Combed 30s/24s', 'DTF Ultra HD', 'Plastisol', 'Rubber']
    },
    {
      title: 'Cetak Mug Keramik Custom',
      price: 'Mulai Rp 10.000 / pcs',
      desc: 'Mug keramik putih standar SNI dengan lapisan coating super white. Cetakan sublimasi 360° jernih, tahan air panas, dan tidak luntur saat dicuci menggunakan sabun.',
      tags: ['Keramik SNI', 'Full Color Sublimasi', 'Souvenir Event', 'Merchandise Kantor']
    },
    {
      title: 'Polo Shirt & Seragam Kantor',
      price: 'Harga Grosir Khusus B2B',
      desc: 'Polo shirt bahan Lacoste CVC & Pique katun dengan kombinasi bordir komputer presisi rapi. Cocok untuk seragam kerja operasional, seragam pabrik, dan gathering.',
      tags: ['Lacoste CVC', 'Bordir Komputer', 'American Drill', 'Seragam Kerja']
    },
    {
      title: 'Totebag & Merchandise Promosi',
      price: 'Solusi Paket Seminar Kit',
      desc: 'Pengadaan tas seminar totebag blacu/kanvas, tumbler cetak nama/logo, ID Card lanyard, topi promosi, dan goodie bag event perusahaan dengan cetakan tajam tahan lama.',
      tags: ['Totebag Kanvas', 'Lanyard', 'Tumbler Custom', 'Goodie Bag']
    }
  ];

  const benefits = [
    { title: 'Hasil Cepat & Disiplin Waktu', desc: 'Workshop dengan sistem antrean terstruktur memastikan deadline pesanan Anda terpenuhi, bahkan untuk jadwal acara mendesak.' },
    { title: 'Kualitas Sablon Tahan Cuci', desc: 'Tinta DTF dan Plastisol formula khusus merekat kuat pada serat kain. Tidak retak, tidak mengelupas, aman dicuci mesin berkali-kali.' },
    { title: 'Bahan Baku 100% Cotton Combed', desc: 'Hanya menggunakan bahan katun combed asli yang adem, halus, menyerap keringat, dan jahit rantai standar distro.' },
    { title: 'Mug SNI Food Grade', desc: 'Mug keramik putih tebal berstandar SNI yang aman untuk minuman panas maupun dingin dengan lapisan coating berdaya rekat tinggi.' },
    { title: 'Gratis Mockup Digital Sebelum Cetak', desc: 'Tim kami memvisualisasikan penempatan logo, ukuran cetak, dan proporsi pada baju atau mug sebelum diproduksi masal.' },
    { title: 'Kapasitas Produksi Skala B2B', desc: 'Kapasitas workshop siap mengerjakan pesanan puluhan hingga ribuan pieces per minggu dengan konsistensi warna teruji.' }
  ];

  const faqs = [
    {
      q: 'Berapa minimal order (MOQ) untuk sablon baju dan cetak mug?',
      a: 'Untuk sablon kaos dan seragam polo, minimal pemesanan standar adalah 24 pcs (2 lusin). Untuk mug keramik custom, minimal pemesanan mulai dari 50 pcs. Jika Anda membutuhkan pembuatan sample awal untuk approval tender/kantor, silakan hubungi admin WhatsApp kami.'
    },
    {
      q: 'Berapa lama estimasi pengerjaan pesanan?',
      a: 'Waktu pengerjaan standar berkisar antara 3 hingga 7 hari kerja tergantung kuantitas pesanan dan antrean workshop. Untuk pesanan express kilat dengan deadline tertentu, mohon konfirmasikan sejak awal agar jadwal produksi dialokasikan khusus.'
    },
    {
      q: 'Format file desain apa yang sebaiknya saya kirimkan?',
      a: 'Kami sangat merekomendasikan file vektor seperti Adobe Illustrator (.AI), CorelDraw (.CDR), atau PDF beresolusi tinggi. Jika menggunakan file bitmap seperti PNG atau PSD, pastikan resolusi minimal 300 DPI dengan latar transparan agar hasil cetak tajam.'
    },
    {
      q: 'Apakah melayani pengiriman ke luar pulau Jawa?',
      a: 'Ya, kami melayani pengiriman ke seluruh wilayah Indonesia (Sumatera, Kalimantan, Sulawesi, Bali, Nusa Tenggara, Maluku, dan Papua) bermitra dengan ekspedisi cargo terpercaya dengan ongkos kirim hemat untuk partai besar.'
    },
    {
      q: 'Bagaimana jaminan garansi jika ada produk cacat atau salah cetak?',
      a: 'SL168 Kustom berkomitmen pada kepuasan pelanggan. Jika terdapat kesalahan cetak atau cacat produksi yang berasal dari kelalaian workshop kami (di luar toleransi kesepakatan mockup), kami memberikan garansi perbaikan atau cetak ulang secara cuma-cuma.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-20 md:pb-0">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-400 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Workshop Buka Setiap Hari: 08:00 - 21:00 WIB
          </div>
          <div>Layanan Pengiriman Cepat Seluruh Indonesia &bull; Partai Besar / B2B Welcome</div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-cyan-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              S
            </div>
            <div>
              <div className="font-extrabold text-lg text-slate-900 leading-tight">SL168 kustom</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Sablon & Printing B2B</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#layanan" className="hover:text-blue-700 transition">Layanan</a>
            <a href="#keunggulan" className="hover:text-blue-700 transition">Keunggulan</a>
            <a href="#harga" className="hover:text-blue-700 transition">Daftar Harga</a>
            <a href="#alur" className="hover:text-blue-700 transition">Alur Order</a>
            <a href="#faq" className="hover:text-blue-700 transition">FAQ</a>
            <button
              onClick={handleCTA}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition"
            >
              💬 Konsultasi WhatsApp
            </button>
          </nav>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/60 via-slate-50 to-white py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs mb-4">
              ✓ Vendor Konveksi & Printing B2B Terpercaya
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              Pusat Sablon Baju & Cetak Mug <span className="text-blue-700">Cepat Berkualitas</span> untuk Bisnis & Komunitas
            </h1>
            <p className="text-slate-600 text-base md:text-lg mb-6 leading-relaxed">
              Solusi terpadu cetak sablon kaos mulai <strong>Rp 15.000</strong> dan custom mug keramik mulai <strong>Rp 10.000</strong>. Diproduksi dengan mesin modern berkapasitas ribuan pcs per hari, warna tajam tahan cuci, serta pengiriman aman ke seluruh pelosok Indonesia.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={handleCTA}
                className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                Konsultasi & Order via WhatsApp &rarr;
              </button>
              <a
                href="#harga"
                className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-5 py-3.5 rounded-xl transition"
              >
                Lihat Simulasi Paket Harga
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm font-bold text-slate-700">
              <div className="flex items-center gap-2">⚡ Hasil Cepat & Tepat Waktu</div>
              <div className="flex items-center gap-2">👕 Cotton Combed Premium</div>
              <div className="flex items-center gap-2">☕ Mug Standar SNI Food Grade</div>
              <div className="flex items-center gap-2">🎨 Gratis Mockup Desain Digital</div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded">Penawaran Spesial B2B</span>
                <span className="text-xs font-bold text-blue-700">SL168 Kustom Production</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center">
                  <div className="text-xs font-bold text-blue-800 mb-1">Sablon Kaos / Baju</div>
                  <div className="text-xl font-black text-slate-900">Rp 15.000<span className="text-xs font-normal">/pcs</span></div>
                  <div className="text-[10px] text-slate-500">Jasa sablon berkualitas</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center">
                  <div className="text-xs font-bold text-blue-800 mb-1">Custom Cetak Mug</div>
                  <div className="text-xl font-black text-slate-900">Rp 10.000<span className="text-xs font-normal">/pcs</span></div>
                  <div className="text-[10px] text-slate-500">Include keramik SNI coating</div>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 mb-5">
                <li>✓ <strong>Teknik Sablon:</strong> DTF Ultra HD, Rubber Matsui, Plastisol, Polyflex</li>
                <li>✓ <strong>Kualitas Mug:</strong> Keramik Super White Coating, Microwave-safe</li>
                <li>✓ <strong>Jangkauan:</strong> Ekspedisi Cargo Terpercaya ke Seluruh Indonesia</li>
              </ul>
              <button
                onClick={handleCTA}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3 rounded-xl shadow transition text-sm text-center"
              >
                Dapatkan Penawaran Harga Sekarang &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Katalog Layanan */}
      <section className="py-16 max-w-6xl mx-auto px-4" id="layanan">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Produk & Layanan</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-3">Katalog Solusi Sablon & Cetak Merchandise</h2>
          <p className="text-slate-600 text-sm md:text-base">Didukung peralatan cetak berstandar industri untuk menghasilkan cetakan presisi, awet dicuci, dan menunjang reputasi brand Anda.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black mb-3">
                  {idx + 1}
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">{srv.title}</h3>
                <div className="text-blue-700 font-extrabold text-sm mb-2">{srv.price}</div>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">{srv.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {srv.tags.map((t, tidx) => (
                    <span key={tidx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCTA}
                className="w-full bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-800 text-xs font-bold py-2.5 rounded-lg border border-slate-200 transition"
              >
                Pesan Sekarang &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Keunggulan Faktual */}
      <section className="py-16 bg-slate-100 border-y border-slate-200" id="keunggulan">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Keunggulan Faktual</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-3">Mengapa Mempercayakan Cetak di SL168 Kustom?</h2>
            <p className="text-slate-600 text-sm md:text-base">Kami mengutamakan kejujuran spesifikasi bahan, kecepatan waktu produksi, serta komitmen penyelesaian tepat waktu.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-blue-700 font-black text-lg mb-2">0{idx + 1}.</div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1.5">{b.title}</h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Daftar Harga */}
      <section className="py-16 max-w-6xl mx-auto px-4" id="harga">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Transparansi Harga</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-3">Estimasi Paket Harga Produksi</h2>
          <p className="text-slate-600 text-sm">Harga jujur tanpa biaya tersembunyi. Diskon volume khusus untuk partai besar dan komunitas.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto mb-4">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-600">
              <tr>
                <th className="p-4">Kategori Produk</th>
                <th className="p-4">Spesifikasi</th>
                <th className="p-4">Kuantitas</th>
                <th className="p-4">Harga Mulai</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-bold">Jasa Sablon Kaos (Only)</td>
                <td className="p-4 text-xs text-slate-600">DTF HD / Rubber presisi A4/A3</td>
                <td className="p-4 text-xs">Min. 24 pcs</td>
                <td className="p-4 font-extrabold text-emerald-700">Rp 15.000 / pcs</td>
                <td className="p-4"><button onClick={handleCTA} className="text-blue-700 font-bold hover:underline">Order WA &rarr;</button></td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Paket Kaos Combed + Sablon</td>
                <td className="p-4 text-xs text-slate-600">Kaos Combed 30s + DTF full color</td>
                <td className="p-4 text-xs">Min. 24 pcs</td>
                <td className="p-4 font-extrabold text-emerald-700">Rp 45.000 / pcs</td>
                <td className="p-4"><button onClick={handleCTA} className="text-blue-700 font-bold hover:underline">Order WA &rarr;</button></td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Cetak Mug Keramik Custom</td>
                <td className="p-4 text-xs text-slate-600">Mug SNI + Sublimasi 360°</td>
                <td className="p-4 text-xs">Min. 50 pcs</td>
                <td className="p-4 font-extrabold text-emerald-700">Rp 10.000 / pcs</td>
                <td className="p-4"><button onClick={handleCTA} className="text-blue-700 font-bold hover:underline">Order WA &rarr;</button></td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Polo Shirt Bordir Komputer</td>
                <td className="p-4 text-xs text-slate-600">Bahan Lacoste CVC + Bordir dada</td>
                <td className="p-4 text-xs">Min. 24 pcs</td>
                <td className="p-4 font-extrabold text-emerald-700">Rp 65.000 / pcs</td>
                <td className="p-4"><button onClick={handleCTA} className="text-blue-700 font-bold hover:underline">Order WA &rarr;</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-16 bg-slate-50 border-t border-slate-200" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Tanya Jawab</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-2">Pertanyaan Umum (FAQ)</h2>
            <p className="text-slate-600 text-sm">Informasi faktual mengenai pengerjaan sablon dan percetakan di SL168 Kustom.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-slate-900 flex justify-between items-center text-sm md:text-base hover:bg-slate-50 transition"
                >
                  <span>{f.q}</span>
                  <span className="text-blue-700 text-lg font-bold">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Big CTA Banner */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3">Siap Wujudkan Kaos & Mug Custom untuk Bisnis Anda?</h2>
          <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto mb-6">Konsultasikan ide desain Anda sekarang juga. Dapatkan mockup digital gratis dan penawaran harga pabrik terbaik dari SL168 Kustom hari ini.</p>
          <button
            onClick={handleCTA}
            className="bg-white text-blue-800 font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-0.5 text-base"
          >
            💬 Hubungi Admin Buna via WhatsApp
          </button>
        </div>
      </div>

      {/* 9. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs md:text-sm">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-white font-extrabold text-base mb-2">SL168 Kustom Sablon & Printing</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Vendor penyedia jasa sablon baju profesional dan percetakan custom mug keramik berkualitas untuk kebutuhan B2B, seragam kantor, event, dan merchandise komunitas ke seluruh Indonesia.
            </p>
          </div>
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">Kontak Resmi</div>
            <ul className="space-y-1.5 text-xs">
              <li>Pengelola: <strong>Buna</strong></li>
              <li>WhatsApp: <strong>0852-8133-1249</strong></li>
              <li>Jam Layanan: Setiap Hari 08:00 - 21:00 WIB</li>
              <li>Jangkauan: Seluruh Indonesia</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">Legal & Kebijakan</div>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/privacy.html" className="hover:text-white underline">Kebijakan Privasi (Privacy Policy)</a></li>
              <li><button onClick={handleCTA} className="hover:text-white">Kontak Pengelola</button></li>
              <li><span>Wilayah Layanan: Seluruh Indonesia</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-wrap justify-between items-center text-xs text-slate-500">
          <div>&copy; 2026 SL168 Kustom (Buna). Hak Cipta Dilindungi Undang-Undang.</div>
          <div><a href="/privacy.html" className="underline hover:text-slate-400">Privacy Policy</a></div>
        </div>
      </footer>

      {/* 10. Sticky Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex items-center justify-between z-30 shadow-lg">
        <div>
          <div className="font-extrabold text-xs text-slate-900">SL168 Kustom</div>
          <div className="text-[10px] text-blue-700 font-bold">Mulai Rp 10rb - Rp 15rb</div>
        </div>
        <button
          onClick={handleCTA}
          className="bg-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow"
        >
          Chat WhatsApp &rarr;
        </button>
      </div>
    </div>
  );
}
