import { useState, useEffect, useRef, useCallback } from "react";
import { BookOpen, Search, Heart, Moon, Sun, Minus, Plus, ChevronLeft, ChevronRight, ArrowLeft, X, Upload, Trash2, FileUp, PlusCircle, UserRound, Menu as MenuIcon, Pencil, Image as ImageIcon, ThumbsUp, MessageCircle, Send, Eye, CalendarDays, Languages, Loader2 } from "lucide-react";

/* ============ DATA CONTOH (fiksyen, hak cipta milik reka bentuk ini) ============ */

const NOVELS = [
  {
    id: "n1",
    judul: "Bayu di Hujung Tanjung",
    penulis: "Aiman Zulkarnain",
    genre: ["Fantasi", "Pengembaraan"],
    status: "Berjalan",
    tarikhKeluar: "2025-03-14",
    warna2: "#C97B5F",
    sinopsis:
      "Selepas ribut besar melanda kampung nelayan Tanjung Rambai, seorang pemuda bernama Harith menemui sekeping kompas tua yang menuding ke arah yang tiada dalam peta mana pun. Bermulalah pengembaraannya merentasi lautan untuk mencari punca ribut yang tidak pernah reda sejak seribu tahun lalu.",
    bab: [
      {
        tajuk: "Bab 1: Kompas Yang Tersadai",
        isi: [
          "Ombak masih meninggalkan buih putih di tepi pantai Tanjung Rambai ketika Harith menjumpai kompas kuning itu tersangkut di celah akar bakau. Ia tidak seperti kompas biasa; jarumnya bergerak sendiri walaupun tiada sesiapa menggoncangnya, menuding ke arah laut lepas yang gelap.",
          "\"Ini pasti sisa kapal yang karam malam tadi,\" bisik Mak Long sambil mengeringkan jaring. Tetapi Harith tahu sesuatu yang lain — ukiran di belakang kompas itu sama seperti tatu di lengan datuknya yang telah lama hilang ditelan laut.",
          "Malam itu, buat julung kalinya sejak bertahun-tahun, Harith bermimpi tentang sebuah pulau yang tidak wujud di mana-mana peta. Dan apabila dia terjaga, jarum kompas itu masih menuding ke arah yang sama.",
        ],
      },
      {
        tajuk: "Bab 2: Ribut Yang Tidak Pernah Reda",
        isi: [
          "Sudah tujuh generasi penduduk Tanjung Rambai hidup dengan satu peraturan: jangan belayar melepasi Batu Bertangkup selepas waktu maghrib. Tiada siapa ingat sebabnya lagi, hanya bahawa setiap kali peraturan itu dilanggar, ribut akan datang menghukum seluruh kampung.",
          "Harith mengumpulkan keberanian untuk bertanya kepada Tok Imam, orang tertua di kampung. Jawapan yang diterimanya bukan cerita rakyat biasa — ia adalah amaran. \"Ada sesuatu yang dijaga di sebalik ribut itu, Harith. Dan kompas di tanganmu adalah kunci kepadanya.\"",
          "Pada malam ketujuh, tanpa memberitahu sesiapa, Harith menolak perahu ke laut. Langit yang tenang tiba-tiba bertukar gelap, dan buat pertama kali, dia berlayar melepasi Batu Bertangkup.",
        ],
      },
      {
        tajuk: "Bab 3: Pulau Yang Tiada Nama",
        isi: [
          "Kabus tebal menyelubungi perahu Harith selama tiga jam sebelum ia tiba-tiba lenyap, mendedahkan sebuah pulau bergunung yang memancarkan cahaya kehijauan dari puncaknya. Kompas di tangannya kini diam, jarumnya berhenti tepat menuding ke arah pulau itu.",
          "Di pantai, dia menjumpai runtuhan sebuah perkampungan lama, rumah-rumah kayu yang telah reput dimamah masa tetapi masih berdiri megah. Ukiran di setiap tiang serupa dengan tatu datuknya — dan dengan corak pada kompas itu sendiri.",
          "\"Kau lambat, cucu,\" satu suara bergema dari dalam kegelapan hutan. Harith menoleh, dan buat pertama kali dalam hidupnya, dia melihat wajah datuk yang hanya dikenalinya menerusi cerita Mak Long.",
        ],
      },
      {
        tajuk: "Bab 4: Rahsia Datuk Penjaga",
        isi: [
          "Datuknya, yang kini kelihatan tidak berusia langsung walaupun sudah dua puluh tahun menghilang, menjelaskan bahawa pulau itu adalah penjara bagi sesuatu yang jauh lebih tua daripada lautan itu sendiri. Ribut yang melanda Tanjung Rambai selama ini bukan hukuman — ia adalah amaran.",
          "\"Penjara ini semakin lemah, Harith. Aku memerlukan seseorang dari darah kita untuk mengukuhkannya semula, dan harganya bukan murah.\" Wajah datuknya nampak keletihan yang mendalam, seperti seseorang yang telah menanggung beban terlalu lama.",
          "Harith menggenggam kompas itu erat-erat. Untuk pertama kalinya, dia faham bahawa pengembaraannya bukan sekadar mencari jawapan — ia adalah tentang memilih sama ada mengikut jejak datuknya, atau mencari jalan yang baharu sama sekali.",
        ],
      },
    ],
  },
  {
    id: "n2",
    judul: "Surat Untuk Hujan November",
    penulis: "Nadhirah Iskandar",
    genre: ["Roman", "Drama"],
    status: "Tamat",
    tarikhKeluar: "2024-11-02",
    warna2: "#6E9B7E",
    sinopsis:
      "Delapan tahun selepas kematian ibunya, Iris menemui sebuah kotak berisi surat-surat yang tidak pernah dihantar — ditulis oleh ibunya kepada seseorang bernama 'Hujan'. Untuk memahami sejarah keluarganya yang tersembunyi, Iris perlu mencari lelaki di sebalik nama itu sebelum musim hujan November berakhir buat kali terakhir.",
    bab: [
      {
        tajuk: "Bab 1: Kotak Berhabuk",
        isi: [
          "Iris tidak pernah suka membersihkan bilik stor, tetapi ayahnya sudah tiga kali meminta sejak seminggu lalu. Di antara kotak-kotak lama, satu kotak kayu berukir menarik perhatiannya — kunci kecil tergantung pada seutas benang merah di penutupnya.",
          "Di dalamnya, berpuluh-puluh surat yang tidak pernah dihantar, semuanya bertulis tangan ibunya yang telah meninggal dunia lapan tahun lalu. Setiap surat bermula dengan kata yang sama: 'Untuk Hujan yang aku rindui.'",
          "Iris membaca surat pertama dengan tangan yang menggigil. Ia bertarikh setahun sebelum ibunya berkahwin dengan ayahnya — dan ia bukan ditulis untuk ayahnya sama sekali.",
        ],
      },
      {
        tajuk: "Bab 2: Nama Yang Disembunyikan",
        isi: [
          "Selama seminggu, Iris membaca surat demi surat secara senyap-senyap, cuba menyusun potongan sejarah yang tidak pernah diceritakan kepadanya. 'Hujan' adalah nama panggilan untuk seorang lelaki yang ibunya cintai sebelum keadaan memisahkan mereka.",
          "Ayahnya, apabila akhirnya ditanya, hanya mendiamkan diri lama sebelum berkata, \"Ibu kau memang ada kehidupan sebelum aku, Iris. Aku tak pernah rasa berhak untuk menghalang kau mengenalinya.\"",
          "Dengan restu ayahnya, Iris memulakan pencariannya — bermula dengan satu nama sebenar yang tertera di penjuru surat terakhir: Rayyan.",
        ],
      },
      {
        tajuk: "Bab 3: Kedai Buku Lama",
        isi: [
          "Petunjuk membawa Iris ke sebuah kedai buku lama di tengah bandar, tempat menurut surat terakhir, Rayyan pernah bekerja sebagai penjaga kedai semasa hujung minggu. Kedai itu masih ada, walaupun pemiliknya sudah bertukar dua kali.",
          "Pemilik sekarang, seorang wanita tua bernama Kak Yah, mengenali nama Rayyan sebaik sahaja disebut. \"Rayyan? Dia masih datang sini setiap November, duduk di sudut yang sama, membaca buku yang sama.\"",
          "Jantung Iris berdegup kencang. Musim hujan November baru sahaja bermula minggu lalu.",
        ],
      },
      {
        tajuk: "Bab 4: Sudut Yang Sama",
        isi: [
          "Iris kembali ke kedai buku itu setiap petang selama seminggu, menunggu dengan sabar di meja bersebelahan sudut yang dimaksudkan Kak Yah. Pada hari keenam, seorang lelaki berusia lingkungan enam puluhan masuk, terus menuju ke sudut itu tanpa perlu bertanya.",
          "\"Awak mesti Rayyan,\" kata Iris, suaranya bergetar sedikit. Lelaki itu terkejut, kemudian matanya melembut apabila melihat wajah Iris — wajah yang jelas mewarisi banyak ciri seseorang yang pernah amat dikenalinya.",
          "\"Kau anak Salmah,\" katanya perlahan, bukan sebagai soalan. \"Aku dah agak suatu hari nanti seseorang akan datang membawa cerita ini kembali.\"",
        ],
      },
    ],
  },
  {
    id: "n3",
    judul: "Kod Merah di Lorong Tiga",
    penulis: "Faris Rahman",
    genre: ["Misteri", "Thriller"],
    status: "Berjalan",
    tarikhKeluar: "2026-01-20",
    warna: "#2B3A52",
    warna2: "#4A6BA8",
    sinopsis:
      "Seorang wartawan siasatan, Damia, menerima e-mel tanpa nama yang mendedahkan bahawa kematian seorang pegawai bandar dua tahun lalu bukan kemalangan seperti yang disiasat polis. Setiap petunjuk membawanya lebih dekat kepada rangkaian rasuah yang lebih besar daripada yang dijangkakan — dan lebih berbahaya.",
    bab: [
      {
        tajuk: "Bab 1: E-mel Tanpa Nama",
        isi: [
          "Damia hampir memadam e-mel itu, menyangkanya spam biasa. Tetapi subjek e-mel — 'Kematian En. Halim bukan kemalangan' — membuatkan jarinya terhenti di atas butang padam.",
          "Lampiran itu mengandungi gambar-gambar dokumen yang telah dicoret dan disenaraikan semula, bertarikh dua minggu sebelum En. Halim, bekas Pegawai Perancang Bandar, dijumpai mati dalam kemalangan kereta di Lorong Tiga.",
          "Sebagai wartawan siasatan berpengalaman lima tahun, Damia tahu satu perkara: e-mel sebegini tidak pernah datang tanpa sebab. Seseorang mahu cerita ini didedahkan — dan seseorang lain pastinya mahu ia terus terkubur.",
        ],
      },
      {
        tajuk: "Bab 2: Lorong Tiga",
        isi: [
          "Laporan polis rasmi menyatakan En. Halim kehilangan kawalan kenderaan akibat jalan licin selepas hujan. Tetapi apabila Damia melawat Lorong Tiga sendiri, dia mendapati sesuatu yang pelik — tiada rekod hujan pada malam kejadian itu di stesen cuaca berdekatan.",
          "Seorang peniaga gerai berhampiran, yang enggan dinamakan, memberitahu bahawa dia nampak sebuah kereta lain meninggalkan kawasan itu tergesa-gesa sejurus sebelum kemalangan — sesuatu yang tidak pernah disebut dalam mana-mana laporan.",
          "Damia menulis semuanya dalam buku nota kecilnya, tangan sedikit menggigil. Ini bukan lagi sekadar cerita — ini adalah kes yang perlu disiasat semula.",
        ],
      },
      {
        tajuk: "Bab 3: Dokumen Yang Hilang",
        isi: [
          "Permintaan rasmi Damia untuk fail kematian En. Halim ditolak tanpa sebab yang jelas oleh pejabat berkenaan. Apabila dia cuba menghubungi bekas rakan sekerja En. Halim, kebanyakan mereka enggan bercakap — sesetengahnya kelihatan takut.",
          "Hanya seorang, seorang kerani muda bernama Zulaikha, sanggup bertemu Damia secara sulit di sebuah kafe di pinggir bandar. \"En. Halim jumpa sesuatu dalam fail projek pembangunan tanah,\" bisiknya. \"Sesuatu yang tak patut dia jumpa.\"",
          "Sebelum sempat Zulaikha menjelaskan lebih lanjut, telefonnya berdering — dan wajahnya bertukar pucat sebaik melihat nombor pemanggil.",
        ],
      },
      {
        tajuk: "Bab 4: Amaran Pertama",
        isi: [
          "Malam itu, apabila Damia pulang ke apartmennya, dia mendapati pintu telah terbuka sedikit — tanda ia telah dibuka paksa. Di dalam, tiada apa yang hilang, tetapi fail-fail siasatannya di atas meja telah disusun semula dengan kemas, dalam susunan yang berbeza daripada yang ditinggalkannya.",
          "Sepucuk nota kecil terselit di antara fail-fail itu, hanya bertulis: 'Berhenti sebelum terlambat.'",
          "Damia menatap nota itu lama, kemudian tersenyum nipis. Sesiapa sahaja yang menghantar amaran ini baru sahaja mengesahkan satu perkara — dia berada di landasan yang betul.",
        ],
      },
    ],
  },
  {
    id: "n4",
    judul: "Pedang Terakhir Kesatria Rimba",
    penulis: "Hakim Osman",
    genre: ["Aksi", "Fantasi"],
    status: "Berjalan",
    tarikhKeluar: "2025-07-08",
    warna: "#5C3A1E",
    warna2: "#B87B3C",
    sinopsis:
      "Selepas kejatuhan Kerajaan Rimba Larangan, hanya seorang kesatria muda bernama Zaki yang terselamat, membawa bersamanya pedang pusaka yang dipercayai boleh membangkitkan semula kerajaan itu — jika ia jatuh ke tangan yang layak.",
    bab: [
      {
        tajuk: "Bab 1: Reruntuhan Istana",
        isi: [
          "Asap masih berkepul dari runtuhan Istana Rimba Larangan ketika Zaki tersedar di celah batu-batu yang berselerak. Setiap kesatria yang dikenalinya, setiap guru yang mengajarnya bersilat, telah tiada — hanya dia yang tinggal, terluka tetapi hidup.",
          "Pedang Warisan, senjata yang telah diwariskan turun-temurun selama dua belas generasi raja, masih tergenggam erat di tangannya, tidak pernah lepas walaupun dia tidak sedarkan diri berjam-jam.",
          "Dari kejauhan, dia mendengar bunyi kuda berlari mendekat — dan dia tidak tahu sama ada itu adalah bantuan, atau musuh yang datang untuk menghabiskan apa yang tinggal.",
        ],
      },
      {
        tajuk: "Bab 2: Penunggang Yang Tidak Dikenali",
        isi: [
          "Penunggang kuda itu ternyata seorang wanita bertopeng, mengenakan lambang yang tidak pernah dilihat Zaki sebelum ini — bulan sabit di atas api. Dia turun dari kudanya perlahan, tangan terangkat menunjukkan dia tidak membawa senjata.",
          "\"Aku Serena, dari Pertubuhan Bayang,\" katanya. \"Kami telah menunggu kejatuhan Rimba Larangan sekian lama. Bukan untuk meraikannya — tetapi untuk memastikan Pedang Warisan tidak jatuh ke tangan yang salah.\"",
          "Zaki mengetatkan genggamannya pada pedang itu, curiga. \"Kenapa aku patut percayakan kau?\" Serena hanya tersenyum nipis. \"Kau tak perlu. Tetapi tentera yang membakar istana kau sedang menuju ke sini sekarang, dan kau ada masa kurang lima minit untuk membuat keputusan.\"",
        ],
      },
      {
        tajuk: "Bab 3: Pelarian ke Hutan Cengal",
        isi: [
          "Mereka berlari merentasi Hutan Cengal, sebuah kawasan hutan lebat yang dipercayai dijaga oleh roh-roh nenek moyang kesatria Rimba Larangan. Zaki tidak pernah dibenarkan masuk ke sana semasa istana masih berdiri — ia adalah kawasan larangan bagi sesiapa yang belum ditabalkan sebagai raja.",
          "\"Kau tahu kenapa mereka membakar istana kau?\" tanya Serena sambil berlari. \"Bukan untuk tanah, bukan untuk kekayaan. Mereka mahu Pedang Warisan — dan mereka tahu ia hanya boleh dicabut sepenuhnya oleh waris sah takhta.\"",
          "Zaki tersentak. Dia hanya seorang kesatria biasa, bukan waris takhta. Tetapi pedang itu, entah bagaimana, memilihnya untuk terus digenggam sejak detik pertama runtuhan istana.",
        ],
      },
      {
        tajuk: "Bab 4: Suara Dari Pedang",
        isi: [
          "Ketika mereka berhenti berehat jauh di dalam Hutan Cengal, Zaki mula mendengar bisikan dari pedang itu buat pertama kali — suara seorang lelaki tua, tenang tetapi tegas. \"Kau bukan waris darah, Zaki. Tetapi kau adalah waris semangat. Dan itu, pada zaman sebegini, mungkin lebih penting.\"",
          "Serena, yang turut mendengar bisikan itu, memandang Zaki dengan pandangan baharu. \"Pedang itu baru sahaja memilih kau secara rasmi. Itu bermakna perjalanan sebenar kau baru sahaja bermula.\"",
          "Di langit malam Hutan Cengal, bintang-bintang mula berkelip dengan corak yang aneh — corak yang sama seperti yang terukir pada hulu Pedang Warisan.",
        ],
      },
    ],
  },
];

