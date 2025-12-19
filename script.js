// 1. Logika Menu Hamburger (Bawaan Anda)
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- DATA & LOGIKA BARU ---

const NOMOR_WA = "6285648479260"; // GANTI DENGAN NOMOR ANDA
let gameTerpilih = "";
let paketTerpilih = "";
let metodeBayar = "";

const databaseHarga = {
    'Rucoy Online': [
        { item: '1kk Gold', harga: 'Rp 5.000' },
        { item: '10kk Gold', harga: 'Rp 48.000' }
    ],
    'Heartwood Online': [
        { item: '100 Gold', harga: 'Rp 12.000' },
        { item: '1000 Gold', harga: 'Rp 110.000' }
    ],
    'Curse of Aros': [
        { item: '1m Gold', harga: 'Rp 7.000' },
        { item: '20m Gold', harga: 'Rp 130.000' }
    ]
};

// 2. Fungsi saat Game dipilih (Update dari Fungsi Awal Anda)
function pilihGame(namaGame) {
    gameTerpilih = namaGame;
    document.getElementById('modalTitle').innerText = "Rate Gold " + namaGame;

    // Reset pilihan
    paketTerpilih = "";
    metodeBayar = "";

    const containerHarga = document.getElementById('priceOptions');
    containerHarga.innerHTML = "";

    // Isi daftar harga berdasarkan game
    databaseHarga[namaGame].forEach(data => {
        const div = document.createElement('div');
        div.className = 'price-item';
        div.innerHTML = `<span>${data.item}</span> <span>${data.harga}</span>`;
        div.onclick = function () {
            document.querySelectorAll('.price-item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            paketTerpilih = data.item + " (" + data.harga + ")";
        };
        containerHarga.appendChild(div);
    });

    document.getElementById('orderModal').style.display = "block";
}

// Fungsi Pilih Pembayaran
function setPayment(namaMetode) {
    metodeBayar = namaMetode;
    document.querySelectorAll('.pay-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
}

// 3. Fungsi Kirim ke WA
function kirimPesanWA() {
    // 1. Ambil input dan bersihkan dari spasi berlebih
    const idRaw = document.getElementById('userId').value.trim();

    // 2. KEAMANAN: Sanitasi Input (Mencegah XSS & Script Injection)
    // Menghapus karakter berbahaya seperti < > / \ " ' agar hacker tidak bisa menyisipkan kode script
    const idUser = idRaw.replace(/[^a-zA-Z0-9#@._ ]/g, "");

    // 3. Validasi: Pastikan data tidak kosong
    if (!idUser || !gameTerpilih || !paketTerpilih || !metodeBayar) {
        alert("Mohon lengkapi ID, Pilih Paket, dan Metode Pembayaran dengan benar!");
        return;
    }

    // 4. Gunakan encodeURIComponent untuk keamanan URL WhatsApp
    // Ini memastikan karakter khusus (seperti spasi atau simbol) tidak merusak link
    const teks = encodeURIComponent(
        `Halo Wi-Go.id,\n` +
        `Saya ingin membeli Gold Game.\n\n` +
        `*Game:* ${gameTerpilih}\n` +
        `*ID User:* ${idUser}\n` +
        `*Jumlah Gold:* ${paketTerpilih}\n` +
        `*Pembayaran:* ${metodeBayar}\n\n` +
        `Mohon instruksi pembayarannya kak.`
    );

    window.open(`https://wa.me/${NOMOR_WA}?text=${teks}`, '_blank');
}

// Close Modal Logic
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('orderModal').style.display = "none";
};

window.onclick = (event) => {
    if (event.target == document.getElementById('orderModal')) {
        document.getElementById('orderModal').style.display = "none";
    }
};

// Efek scroll (Bawaan Anda)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
    } else {
        nav.style.boxShadow = "none";
    }
});