const GENRES = ["Semua", "Fantasi", "Roman", "Misteri", "Aksi", "Drama", "Pengembaraan", "Thriller"];
const GENRES_BOLEH_PILIH = GENRES.filter((g) => g !== "Semua");

/* Palet warna kulit buku untuk novel yang dimuat naik pengguna */
const PALET_KULIT = [
  { warna: "#4A3B5C", warna2: "#7C5FA0" },
  { warna: "#5C2E2E", warna2: "#A05050" },
  { warna: "#2E4A4A", warna2: "#4E8A87" },
  { warna: "#4A3820", warna2: "#8A6A38" },
  { warna: "#2C3E5C", warna2: "#5578A8" },
  { warna: "#4A2E45", warna2: "#8A5580" },
];

function janaIdNovel() {
  return "u-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}

/* Pecahkan teks kepada perenggan (baris kosong sebagai pemisah) */
function teksKePerenggan(teks) {
  return teks
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/* Mampatkan & tukar fail gambar kepada data URL supaya sesuai untuk storan */
function mampatkanGambar(fail) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const lebarMax = 640;
        const skala = Math.min(1, lebarMax / img.width);
        const w = Math.max(1, Math.round(img.width * skala));
        const h = Math.max(1, Math.round(img.height * skala));
        const kanvas = document.createElement("canvas");
        kanvas.width = w;
        kanvas.height = h;
        const ctx = kanvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(kanvas.toDataURL("image/jpeg", 0.78));
      };
      img.onerror = () => reject(new Error("Gagal memuatkan gambar"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("Gagal membaca fail"));
    reader.readAsDataURL(fail);
  });
}

/* ============ STORAGE HELPERS ============ */

async function getStorage(key, fallback, kongsi = false) {
  try {
    const res = await window.storage.get(key, kongsi);
    return res ? JSON.parse(res.value) : fallback;
  } catch {
    return fallback;
  }
}
async function setStorage(key, value, kongsi = false) {
  try {
    await window.storage.set(key, JSON.stringify(value), kongsi);
  } catch {
    /* senyap jika gagal */
  }
}

/* Format masa relatif ringkas untuk komen, cth "5 minit lalu" */
function masaLalu(masa) {
  const saat = Math.floor((Date.now() - masa) / 1000);
  if (saat < 60) return "Baru sahaja";
  const minit = Math.floor(saat / 60);
  if (minit < 60) return `${minit} minit lalu`;
  const jam = Math.floor(minit / 60);
  if (jam < 24) return `${jam} jam lalu`;
  const hari = Math.floor(jam / 24);
  if (hari < 30) return `${hari} hari lalu`;
  return new Date(masa).toLocaleDateString("ms-MY", { day: "numeric", month: "short", year: "numeric" });
}

/* Naikkan kiraan bacaan (dikongsi) untuk sesebuah novel */
async function tambahBacaan(novelId) {
  try {
    const semasa = await getStorage(`baca-jumlah:${novelId}`, 0, true);
    await setStorage(`baca-jumlah:${novelId}`, semasa + 1, true);
    return semasa + 1;
  } catch {
    return null;
  }
}

/* Rekod sejarah bacaan peribadi (macam "History" YouTube) — simpan 50 entri terbaharu */
async function tambahSejarah(novelId, chapterIndex) {
  try {
    const sedia = await getStorage("sejarah-bacaan", [], false);
    const disaring = sedia.filter((e) => !(e.novelId === novelId && e.chapterIndex === chapterIndex));
    const baharu = [
      { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), novelId, chapterIndex, masa: Date.now() },
      ...disaring,
    ].slice(0, 50);
    await setStorage("sejarah-bacaan", baharu, false);
    return baharu;
  } catch {
    return null;
  }
}

/* ============ BOT TERJEMAH AI (dikongsi merentasi Home & Reader) ============ */
const BAHASA_TERSEDIA = [
  "Bahasa Inggeris",
  "Bahasa Indonesia",
  "Bahasa Cina (Mandarin)",
  "Bahasa Tamil",
  "Bahasa Arab",
  "Bahasa Jepun",
];

async function terjemahTeksAI(teks, bahasa) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Terjemahkan teks Bahasa Malaysia di bawah ke dalam ${bahasa}. Kekalkan pemisahan perenggan asal (satu baris kosong antara setiap perenggan jika ada). Kekalkan nada dan gaya asal. Berikan HANYA teks terjemahan sahaja, tanpa sebarang penjelasan, nota, atau ayat pembuka tambahan.\n\n${teks}`,
        },
      ],
    }),
  });
  const data = await res.json();
  const hasil = (data.content || [])
    .map((c) => c.text || "")
    .join("\n")
    .trim();
  if (!hasil) throw new Error("kosong");
  return hasil;
}

/* Komponen kecil boleh guna semula: butang "Terjemah dengan AI" + paparan hasil */
function TerjemahTeks({ teks, gayaTeks, temaTerang }) {
  const [tunjukPilih, setTunjukPilih] = useState(false);
  const [sedang, setSedang] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [bahasa, setBahasa] = useState("");
  const [ralat, setRalat] = useState("");

  const terjemah = async (b) => {
    setTunjukPilih(false);
    setSedang(true);
    setRalat("");
    try {
      const t = await terjemahTeksAI(teks, b);
      setHasil(t);
      setBahasa(b);
    } catch {
      setRalat("Terjemahan gagal. Sila cuba lagi.");
    } finally {
      setSedang(false);
    }
  };

  const warnaAksen = temaTerang ? "#B8862E" : "#E3A542";
  const warnaMuted = temaTerang ? "#8A8168" : "#8B8578";

  return (
    <div>
      <p className={gayaTeks?.className} style={gayaTeks?.style}>
        {hasil || teks}
      </p>
      <div className="relative inline-block mt-2">
        <button
          onClick={() => setTunjukPilih((v) => !v)}
          className="font-ui text-[11px] inline-flex items-center gap-1.5"
          style={{ color: warnaAksen }}
        >
          {sedang ? <Loader2 size={11} className="animate-spin" /> : <Languages size={11} />}
          {hasil ? `Diterjemah ke ${bahasa} · tukar bahasa` : "Terjemah dengan AI"}
        </button>
        {hasil && (
          <button
            onClick={() => setHasil(null)}
            className="font-ui text-[11px] ml-2.5 underline"
            style={{ color: warnaMuted }}
          >
            teks asal
          </button>
        )}
        {tunjukPilih && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setTunjukPilih(false)} />
            <div
              className="absolute left-0 top-6 z-20 w-52 rounded-sm overflow-hidden py-1"
              style={{ background: "#1A1712", border: "1px solid #33301F", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
            >
              {BAHASA_TERSEDIA.map((b) => (
                <button
                  key={b}
                  onClick={() => terjemah(b)}
                  className="font-ui w-full text-left px-3 py-2 text-xs"
                  style={{ color: b === bahasa && hasil ? "#E3A542" : "#E6E1D3" }}
                >
                  {b}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {ralat && (
        <p className="font-ui text-[11px] mt-1" style={{ color: "#E37A5A" }}>
          {ralat}
        </p>
      )}
    </div>
  );
}

/* Format angka besar ringkas, cth 12400 -> "12.4k" */
function formatAngka(n) {
  if (n === null || n === undefined) return "…";
  if (n < 1000) return String(n);
  if (n < 1000000) return (n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0) + "k";
  return (n / 1000000).toFixed(1) + "j";
}

/* Warna tema mengikut mod bacaan (siang/malam) untuk seluruh app */
function temaWarna(mode) {
  const siang = mode === "siang";
  return {
    siang,
    bg: siang ? "#F3EEDD" : "#171923",
    permukaan: siang ? "#FFFFFF" : "#1D2029",
    permukaan2: siang ? "#FBF6E8" : "#171923",
    garis: siang ? "#E1D6B4" : "#2A2E3A",
    teksUtama: siang ? "#2B2620" : "#F6EFE0",
    teksKedua: siang ? "#5C5544" : "#C9C2AF",
    teksMuted: "#8B8578",
  };
}

/* ============ FONTS & GLOBAL STYLE ============ */

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
    .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
    .font-body { font-family: 'Literata', serif; }
    .font-ui { font-family: 'IBM Plex Sans', sans-serif; }
    ::selection { background: #E3A54255; }
    @keyframes denyutLogo { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.06); opacity: 0.85; } }
    @keyframes titikMuat { 0%, 80%, 100% { opacity: 0.25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
    .denyut-logo { animation: denyutLogo 1.8s ease-in-out infinite; }
    .titik-muat { animation: titikMuat 1.2s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
    }
  `}</style>
);

/* Format tarikh keluar novel, cth "14 Mac 2025" */
function formatTarikh(iso) {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("ms-MY", { day: "numeric", month: "long", year: "numeric" });
}

/* PIN pemilik — tukar nilai ini kepada kod rahsia anda sendiri sebelum dikongsi kepada orang ramai */
const PIN_PEMILIK = "novel123";

/* ============ MODAL LOG MASUK PEMILIK ============ */
function LoginPemilikModal({ onClose, onBerjaya }) {
  const [pin, setPin] = useState("");
  const [ralat, setRalat] = useState("");

  const hantar = () => {
    if (pin === PIN_PEMILIK) {
      onBerjaya();
    } else {
      setRalat("PIN salah. Sila cuba lagi.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: "rgba(10,11,16,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-sm p-6"
        style={{ background: "#1D2029", border: "1px solid #2A2E3A" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg flex items-center gap-2" style={{ color: "#F6EFE0" }}>
            🔒 Log Masuk Pemilik
          </h2>
          <button onClick={onClose} aria-label="Tutup"><X size={18} color="#8B8578" /></button>
        </div>
        <p className="font-ui text-xs mb-3" style={{ color: "#8B8578" }}>
          Hanya pemilik boleh muat naik, edit atau padam novel. Masukkan PIN untuk teruskan.
        </p>
        <input
          type="password"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setRalat("");
          }}
          onKeyDown={(e) => e.key === "Enter" && hantar()}
          placeholder="Masukkan PIN"
          autoFocus
          className="font-ui w-full px-3 py-2.5 rounded-sm text-sm outline-none mb-2"
          style={{ background: "#171923", color: "#F6EFE0", border: "1px solid #2A2E3A" }}
        />
        {ralat && <p className="font-ui text-xs mb-2" style={{ color: "#E37A5A" }}>{ralat}</p>}
        <button
          onClick={hantar}
          className="font-ui w-full py-2.5 rounded-sm text-sm font-medium mt-2"
          style={{ background: "#E3A542", color: "#171923" }}
        >
          Log Masuk
        </button>
      </div>
    </div>
  );
}

/* ============ RIBBON (elemen tandatangan) ============ */
/* Reben penanda buku yang menunjukkan kemajuan bacaan bab semasa */
function ReadingRibbon({ progress, dark }) {
  return (
    <div
      className="fixed top-0 right-6 md:right-14 z-30 pointer-events-none hidden sm:block"
      style={{ height: "100vh" }}
    >
      <div
        style={{
          width: 14,
          height: `${Math.max(6, progress * 100)}vh`,
          background: dark
            ? "linear-gradient(180deg, #E3A542 0%, #C97B3C 100%)"
            : "linear-gradient(180deg, #E3A542 0%, #B8862E 100%)",
          clipPath:
            progress >= 0.995
              ? "polygon(0 0,100% 0,100% 100%,50% 88%,0 100%)"
              : "polygon(0 0,100% 0,100% 100%,50% calc(100% - 10px),0 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          transition: "height 120ms linear",
        }}
      />
    </div>
  );
}

/* ============ KAD NOVEL ============ */
function NovelCard({ novel, onOpen, isFav, onToggleFav, onPadam, onEdit, jumlahBaca, adalahPemilik, rankingTrending }) {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <div
      className="group relative rounded-sm overflow-hidden cursor-pointer"
      onClick={() => onOpen(novel.id)}
      style={{ background: "#1D2029" }}
    >
      <div
        className="relative h-52 flex items-end p-4"
        style={
          novel.gambarUrl
            ? { backgroundImage: `url(${novel.gambarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: `linear-gradient(160deg, ${novel.warna} 0%, ${novel.warna2} 100%)` }
        }
      >
        {novel.gambarUrl && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.78) 100%)" }}
          />
        )}
        {/* penjuru terlipat - isyarat "penanda halaman" */}
        <div
          className="absolute top-0 right-0 w-8 h-8"
          style={{
            background: "rgba(0,0,0,0.18)",
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        {/* butang menu (☰) */}
        <div className="absolute top-3 left-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuTerbuka((v) => !v);
            }}
            aria-label="Menu novel"
            aria-expanded={menuTerbuka}
            className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[3px]"
            style={{ background: "#1A1712", border: "1px solid rgba(227,165,66,0.25)", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            <span style={{ width: 16, height: 2, borderRadius: 2, background: "#E3A542" }} />
            <span style={{ width: 16, height: 2, borderRadius: 2, background: "#E3A542" }} />
            <span style={{ width: 16, height: 2, borderRadius: 2, background: "#E3A542" }} />
          </button>

          {menuTerbuka && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuTerbuka(false);
                }}
              />
              <div
                className="absolute left-0 top-11 z-20 w-44 rounded-sm overflow-hidden py-1"
                style={{ background: "#1A1712", border: "1px solid #33301F", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setMenuTerbuka(false);
                    onOpen(novel.id);
                  }}
                  className="font-ui w-full text-left px-3 py-2 text-xs"
                  style={{ color: "#E6E1D3" }}
                >
                  Baca sekarang
                </button>
                <button
                  onClick={() => {
                    setMenuTerbuka(false);
                    onToggleFav(novel.id);
                  }}
                  className="font-ui w-full text-left px-3 py-2 text-xs flex items-center gap-2"
                  style={{ color: "#E6E1D3" }}
                >
                  <Heart size={12} color="#E3A542" fill={isFav ? "#E3A542" : "none"} />
                  {isFav ? "Buang dari kegemaran" : "Tambah ke kegemaran"}
                </button>
                {adalahPemilik && (
                  <>
                    <div style={{ borderTop: "1px solid #2E2A20" }} className="my-1" />
                    <button
                      onClick={() => {
                        setMenuTerbuka(false);
                        onEdit(novel);
                      }}
                      className="font-ui w-full text-left px-3 py-2 text-xs flex items-center gap-2"
                      style={{ color: "#E6E1D3" }}
                    >
                      <Pencil size={12} color="#E3A542" /> Edit novel
                    </button>
                    <button
                      onClick={() => {
                        setMenuTerbuka(false);
                        onPadam(novel.id);
                      }}
                      className="font-ui w-full text-left px-3 py-2 text-xs flex items-center gap-2"
                      style={{ color: "#C97060" }}
                    >
                      <Trash2 size={12} /> Padam novel
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {novel.milikSendiri && (
          <span
            className="absolute top-3 right-3 font-ui text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{ background: "rgba(0,0,0,0.3)", color: "#F6EFE0" }}
          >
            <UserRound size={9} /> Anda
          </span>
        )}
        {rankingTrending && (
          <span
            className="absolute top-3 right-3 font-ui text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
            style={{ background: "#E3A542", color: "#171923" }}
          >
            🔥 #{rankingTrending}
          </span>
        )}
        <p className="font-display text-lg leading-tight text-[#F6EFE0]" style={{ textWrap: "balance" }}>
          {novel.judul}
        </p>
      </div>
      <div className="p-3">
        <p className="font-ui text-[11px] tracking-wide uppercase flex items-center gap-1.5" style={{ color: "#8B8578" }}>
          {novel.penulis}
          <span className="ml-auto normal-case flex items-center gap-1" style={{ color: "#6E6A5C" }}>
            <Eye size={11} /> {formatAngka(jumlahBaca)}
          </span>
        </p>
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {novel.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="font-ui text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "#2A2E3A", color: "#C9C2AF" }}
            >
              {g}
            </span>
          ))}
          <span
            className="font-ui text-[10px] px-2 py-0.5 rounded-full ml-auto"
            style={{
              color: novel.status === "Tamat" ? "#3E7C7B" : "#E3A542",
            }}
          >
            {novel.status}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============ HALAMAN UTAMA ============ */
function Home({ novels, onOpen, favs, onToggleFav, query, setQuery, onPadam, onEdit, tapisan, onKosongkanTapisan, tema, adalahPemilik }) {
  const [genreAktif, setGenreAktif] = useState("Semua");
  const [petaBaca, setPetaBaca] = useState({});
  const [petaSuka, setPetaSuka] = useState({});
  const [petaKomen, setPetaKomen] = useState({});
  const unggulan = novels[0];

  useEffect(() => {
    let batal = false;
    (async () => {
      const pasangan = await Promise.all(
        novels.map(async (n) => [n.id, await getStorage(`baca-jumlah:${n.id}`, 0, true)])
      );
      const pasanganSuka = await Promise.all(
        novels.map(async (n) => [n.id, await getStorage(`suka-jumlah:${n.id}`, 0, true)])
      );
      const pasanganKomen = await Promise.all(
        novels.map(async (n) => [n.id, (await getStorage(`komen:${n.id}`, [], true)).length])
      );
      if (!batal) {
        setPetaBaca(Object.fromEntries(pasangan));
        setPetaSuka(Object.fromEntries(pasanganSuka));
        setPetaKomen(Object.fromEntries(pasanganKomen));
      }
    })();
    return () => {
      batal = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [novels.map((n) => n.id).join(",")]);

  /* Skor trending: gabungan bacaan, suka (x3) dan komen (x4) — macam susunan "Trending" */
  const skorTrending = (id) => (petaBaca[id] ?? 0) + (petaSuka[id] ?? 0) * 3 + (petaKomen[id] ?? 0) * 4;

  const disenarai = novels
    .filter((n) => {
      const cocokGenre = genreAktif === "Semua" || n.genre.includes(genreAktif);
      const cocokCari =
        query.trim() === "" ||
        n.judul.toLowerCase().includes(query.toLowerCase()) ||
        n.penulis.toLowerCase().includes(query.toLowerCase());
      const cocokFav = tapisan !== "fav" || favs.includes(n.id);
      const cocokMilik = tapisan !== "milik" || n.milikSendiri;
      return cocokGenre && cocokCari && cocokFav && cocokMilik;
    })
    .slice()
    .sort((a, b) => {
      if (tapisan === "terkini") return new Date(b.tarikhKeluar || 0) - new Date(a.tarikhKeluar || 0);
      if (tapisan === "trending") return skorTrending(b.id) - skorTrending(a.id);
      return 0;
    });

  return (
    <div>
      {/* HERO */}
      {!tapisan && (
        <div
          className="relative overflow-hidden px-6 md:px-14 pt-10 pb-14"
          style={
            unggulan.gambarUrl
              ? { backgroundImage: `url(${unggulan.gambarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { background: `linear-gradient(115deg, ${unggulan.warna} 0%, #14161F 72%)` }
          }
        >
          {unggulan.gambarUrl && (
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,11,16,0.92) 30%, rgba(10,11,16,0.35) 100%)" }} />
          )}
          <div className="relative">
            <p className="font-ui text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: "#E3A542" }}>
              Bab Baharu Setiap Minggu
            </p>
            <h1 className="font-display text-3xl md:text-5xl max-w-2xl leading-[1.08] text-[#F6EFE0]">
              {unggulan.judul}
            </h1>
            <div className="max-w-xl mt-4">
              <TerjemahTeks
                teks={unggulan.sinopsis}
                gayaTeks={{ className: "font-body text-sm md:text-base leading-relaxed", style: { color: "#C9C2AF" } }}
              />
            </div>
            <button
              onClick={() => onOpen(unggulan.id)}
              className="font-ui mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: "#E3A542", color: "#171923" }}
            >
              <BookOpen size={16} /> Baca Sekarang
            </button>
          </div>
        </div>
      )}

      {tapisan && (
        <div className="px-6 md:px-14 pt-8 flex items-center gap-2">
          <span
            className="font-ui text-xs px-3 py-1.5 rounded-full flex items-center gap-2"
            style={{ background: "#1D2029", color: "#E3A542", border: "1px solid #E3A542" }}
          >
            {tapisan === "fav"
              ? "❤️ Kegemaran"
              : tapisan === "milik"
              ? "📚 Novel Anda"
              : tapisan === "trending"
              ? "🔥 Trending"
              : "🕓 Terkini Dikemas Kini"}
            <button onClick={onKosongkanTapisan} aria-label="Kosongkan tapisan">
              <X size={12} color="#E3A542" />
            </button>
          </span>
        </div>
      )}

      {/* CARIAN & GENRE */}
      <div className="px-6 md:px-14 mt-8">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color={tema.teksKedua} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tajuk atau penulis…"
            className="font-ui w-full pl-9 pr-3 py-2.5 rounded-sm text-sm outline-none"
            style={{ background: tema.permukaan, color: tema.teksUtama, border: `1px solid ${tema.garis}` }}
          />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenreAktif(g)}
              className="font-ui text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors"
              style={{
                background: genreAktif === g ? "#E3A542" : tema.permukaan,
                color: genreAktif === g ? "#171923" : tema.teksKedua,
                border: "1px solid " + (genreAktif === g ? "#E3A542" : tema.garis),
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* GRID NOVEL */}
      <div className="px-6 md:px-14 mt-8 pb-16">
        <h2 className="font-display text-xl mb-4" style={{ color: tema.teksUtama }}>
          {genreAktif === "Semua" ? "Semua Novel" : genreAktif}
        </h2>
        {disenarai.length === 0 ? (
          <p className="font-body text-sm" style={{ color: "#8B8578" }}>
            Tiada novel dijumpai buat masa ini. Cuba kata kunci lain.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {disenarai.map((n, i) => (
              <NovelCard
                key={n.id}
                novel={n}
                onOpen={onOpen}
                isFav={favs.includes(n.id)}
                onToggleFav={onToggleFav}
                onPadam={onPadam}
                onEdit={onEdit}
                jumlahBaca={petaBaca[n.id] ?? null}
                adalahPemilik={adalahPemilik}
                rankingTrending={tapisan === "trending" ? i + 1 : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ HALAMAN DETAIL NOVEL ============ */
function NovelDetail({ novel, onBack, onReadChapter, progress, isFav, onToggleFav, onTambahBab, onPadam, onEdit, adalahPemilik }) {
  const babTerakhirDibaca = progress?.[novel.id] ?? null;
  const [sahkanPadam, setSahkanPadam] = useState(false);
  const [jumlahSuka, setJumlahSuka] = useState(0);
  const [sudahSuka, setSudahSuka] = useState(false);
  const [memuatSosial, setMemuatSosial] = useState(true);
  const [jumlahBaca, setJumlahBaca] = useState(null);

  useEffect(() => {
    let batal = false;
    setMemuatSosial(true);
    (async () => {
      const jumlah = await getStorage(`suka-jumlah:${novel.id}`, 0, true);
      const milik = await getStorage(`suka-milik:${novel.id}`, false, false);
      const bacaan = await getStorage(`baca-jumlah:${novel.id}`, 0, true);
      if (!batal) {
        setJumlahSuka(jumlah);
        setSudahSuka(milik);
        setJumlahBaca(bacaan);
        setMemuatSosial(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, [novel.id]);

  const toggleSuka = async () => {
    const disukaiBaharu = !sudahSuka;
    const jumlahBaharu = Math.max(0, jumlahSuka + (disukaiBaharu ? 1 : -1));
    setSudahSuka(disukaiBaharu);
    setJumlahSuka(jumlahBaharu);
    await setStorage(`suka-milik:${novel.id}`, disukaiBaharu, false);
    await setStorage(`suka-jumlah:${novel.id}`, jumlahBaharu, true);
  };

  return (
    <div className="px-6 md:px-14 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="font-ui text-xs flex items-center gap-1.5"
          style={{ color: "#8B8578" }}
        >
          <ArrowLeft size={14} /> Kembali
        </button>
        {adalahPemilik && !sahkanPadam && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => onEdit(novel)}
              className="font-ui text-xs flex items-center gap-1.5"
              style={{ color: "#E3A542" }}
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              onClick={() => setSahkanPadam(true)}
              className="font-ui text-xs flex items-center gap-1.5"
              style={{ color: "#8B8578" }}
            >
              <Trash2 size={13} /> Padam novel
            </button>
          </div>
        )}
        {adalahPemilik && sahkanPadam && (
          <div className="flex items-center gap-2">
            <span className="font-ui text-xs" style={{ color: "#C9C2AF" }}>Padam novel ini?</span>
            <button
              onClick={() => onPadam(novel.id)}
              className="font-ui text-xs px-2.5 py-1 rounded-sm"
              style={{ background: "#B8564A", color: "#F6EFE0" }}
            >
              Ya, padam
            </button>
            <button
              onClick={() => setSahkanPadam(false)}
              className="font-ui text-xs"
              style={{ color: "#8B8578" }}
            >
              Batal
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="w-full md:w-48 h-64 rounded-sm shrink-0 flex items-end p-4 relative"
          style={
            novel.gambarUrl
              ? { backgroundImage: `url(${novel.gambarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { background: `linear-gradient(160deg, ${novel.warna} 0%, ${novel.warna2} 100%)` }
          }
        >
          {novel.gambarUrl && (
            <div className="absolute inset-0 rounded-sm" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)" }} />
          )}
          <p className="relative font-display text-lg leading-tight text-[#F6EFE0]">{novel.judul}</p>
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl md:text-3xl" style={{ color: "#F6EFE0" }}>
            {novel.judul}
          </h1>
          <p className="font-ui text-sm mt-1 flex items-center gap-1.5" style={{ color: "#8B8578" }}>
            oleh {novel.penulis}
            <span style={{ color: "#4A4A55" }}>•</span>
            <span className="inline-flex items-center gap-1">
              <Eye size={13} /> {formatAngka(jumlahBaca)} kali dibaca
            </span>
          </p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {novel.genre.map((g) => (
              <span
                key={g}
                className="font-ui text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: "#2A2E3A", color: "#C9C2AF" }}
              >
                {g}
              </span>
            ))}
            <span
              className="font-ui text-[11px] px-2.5 py-1 rounded-full"
              style={{ color: novel.status === "Tamat" ? "#3E7C7B" : "#E3A542", border: "1px solid currentColor" }}
            >
              {novel.status}
            </span>
          </div>
          <div className="mt-4">
            <TerjemahTeks
              teks={novel.sinopsis}
              gayaTeks={{ className: "font-body text-sm leading-relaxed", style: { color: "#C9C2AF" } }}
            />
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => onReadChapter(novel.id, babTerakhirDibaca ?? 0)}
              className="font-ui inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium"
              style={{ background: "#E3A542", color: "#171923" }}
            >
              <BookOpen size={16} />
              {babTerakhirDibaca !== null ? "Sambung Membaca" : "Mula Membaca"}
            </button>
            <button
              onClick={toggleSuka}
              className="font-ui inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium"
              style={{
                background: sudahSuka ? "rgba(227,165,66,0.12)" : "#1D2029",
                border: "1px solid " + (sudahSuka ? "#E3A542" : "#2A2E3A"),
                color: sudahSuka ? "#E3A542" : "#C9C2AF",
              }}
              aria-pressed={sudahSuka}
            >
              <ThumbsUp size={15} fill={sudahSuka ? "#E3A542" : "none"} />
              {memuatSosial ? "…" : jumlahSuka}
            </button>
            <button
              onClick={() => onToggleFav(novel.id)}
              className="p-2.5 rounded-sm"
              style={{ background: "#1D2029", border: "1px solid #2A2E3A" }}
              aria-label="Tambah ke kegemaran"
            >
              <Heart size={16} color="#E3A542" fill={isFav ? "#E3A542" : "none"} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 mb-3">
        <h2 className="font-display text-lg" style={{ color: "#F6EFE0" }}>
          Senarai Bab
        </h2>
        {adalahPemilik && (
          <button
            onClick={onTambahBab}
            className="font-ui text-xs flex items-center gap-1.5"
            style={{ color: "#E3A542" }}
          >
            <PlusCircle size={14} /> Tambah bab
          </button>
        )}
      </div>

      <div className="divide-y" style={{ borderColor: "#2A2E3A" }}>
        {novel.bab.map((b, i) => (
          <button
            key={i}
            onClick={() => onReadChapter(novel.id, i)}
            className="w-full text-left py-3.5 flex items-center justify-between group"
            style={{ borderBottom: "1px solid #2A2E3A" }}
          >
            <span
              className="font-ui text-sm"
              style={{ color: babTerakhirDibaca === i ? "#E3A542" : "#C9C2AF" }}
            >
              {b.tajuk}
            </span>
            <ChevronRight size={15} color="#8B8578" />
          </button>
        ))}
      </div>

      <SeksyenKomen novelId={novel.id} />
    </div>
  );
}

/* ============ SEKSYEN KOMEN ============ */
function SeksyenKomen({ novelId }) {
  const [komen, setKomen] = useState([]);
  const [nama, setNama] = useState("");
  const [teks, setTeks] = useState("");
  const [memuat, setMemuat] = useState(true);
  const [menghantar, setMenghantar] = useState(false);

  useEffect(() => {
    let batal = false;
    setMemuat(true);
    (async () => {
      const senarai = await getStorage(`komen:${novelId}`, [], true);
      const namaTersimpan = await getStorage("nama-pengguna", "", false);
      if (!batal) {
        setKomen(senarai);
        setNama(namaTersimpan);
        setMemuat(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, [novelId]);

  const hantarKomen = async () => {
    if (!teks.trim()) return;
    setMenghantar(true);
    const namaAkhir = nama.trim() || "Pembaca Tanpa Nama";
    const komenBaharu = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      nama: namaAkhir,
      teks: teks.trim(),
      masa: Date.now(),
    };
    const senaraiBaharu = [komenBaharu, ...komen];
    setKomen(senaraiBaharu);
    setTeks("");
    await setStorage("nama-pengguna", namaAkhir, false);
    await setStorage(`komen:${novelId}`, senaraiBaharu, true);
    setMenghantar(false);
  };

  return (
    <div className="mt-10 pt-6" style={{ borderTop: "1px solid #2A2E3A" }}>
      <h2 className="font-display text-lg mb-4 flex items-center gap-2" style={{ color: "#F6EFE0" }}>
        <MessageCircle size={17} color="#E3A542" />
        Komen {!memuat && `(${komen.length})`}
      </h2>

      <div className="rounded-sm p-4 mb-5" style={{ background: "#1D2029", border: "1px solid #2A2E3A" }}>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama anda (pilihan)"
          className="font-ui w-full px-3 py-2 rounded-sm text-sm outline-none mb-2"
          style={{ background: "#171923", color: "#F6EFE0", border: "1px solid #2A2E3A" }}
        />
        <textarea
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          placeholder="Kongsi pendapat anda tentang novel ini…"
          rows={3}
          className="font-body w-full px-3 py-2 rounded-sm text-sm outline-none resize-y mb-2"
          style={{ background: "#171923", color: "#E6E1D3", border: "1px solid #2A2E3A" }}
        />
        <div className="flex justify-end">
          <button
            onClick={hantarKomen}
            disabled={!teks.trim() || menghantar}
            className="font-ui inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-medium disabled:opacity-40"
            style={{ background: "#E3A542", color: "#171923" }}
          >
            <Send size={13} /> {menghantar ? "Menghantar…" : "Hantar"}
          </button>
        </div>
      </div>

      {memuat ? (
        <p className="font-ui text-sm" style={{ color: "#8B8578" }}>Memuatkan komen…</p>
      ) : komen.length === 0 ? (
        <p className="font-ui text-sm" style={{ color: "#8B8578" }}>
          Belum ada komen. Jadilah yang pertama berkongsi pendapat!
        </p>
      ) : (
        <div className="space-y-4">
          {komen.map((k) => (
            <div key={k.id} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-ui text-xs font-semibold"
                style={{ background: "#2A2E3A", color: "#E3A542" }}
              >
                {k.nama.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-ui text-sm font-medium" style={{ color: "#F6EFE0" }}>
                    {k.nama}
                  </span>
                  <span className="font-ui text-[11px]" style={{ color: "#8B8578" }}>
                    {masaLalu(k.masa)}
                  </span>
                </div>
                <p className="font-body text-sm mt-0.5" style={{ color: "#C9C2AF", lineHeight: 1.6 }}>
                  {k.teks}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ HALAMAN SEJARAH BACAAN (macam "History" YouTube) ============ */
function SejarahBacaan({ novels, onBack, onBaca, tema }) {
  const [senarai, setSenarai] = useState([]);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    let batal = false;
    (async () => {
      const s = await getStorage("sejarah-bacaan", [], false);
      if (!batal) {
        setSenarai(s);
        setMemuat(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  const kosongkanSemua = async () => {
    setSenarai([]);
    await setStorage("sejarah-bacaan", [], false);
  };

  const padamSatu = async (id) => {
    setSenarai((prev) => {
      const next = prev.filter((e) => e.id !== id);
      setStorage("sejarah-bacaan", next, false);
      return next;
    });
  };

  return (
    <div className="px-6 md:px-14 py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="font-ui text-xs flex items-center gap-1.5" style={{ color: tema.teksMuted }}>
          <ArrowLeft size={14} /> Kembali
        </button>
        {senarai.length > 0 && (
          <button onClick={kosongkanSemua} className="font-ui text-xs flex items-center gap-1.5" style={{ color: tema.teksMuted }}>
            <Trash2 size={13} /> Kosongkan sejarah
          </button>
        )}
      </div>

      <h1 className="font-display text-2xl mb-6 flex items-center gap-2" style={{ color: tema.teksUtama }}>
        🕘 Sejarah Bacaan
      </h1>

      {memuat ? (
        <p className="font-ui text-sm" style={{ color: tema.teksMuted }}>Memuatkan…</p>
      ) : senarai.length === 0 ? (
        <p className="font-ui text-sm" style={{ color: tema.teksMuted }}>
          Belum ada sejarah bacaan. Bab yang anda baca akan disenaraikan di sini secara automatik — macam "History" di YouTube.
        </p>
      ) : (
        <div className="space-y-2">
          {senarai.map((e) => {
            const n = novels.find((nv) => nv.id === e.novelId);
            if (!n) return null;
            const bab = n.bab[e.chapterIndex];
            return (
              <div
                key={e.id}
                className="w-full flex items-center gap-3 p-3 rounded-sm text-left cursor-pointer"
                style={{ background: tema.permukaan, border: `1px solid ${tema.garis}` }}
                onClick={() => onBaca(n.id, e.chapterIndex)}
              >
                <div
                  className="w-12 h-16 rounded-sm shrink-0"
                  style={
                    n.gambarUrl
                      ? { backgroundImage: `url(${n.gambarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : { background: `linear-gradient(160deg, ${n.warna} 0%, ${n.warna2} 100%)` }
                  }
                />
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-sm truncate" style={{ color: tema.teksUtama }}>{n.judul}</p>
                  <p className="font-ui text-xs truncate mt-0.5" style={{ color: tema.teksKedua }}>
                    {bab ? bab.tajuk : `Bab ${e.chapterIndex + 1}`}
                  </p>
                  <p className="font-ui text-[11px] mt-1" style={{ color: tema.teksMuted }}>{masaLalu(e.masa)}</p>
                </div>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    padamSatu(e.id);
                  }}
                  aria-label="Padam dari sejarah"
                  className="p-1.5 shrink-0"
                >
                  <X size={14} color={tema.teksMuted} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Reader({ novel, chapterIndex, onBack, onNavigate, onProgress, mode, setMode, fontSize, setFontSize }) {
  const paneRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const bab = novel.bab[chapterIndex];
  const dark = mode === "malam";

  const [tunjukPilihBahasa, setTunjukPilihBahasa] = useState(false);
  const [sedangTerjemah, setSedangTerjemah] = useState(false);
  const [terjemahAktif, setTerjemahAktif] = useState(false);
  const [teksTerjemah, setTeksTerjemah] = useState(null);
  const [bahasaSasaran, setBahasaSasaran] = useState("");
  const [ralatTerjemah, setRalatTerjemah] = useState("");

  const handleScroll = useCallback(() => {
    const el = paneRef.current;
    if (!el) return;
    const total = el.scrollHeight - el.clientHeight;
    const p = total <= 0 ? 1 : Math.min(1, el.scrollTop / total);
    setScrollProgress(p);
  }, []);

  useEffect(() => {
    setScrollProgress(0);
    if (paneRef.current) paneRef.current.scrollTop = 0;
    onProgress(novel.id, chapterIndex);
    tambahBacaan(novel.id);
    tambahSejarah(novel.id, chapterIndex);
    // reset terjemahan bila tukar bab
    setTerjemahAktif(false);
    setTeksTerjemah(null);
    setRalatTerjemah("");
  }, [chapterIndex, novel.id, onProgress]);

  const terjemahBab = async (bahasa) => {
    setTunjukPilihBahasa(false);
    setSedangTerjemah(true);
    setRalatTerjemah("");
    try {
      const teksAsal = bab.isi.join("\n\n");
      const teksGabung = await terjemahTeksAI(teksAsal, bahasa);
      const perenggan = teksGabung
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
      setTeksTerjemah(perenggan);
      setBahasaSasaran(bahasa);
      setTerjemahAktif(true);
    } catch {
      setRalatTerjemah("Terjemahan gagal. Sila cuba lagi sebentar.");
    } finally {
      setSedangTerjemah(false);
    }
  };

  const kertas = dark ? "#20222B" : "#F6EFE0";
  const tinta = dark ? "#E6E1D3" : "#2B2620";
  const latar = dark ? "#14161F" : "#EDE7D5";

  return (
    <div style={{ background: latar, minHeight: "100vh" }}>
      <ReadingRibbon progress={scrollProgress} dark={dark} />

      {/* bar atas */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-10 py-3"
        style={{ background: latar, borderBottom: `1px solid ${dark ? "#2A2E3A" : "#DDD3B8"}` }}
      >
        <button onClick={onBack} className="font-ui text-xs flex items-center gap-1.5" style={{ color: "#8B8578" }}>
          <ArrowLeft size={14} /> {novel.judul}
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFontSize((s) => Math.max(14, s - 1))}
            aria-label="Kecilkan fon"
            className="p-1.5 rounded-full"
            style={{ background: dark ? "#2A2E3A" : "#E3D9BC" }}
          >
            <Minus size={13} color={tinta} />
          </button>
          <button
            onClick={() => setFontSize((s) => Math.min(24, s + 1))}
            aria-label="Besarkan fon"
            className="p-1.5 rounded-full"
            style={{ background: dark ? "#2A2E3A" : "#E3D9BC" }}
          >
            <Plus size={13} color={tinta} />
          </button>
          <button
            onClick={() => setMode(dark ? "siang" : "malam")}
            aria-label="Tukar mod bacaan"
            className="p-1.5 rounded-full"
            style={{ background: dark ? "#2A2E3A" : "#E3D9BC" }}
          >
            {dark ? <Sun size={13} color={tinta} /> : <Moon size={13} color={tinta} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setTunjukPilihBahasa((v) => !v)}
              aria-label="Terjemah bab ini"
              className="p-1.5 rounded-full flex items-center gap-1"
              style={{
                background: terjemahAktif ? "#E3A542" : dark ? "#2A2E3A" : "#E3D9BC",
              }}
            >
              {sedangTerjemah ? (
                <Loader2 size={13} color={terjemahAktif ? "#171923" : tinta} className="animate-spin" />
              ) : (
                <Languages size={13} color={terjemahAktif ? "#171923" : tinta} />
              )}
            </button>

            {tunjukPilihBahasa && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setTunjukPilihBahasa(false)} />
                <div
                  className="absolute right-0 top-10 z-20 w-52 rounded-sm overflow-hidden py-1"
                  style={{ background: "#1A1712", border: "1px solid #33301F", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
                >
                  <p className="font-ui text-[10px] uppercase tracking-wide px-3 py-1.5" style={{ color: "#6E6A5C" }}>
                    Terjemah bab ini ke
                  </p>
                  {BAHASA_TERSEDIA.map((b) => (
                    <button
                      key={b}
                      onClick={() => terjemahBab(b)}
                      className="font-ui w-full text-left px-3 py-2 text-xs"
                      style={{ color: b === bahasaSasaran && terjemahAktif ? "#E3A542" : "#E6E1D3" }}
                    >
                      {b}
                    </button>
                  ))}
                  {terjemahAktif && (
                    <button
                      onClick={() => {
                        setTerjemahAktif(false);
                        setTunjukPilihBahasa(false);
                      }}
                      className="font-ui w-full text-left px-3 py-2 text-xs border-t"
                      style={{ color: "#8B8578", borderColor: "#2E2A20" }}
                    >
                      ↩ Kembali ke teks asal
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* kertas bacaan */}
      <div
        ref={paneRef}
        onScroll={handleScroll}
        className="overflow-y-auto px-6 md:px-0"
        style={{ height: "calc(100vh - 53px)" }}
      >
        <div
          className="max-w-2xl mx-auto my-8 rounded-sm p-6 md:p-12"
          style={{ background: kertas, boxShadow: "0 1px 24px rgba(0,0,0,0.25)" }}
        >
          <p className="font-ui text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: dark ? "#8B8578" : "#A8926B" }}>
            {novel.judul} · Bab {chapterIndex + 1} daripada {novel.bab.length}
          </p>
          <h1 className="font-display text-2xl md:text-3xl mb-4" style={{ color: tinta }}>
            {bab.tajuk}
          </h1>

          {terjemahAktif && (
            <div
              className="flex items-center gap-2 font-ui text-xs px-3 py-2 rounded-sm mb-5"
              style={{ background: dark ? "#2A2E1C" : "#F0E6C8", color: dark ? "#E3A542" : "#8A6A2E" }}
            >
              <Languages size={13} />
              Diterjemah ke {bahasaSasaran} oleh AI · boleh ada ketidaktepatan
              <button
                onClick={() => setTerjemahAktif(false)}
                className="ml-auto underline"
              >
                Lihat teks asal
              </button>
            </div>
          )}

          {ralatTerjemah && (
            <p className="font-ui text-xs mb-4" style={{ color: "#E37A5A" }}>{ralatTerjemah}</p>
          )}

          {sedangTerjemah ? (
            <div className="flex items-center gap-2 font-ui text-sm py-6" style={{ color: dark ? "#8B8578" : "#A8926B" }}>
              <Loader2 size={16} className="animate-spin" /> Sedang menterjemah bab ini…
            </div>
          ) : (
            (terjemahAktif && teksTerjemah ? teksTerjemah : bab.isi).map((p, i) => (
              <p
                key={i}
                className="font-body mb-5"
                style={{ color: tinta, lineHeight: 1.85, fontSize: `${fontSize}px` }}
              >
                {p}
              </p>
            ))
          )}

          <div
            className="flex items-center justify-between mt-10 pt-6"
            style={{ borderTop: `1px solid ${dark ? "#33384A" : "#DDD3B8"}` }}
          >
            <button
              disabled={chapterIndex === 0}
              onClick={() => onNavigate(chapterIndex - 1)}
              className="font-ui text-xs flex items-center gap-1.5 disabled:opacity-30"
              style={{ color: tinta }}
            >
              <ChevronLeft size={14} /> Bab Lepas
            </button>
            <button
              disabled={chapterIndex === novel.bab.length - 1}
              onClick={() => onNavigate(chapterIndex + 1)}
              className="font-ui text-xs flex items-center gap-1.5 disabled:opacity-30"
              style={{ color: tinta }}
            >
              Bab Seterusnya <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ MEDAN BAB (dipakai semula dalam borang muat naik & tambah bab) ============ */
function MedanBab({ bab, index, onChange, onRemove, boleBuang }) {
  const fileRef = useRef(null);

  const handleFail = (e) => {
    const fail = e.target.files?.[0];
    if (!fail) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(index, "isi", String(ev.target.result || ""));
    reader.readAsText(fail, "UTF-8");
    e.target.value = "";
  };

  return (
    <div className="rounded-sm p-4 mb-3" style={{ background: "#171923", border: "1px solid #2A2E3A" }}>
      <div className="flex items-center justify-between mb-2">
        <p className="font-ui text-xs" style={{ color: "#8B8578" }}>Bab {index + 1}</p>
        {boleBuang && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="font-ui text-xs flex items-center gap-1"
            style={{ color: "#B8564A" }}
          >
            <Trash2 size={12} /> Buang
          </button>
        )}
      </div>
      <input
        value={bab.tajuk}
        onChange={(e) => onChange(index, "tajuk", e.target.value)}
        placeholder="Tajuk bab, cth: Bab 1: Permulaan"
        className="font-ui w-full px-3 py-2 rounded-sm text-sm outline-none mb-2"
        style={{ background: "#1D2029", color: "#F6EFE0", border: "1px solid #2A2E3A" }}
      />
      <textarea
        value={bab.isi}
        onChange={(e) => onChange(index, "isi", e.target.value)}
        placeholder="Tulis atau tampal kandungan bab di sini. Asingkan setiap perenggan dengan satu baris kosong."
        rows={6}
        className="font-body w-full px-3 py-2 rounded-sm text-sm outline-none resize-y"
        style={{ background: "#1D2029", color: "#E6E1D3", border: "1px solid #2A2E3A", lineHeight: 1.7 }}
      />
      <input ref={fileRef} type="file" accept=".txt" onChange={handleFail} className="hidden" />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="font-ui text-xs mt-2 flex items-center gap-1.5"
        style={{ color: "#E3A542" }}
      >
        <FileUp size={13} /> Muat naik fail .txt untuk isi bab ini
      </button>
    </div>
  );
}

/* ============ BORANG NOVEL (cipta baharu ATAU edit sedia ada) ============ */
function NovelFormModal({ onClose, onSimpan, novelSedia }) {
  const editMod = Boolean(novelSedia);
  const [judul, setJudul] = useState(novelSedia?.judul ?? "");
  const [penulis, setPenulis] = useState(novelSedia?.penulis ?? "");
  const [status, setStatus] = useState(novelSedia?.status ?? "Berjalan");
  const [tarikhKeluar, setTarikhKeluar] = useState(
    novelSedia?.tarikhKeluar ?? new Date().toISOString().slice(0, 10)
  );
  const [genreDipilih, setGenreDipilih] = useState(novelSedia?.genre ?? []);
  const [sinopsis, setSinopsis] = useState(novelSedia?.sinopsis ?? "");
  const [gambarUrl, setGambarUrl] = useState(novelSedia?.gambarUrl ?? null);
  const [memuatGambar, setMemuatGambar] = useState(false);
  const [bab, setBab] = useState(
    novelSedia?.bab?.length
      ? novelSedia.bab.map((b) => ({ tajuk: b.tajuk, isi: b.isi.join("\n\n") }))
      : [{ tajuk: "Bab 1", isi: "" }]
  );
  const [ralat, setRalat] = useState("");
  const gambarRef = useRef(null);

  const toggleGenre = (g) => {
    setGenreDipilih((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  };

  const ubahBab = (i, medan, nilai) => {
    setBab((prev) => prev.map((b, idx) => (idx === i ? { ...b, [medan]: nilai } : b)));
  };
  const tambahBab = () => setBab((prev) => [...prev, { tajuk: `Bab ${prev.length + 1}`, isi: "" }]);
  const buangBab = (i) => setBab((prev) => prev.filter((_, idx) => idx !== i));

  const pilihGambar = async (e) => {
    const fail = e.target.files?.[0];
    if (!fail) return;
    setMemuatGambar(true);
    try {
      const dataUrl = await mampatkanGambar(fail);
      setGambarUrl(dataUrl);
    } catch {
      setRalat("Gagal memuatkan gambar itu. Cuba fail lain.");
    } finally {
      setMemuatGambar(false);
      e.target.value = "";
    }
  };

  const hantar = () => {
    if (!judul.trim() || !penulis.trim()) {
      setRalat("Sila isikan tajuk dan nama penulis.");
      return;
    }
    const babSah = bab
      .map((b) => ({ tajuk: b.tajuk.trim() || "Tanpa Tajuk", isi: teksKePerenggan(b.isi) }))
      .filter((b) => b.isi.length > 0);
    if (babSah.length === 0) {
      setRalat("Sila lengkapkan sekurang-kurangnya satu bab dengan kandungan.");
      return;
    }
    const kulit =
      novelSedia?.warna && novelSedia?.warna2
        ? { warna: novelSedia.warna, warna2: novelSedia.warna2 }
        : PALET_KULIT[Math.floor(Math.random() * PALET_KULIT.length)];
    const novelDikemasKini = {
      id: novelSedia?.id ?? janaIdNovel(),
      judul: judul.trim(),
      penulis: penulis.trim(),
      genre: genreDipilih.length ? genreDipilih : ["Umum"],
      status,
      tarikhKeluar: tarikhKeluar || null,
      warna: kulit.warna,
      warna2: kulit.warna2,
      gambarUrl: gambarUrl || null,
      sinopsis: sinopsis.trim() || "Tiada sinopsis diberikan.",
      bab: babSah,
      milikSendiri: true,
    };
    onSimpan(novelDikemasKini);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-start md:items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(10,11,16,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-sm p-6 my-8"
        style={{ background: "#1D2029", border: "1px solid #2A2E3A" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl flex items-center gap-2" style={{ color: "#F6EFE0" }}>
            {editMod ? <Pencil size={18} color="#E3A542" /> : <Upload size={18} color="#E3A542" />}
            {editMod ? "Edit Novel" : "Muat Naik Novel"}
          </h2>
          <button onClick={onClose} aria-label="Tutup"><X size={18} color="#8B8578" /></button>
        </div>

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Gambar kulit buku (pilihan)</label>
        <div className="flex items-center gap-3 mt-1.5 mb-3">
          <div
            className="w-16 h-20 rounded-sm shrink-0 flex items-center justify-center overflow-hidden"
            style={
              gambarUrl
                ? { backgroundImage: `url(${gambarUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { background: "#171923", border: "1px dashed #33301F" }
            }
          >
            {!gambarUrl && <ImageIcon size={18} color="#4A4536" />}
          </div>
          <div className="flex flex-col gap-1.5">
            <input ref={gambarRef} type="file" accept="image/*" onChange={pilihGambar} className="hidden" />
            <button
              type="button"
              onClick={() => gambarRef.current?.click()}
              disabled={memuatGambar}
              className="font-ui text-xs flex items-center gap-1.5"
              style={{ color: "#E3A542" }}
            >
              <Upload size={13} /> {memuatGambar ? "Memuatkan…" : gambarUrl ? "Tukar gambar" : "Muat naik gambar"}
            </button>
            {gambarUrl && (
              <button
                type="button"
                onClick={() => setGambarUrl(null)}
                className="font-ui text-xs flex items-center gap-1.5"
                style={{ color: "#8B8578" }}
              >
                <X size={12} /> Buang gambar
              </button>
            )}
          </div>
        </div>

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Tajuk novel</label>
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="cth: Bisikan di Perbukitan Hijau"
          className="font-ui w-full px-3 py-2 rounded-sm text-sm outline-none mt-1 mb-3"
          style={{ background: "#171923", color: "#F6EFE0", border: "1px solid #2A2E3A" }}
        />

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Nama penulis</label>
        <input
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          placeholder="Nama anda atau nama pena"
          className="font-ui w-full px-3 py-2 rounded-sm text-sm outline-none mt-1 mb-3"
          style={{ background: "#171923", color: "#F6EFE0", border: "1px solid #2A2E3A" }}
        />

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Genre (boleh pilih lebih daripada satu)</label>
        <div className="flex gap-2 flex-wrap mt-1.5 mb-3">
          {GENRES_BOLEH_PILIH.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggleGenre(g)}
              className="font-ui text-xs px-3 py-1.5 rounded-full"
              style={{
                background: genreDipilih.includes(g) ? "#E3A542" : "#171923",
                color: genreDipilih.includes(g) ? "#171923" : "#C9C2AF",
                border: "1px solid " + (genreDipilih.includes(g) ? "#E3A542" : "#2A2E3A"),
              }}
            >
              {g}
            </button>
          ))}
        </div>

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Status</label>
        <div className="flex gap-2 mt-1.5 mb-3">
          {["Berjalan", "Tamat"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className="font-ui text-xs px-3 py-1.5 rounded-full"
              style={{
                background: status === s ? "#3E7C7B" : "#171923",
                color: status === s ? "#171923" : "#C9C2AF",
                border: "1px solid " + (status === s ? "#3E7C7B" : "#2A2E3A"),
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Tarikh keluar</label>
        <input
          type="date"
          value={tarikhKeluar}
          onChange={(e) => setTarikhKeluar(e.target.value)}
          className="font-ui w-full px-3 py-2 rounded-sm text-sm outline-none mt-1 mb-3"
          style={{ background: "#171923", color: "#F6EFE0", border: "1px solid #2A2E3A", colorScheme: "dark" }}
        />

        <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Sinopsis</label>
        <textarea
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          placeholder="Ringkasan cerita anda dalam 2-3 ayat…"
          rows={3}
          className="font-body w-full px-3 py-2 rounded-sm text-sm outline-none mt-1 mb-4 resize-y"
          style={{ background: "#171923", color: "#E6E1D3", border: "1px solid #2A2E3A" }}
        />

        <div className="flex items-center justify-between mb-2">
          <label className="font-ui text-xs" style={{ color: "#8B8578" }}>Kandungan bab</label>
          <button
            type="button"
            onClick={tambahBab}
            className="font-ui text-xs flex items-center gap-1"
            style={{ color: "#E3A542" }}
          >
            <PlusCircle size={13} /> Tambah bab
          </button>
        </div>
        {bab.map((b, i) => (
          <MedanBab key={i} bab={b} index={i} onChange={ubahBab} onRemove={buangBab} boleBuang={bab.length > 1} />
        ))}

        {ralat && (
          <p className="font-ui text-xs mb-3" style={{ color: "#E37A5A" }}>{ralat}</p>
        )}

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={hantar}
            className="font-ui px-5 py-2.5 rounded-sm text-sm font-medium"
            style={{ background: "#E3A542", color: "#171923" }}
          >
            {editMod ? "Simpan Perubahan" : "Terbitkan Novel"}
          </button>
          <button onClick={onClose} className="font-ui text-sm" style={{ color: "#8B8578" }}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ BORANG TAMBAH BAB (untuk novel sedia milik pengguna) ============ */
function TambahBabModal({ onClose, onSimpan }) {
  const [b, setB] = useState({ tajuk: "", isi: "" });
  const [ralat, setRalat] = useState("");

  const hantar = () => {
    const perenggan = teksKePerenggan(b.isi);
    if (!b.tajuk.trim() || perenggan.length === 0) {
      setRalat("Sila lengkapkan tajuk dan kandungan bab.");
      return;
    }
    onSimpan({ tajuk: b.tajuk.trim(), isi: perenggan });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: "rgba(10,11,16,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-sm p-6"
        style={{ background: "#1D2029", border: "1px solid #2A2E3A" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg" style={{ color: "#F6EFE0" }}>Tambah Bab Baharu</h2>
          <button onClick={onClose} aria-label="Tutup"><X size={18} color="#8B8578" /></button>
        </div>
        <MedanBab bab={b} index={0} onChange={(_, medan, nilai) => setB((p) => ({ ...p, [medan]: nilai }))} onRemove={() => {}} boleBuang={false} />
        {ralat && <p className="font-ui text-xs mb-3" style={{ color: "#E37A5A" }}>{ralat}</p>}
        <div className="flex items-center gap-3">
          <button
            onClick={hantar}
            className="font-ui px-5 py-2.5 rounded-sm text-sm font-medium"
            style={{ background: "#E3A542", color: "#171923" }}
          >
            Simpan Bab
          </button>
          <button onClick={onClose} className="font-ui text-sm" style={{ color: "#8B8578" }}>Batal</button>
        </div>
      </div>
    </div>
  );
}

/* ============ MENU SISI ============ */
function SidebarMenu({ terbuka, onClose, laluanAktif, onNavigasi, onMuatNaik, mode, onTukarMod, adalahPemilik, onLogMasukPemilik, onLogKeluarPemilik }) {
  const itemUtama = [
    { key: "home", emoji: "📖", label: "Semua Novel" },
    { key: "trending", emoji: "🔥", label: "Trending" },
    { key: "sejarah", emoji: "🕘", label: "Sejarah Bacaan" },
    { key: "fav", emoji: "❤️", label: "Kegemaran" },
    { key: "milik", emoji: "📚", label: "Novel Anda" },
    { key: "genre", emoji: "🏷️", label: "Genre" },
    { key: "terkini", emoji: "🕓", label: "Terkini Dikemas Kini" },
  ];

  return (
    <>
      {/* lorekap gelap */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-200"
        style={{
          background: "rgba(8,9,13,0.6)",
          opacity: terbuka ? 1 : 0,
          pointerEvents: terbuka ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* panel sisi */}
      <div
        className="fixed top-0 left-0 z-50 h-full w-[280px] flex flex-col transition-transform duration-250"
        style={{
          background: "#1A1712",
          borderRight: "1px solid #2E2A20",
          transform: terbuka ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <span className="font-display text-lg" style={{ color: "#F6EFE0" }}>
            <span style={{ color: "#E3A542" }}>Baca</span>Novel
          </span>
          <button onClick={onClose} aria-label="Tutup menu">
            <X size={18} color="#8B8578" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pt-2">
          {itemUtama.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigasi(item.key)}
              className="w-full flex items-center gap-3.5 px-3 py-3 rounded-lg font-ui text-[15px] mb-0.5"
              style={{
                background: laluanAktif === item.key ? "#2A251C" : "transparent",
                color: laluanAktif === item.key ? "#F6EFE0" : "#C9C2AF",
              }}
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              {item.label}
            </button>
          ))}

          <div className="my-3" style={{ borderTop: "1px solid #2E2A20" }} />

          <button
            onClick={() => onNavigasi("home")}
            className="w-full flex items-center gap-3.5 px-3 py-3 rounded-lg font-ui text-[15px]"
            style={{ color: "#8B8578" }}
          >
            <Search size={18} />
            Cari novel…
          </button>
        </div>

        <div className="px-3 pb-5">
          {adalahPemilik ? (
            <button
              onClick={onMuatNaik}
              className="font-ui w-full py-3 rounded-sm text-sm font-semibold mb-2.5"
              style={{ background: "#E3A542", color: "#171923" }}
            >
              Muat Naik Novel
            </button>
          ) : (
            <button
              onClick={onLogMasukPemilik}
              className="font-ui w-full py-3 rounded-sm text-sm font-semibold mb-2.5 flex items-center justify-center gap-2"
              style={{ background: "#2A251C", color: "#E3A542", border: "1px solid #E3A542" }}
            >
              🔒 Log Masuk Pemilik
            </button>
          )}
          <button
            onClick={onTukarMod}
            className="font-ui w-full py-3 rounded-sm text-sm font-medium mb-4 flex items-center justify-center gap-2"
            style={{ background: "#2A251C", color: "#E6E1D3" }}
          >
            {mode === "malam" ? <Sun size={15} /> : <Moon size={15} />}
            {mode === "malam" ? "Mod Bacaan Siang" : "Mod Bacaan Malam"}
          </button>

          <div style={{ borderTop: "1px solid #2E2A20" }} className="pt-3">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 font-ui text-sm" style={{ color: "#8B8578" }}>
              <span className="text-lg leading-none">❓</span> Bantuan &amp; Sokongan
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 font-ui text-sm" style={{ color: "#8B8578" }}>
              <span className="text-lg leading-none">ℹ️</span> Tentang BacaNovel
            </button>
            {adalahPemilik && (
              <button
                onClick={onLogKeluarPemilik}
                className="w-full flex items-center gap-3 px-3 py-2.5 font-ui text-sm"
                style={{ color: "#8B8578" }}
              >
                <span className="text-lg leading-none">🔓</span> Log Keluar Pemilik
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ APLIKASI UTAMA ============ */
/* ============ SKRIN PERMULAAN (splash screen dengan logo) ============ */
function SkrinPermulaan() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(150deg, #171923 0%, #14161F 60%, #0F1016 100%)" }}
    >
      <FontStyles />
      <div className="denyut-logo flex flex-col items-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(160deg, #E3A542 0%, #B8862E 100%)",
            boxShadow: "0 12px 32px rgba(227,165,66,0.25)",
          }}
        >
          <BookOpen size={36} color="#171923" strokeWidth={2.2} />
        </div>
        <h1 className="font-display text-3xl tracking-wide" style={{ color: "#F6EFE0" }}>
          <span style={{ color: "#E3A542" }}>Baca</span>Novel
        </h1>
        <p className="font-ui text-xs tracking-[0.2em] uppercase mt-2" style={{ color: "#6E6A5C" }}>
          Genggam Cerita, Di Hujung Jari
        </p>
      </div>
      <div className="flex items-center gap-1.5 mt-9">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="titik-muat w-2 h-2 rounded-full"
            style={{ background: "#E3A542", animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============ NOTIS DI LUAR (banner pengumuman di paling atas app) ============ */
/* Tukar teks/id di sini bila-bila masa nak umum sesuatu yang baharu kepada pembaca */
const NOTIS_LUAR = {
  id: "notis-2026-09-kemas-kini",
  teks: "📢 Kemas kini terbaharu: cuba ciri Terjemah AI dan Trending pada novel kegemaran anda!",
};

function NotisLuar() {
  const [senaraiTutup, setSenaraiTutup] = useState(null);

  useEffect(() => {
    let batal = false;
    (async () => {
      const s = await getStorage("notis-ditutup", [], false);
      if (!batal) setSenaraiTutup(s);
    })();
    return () => {
      batal = true;
    };
  }, []);

  const tutupNotis = async () => {
    const next = [...(senaraiTutup || []), NOTIS_LUAR.id];
    setSenaraiTutup(next);
    await setStorage("notis-ditutup", next, false);
  };

  if (!senaraiTutup || senaraiTutup.includes(NOTIS_LUAR.id)) return null;

  return (
    <div
      className="sticky top-0 z-[70] flex items-center gap-3 px-4 py-2.5"
      style={{ background: "#E3A542", color: "#171923" }}
    >
      <p className="font-ui text-xs flex-1 leading-snug">{NOTIS_LUAR.teks}</p>
      <button onClick={tutupNotis} aria-label="Tutup notis" className="shrink-0 p-1">
        <X size={15} color="#171923" />
      </button>
    </div>
  );
}

export default function BacaNovelApp() {
  const [view, setView] = useState({ page: "home" });
  const [favs, setFavs] = useState([]);
  const [progress, setProgress] = useState({});
  const [userNovels, setUserNovels] = useState([]);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("malam");
  const [fontSize, setFontSize] = useState(17);
  const [loaded, setLoaded] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [novelDiedit, setNovelDiedit] = useState(null);
  const [showTambahBab, setShowTambahBab] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [tapisan, setTapisan] = useState(null);
  const [novelTersembunyi, setNovelTersembunyi] = useState([]);
  const [toast, setToast] = useState(null);
  const [adalahPemilik, setAdalahPemilik] = useState(false);
  const [showLoginPemilik, setShowLoginPemilik] = useState(false);

  const tunjukToast = (mesej) => {
    setToast(mesej);
    window.clearTimeout(tunjukToast._t);
    tunjukToast._t = window.setTimeout(() => setToast(null), 2600);
  };

  useEffect(() => {
    (async () => {
      const f = await getStorage("kegemaran", []);
      const p = await getStorage("kemajuan", {});
      const u = await getStorage("novel-pengguna", []);
      const h = await getStorage("novel-tersembunyi", []);
      const pemilik = await getStorage("adalah-pemilik", false);
      setFavs(f);
      setProgress(p);
      setUserNovels(u);
      setNovelTersembunyi(h);
      setAdalahPemilik(pemilik);
      setLoaded(true);
    })();
  }, []);

  const toggleFav = async (id) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      setStorage("kegemaran", next);
      return next;
    });
  };

  const saveProgress = useCallback((novelId, chapterIndex) => {
    setProgress((prev) => {
      const next = { ...prev, [novelId]: chapterIndex };
      setStorage("kemajuan", next);
      return next;
    });
  }, []);

  // Gabungkan novel contoh dengan sebarang suntingan pengguna (ganti, bukan gandakan),
  // buang yang telah dipadam, dan tambah novel baharu yang dimuat naik pengguna.
  const overridePeta = new Map(userNovels.map((n) => [n.id, n]));
  const novelAsalDipapar = NOVELS.filter((n) => !novelTersembunyi.includes(n.id)).map(
    (n) => overridePeta.get(n.id) ?? n
  );
  const novelBaharuPengguna = userNovels.filter((n) => !NOVELS.some((b) => b.id === n.id));
  const semuaNovel = [...novelAsalDipapar, ...novelBaharuPengguna];
  const novelSemasa = view.id ? semuaNovel.find((n) => n.id === view.id) : null;
  const tema = temaWarna(mode);

  const simpanNovelBaharu = (novelDikemasKini) => {
    setUserNovels((prev) => {
      const wujud = prev.some((n) => n.id === novelDikemasKini.id);
      const next = wujud
        ? prev.map((n) => (n.id === novelDikemasKini.id ? novelDikemasKini : n))
        : [...prev, novelDikemasKini];
      setStorage("novel-pengguna", next);
      return next;
    });
    setShowUpload(false);
    setNovelDiedit(null);
    setView({ page: "novel", id: novelDikemasKini.id });
  };

  const simpanBabBaharu = (babBaharu) => {
    setUserNovels((prev) => {
      const wujud = prev.some((n) => n.id === view.id);
      const next = wujud
        ? prev.map((n) => (n.id === view.id ? { ...n, bab: [...n.bab, babBaharu] } : n))
        : [...prev, { ...novelSemasa, bab: [...novelSemasa.bab, babBaharu], milikSendiri: true }];
      setStorage("novel-pengguna", next);
      return next;
    });
    setShowTambahBab(false);
  };

  const padamNovel = (id) => {
    setUserNovels((prev) => {
      const next = prev.filter((n) => n.id !== id);
      setStorage("novel-pengguna", next);
      return next;
    });
    const adalahNovelAsal = NOVELS.some((n) => n.id === id);
    if (adalahNovelAsal) {
      setNovelTersembunyi((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        setStorage("novel-tersembunyi", next);
        return next;
      });
    }
    setView({ page: "home" });
  };

  const navigasiSidebar = (key) => {
    setShowSidebar(false);
    if (key === "sejarah") {
      setView({ page: "sejarah" });
      return;
    }
    setView({ page: "home" });
    if (key === "fav") setTapisan("fav");
    else if (key === "milik") setTapisan("milik");
    else if (key === "terkini") setTapisan("terkini");
    else if (key === "trending") setTapisan("trending");
    else setTapisan(null);
  };

  const logMasukPemilikBerjaya = () => {
    setAdalahPemilik(true);
    setStorage("adalah-pemilik", true, false);
    setShowLoginPemilik(false);
    tunjukToast("🔓 Log masuk pemilik berjaya — anda kini boleh muat naik, edit & padam novel");
  };

  const logKeluarPemilik = () => {
    setAdalahPemilik(false);
    setStorage("adalah-pemilik", false, false);
    setShowSidebar(false);
    tunjukToast("🔒 Anda telah log keluar daripada mod pemilik");
  };

  return (
    <div className="font-ui min-h-screen" style={{ background: tema.bg, transition: "background 150ms ease" }}>
      <FontStyles />
      {loaded && <NotisLuar />}

      {view.page !== "reader" && loaded && (
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-14 py-4"
          style={{ background: tema.bg, borderBottom: `1px solid ${tema.garis}` }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSidebar(true)} aria-label="Buka menu" className="p-1 -ml-1">
              <MenuIcon size={20} color={tema.teksKedua} />
            </button>
            <button
              onClick={() => {
                setView({ page: "home" });
                setTapisan(null);
              }}
              className="font-display text-lg tracking-wide flex items-center gap-2"
              style={{ color: tema.teksUtama }}
            >
              <span style={{ color: "#E3A542" }}>Baca</span>Novel
            </button>
          </div>
          {query && view.page === "home" && (
            <button onClick={() => setQuery("")} className="p-1.5" aria-label="Kosongkan carian">
              <X size={16} color={tema.teksKedua} />
            </button>
          )}
        </div>
      )}

      {!loaded ? (
        <SkrinPermulaan />
      ) : view.page === "home" ? (
        <Home
          novels={semuaNovel}
          onOpen={(id) => setView({ page: "novel", id })}
          favs={favs}
          onToggleFav={toggleFav}
          query={query}
          setQuery={setQuery}
          onPadam={padamNovel}
          onEdit={(n) => {
            setNovelDiedit(n);
            setShowUpload(true);
          }}
          tapisan={tapisan}
          onKosongkanTapisan={() => setTapisan(null)}
          tema={tema}
          adalahPemilik={adalahPemilik}
        />
      ) : view.page === "novel" && novelSemasa ? (
        <NovelDetail
          novel={novelSemasa}
          onBack={() => setView({ page: "home" })}
          onReadChapter={(id, idx) => setView({ page: "reader", id, chapterIndex: idx })}
          progress={progress}
          isFav={favs.includes(novelSemasa.id)}
          onToggleFav={toggleFav}
          onTambahBab={() => setShowTambahBab(true)}
          onPadam={padamNovel}
          onEdit={(n) => {
            setNovelDiedit(n);
            setShowUpload(true);
          }}
          tema={tema}
          adalahPemilik={adalahPemilik}
        />
      ) : view.page === "sejarah" ? (
        <SejarahBacaan
          novels={semuaNovel}
          onBack={() => setView({ page: "home" })}
          onBaca={(id, idx) => setView({ page: "reader", id, chapterIndex: idx })}
          tema={tema}
        />
      ) : view.page === "reader" && novelSemasa ? (
        <Reader
          novel={novelSemasa}
          chapterIndex={view.chapterIndex}
          onBack={() => setView({ page: "novel", id: novelSemasa.id })}
          onNavigate={(idx) => setView({ page: "reader", id: novelSemasa.id, chapterIndex: idx })}
          onProgress={saveProgress}
          mode={mode}
          setMode={setMode}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      ) : null}

      {showUpload && (
        <NovelFormModal
          onClose={() => {
            setShowUpload(false);
            setNovelDiedit(null);
          }}
          onSimpan={simpanNovelBaharu}
          novelSedia={novelDiedit}
        />
      )}
      {showTambahBab && (
        <TambahBabModal onClose={() => setShowTambahBab(false)} onSimpan={simpanBabBaharu} />
      )}
      <SidebarMenu
        terbuka={showSidebar}
        onClose={() => setShowSidebar(false)}
        laluanAktif={view.page === "sejarah" ? "sejarah" : tapisan ?? "home"}
        onNavigasi={navigasiSidebar}
        onMuatNaik={() => {
          setShowSidebar(false);
          setNovelDiedit(null);
          setShowUpload(true);
        }}
        mode={mode}
        onTukarMod={() => {
          setMode((m) => {
            const baharu = m === "malam" ? "siang" : "malam";
            tunjukToast(
              baharu === "siang"
                ? "☀️ Mod Bacaan Siang diaktifkan — akan digunakan semasa anda membaca bab"
                : "🌙 Mod Bacaan Malam diaktifkan — akan digunakan semasa anda membaca bab"
            );
            return baharu;
          });
          setShowSidebar(false);
        }}
        adalahPemilik={adalahPemilik}
        onLogMasukPemilik={() => {
          setShowSidebar(false);
          setShowLoginPemilik(true);
        }}
        onLogKeluarPemilik={logKeluarPemilik}
      />

      {showLoginPemilik && (
        <LoginPemilikModal onClose={() => setShowLoginPemilik(false)} onBerjaya={logMasukPemilikBerjaya} />
      )}

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] font-ui text-xs px-4 py-3 rounded-sm max-w-[90vw] text-center"
          style={{ background: "#1A1712", color: "#F6EFE0", border: "1px solid #E3A542", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
