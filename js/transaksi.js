function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID").format(angka);
}
import { db } from "./firebase.js";
import { collection, getDocs, addDoc, deleteDoc, doc }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let daftarProduk = [];
let riwayatTransaksi = [];

async function tampilkanDropdown() {
    const select = document.getElementById("pilihProduk");
    select.innerHTML = "";

    const snapshot = await getDocs(collection(db, "produk"));
    daftarProduk = [];

    snapshot.forEach((docSnap) => {
        daftarProduk.push({ id: docSnap.id, ...docSnap.data() });
    });

    daftarProduk.forEach((produk, index) => {
        select.innerHTML += `
            <option value="${index}">
                ${produk.nama} - Rp ${formatRupiah(produk.harga)}
            </option>
        `;
    });
}

function hitungTotal() {
    const index = document.getElementById("pilihProduk").value;
    const jumlah = document.getElementById("jumlahTransaksi").value;

    if (!jumlah || daftarProduk.length === 0) {
        document.getElementById("totalBayar").textContent =
            "Total: Rp 0";
        return;
    }

    const produk = daftarProduk[index];
    if (!produk) return;

    const total = produk.harga * jumlah;

    document.getElementById("totalBayar").textContent =
        "Total: Rp " + formatRupiah(total);
}

async function simpanTransaksi() {
    const index = document.getElementById("pilihProduk").value;
    const jumlah = document.getElementById("jumlahTransaksi").value;

    if (!jumlah) return alert("Masukkan jumlah!");

    const produk = daftarProduk[index];
    const total = produk.harga * jumlah;

    const transaksiBaru = {
        tanggal: new Date().toLocaleString("id-ID"),
        nama: produk.nama,
        jumlah: parseInt(jumlah),
        total: total
    };

    await addDoc(collection(db, "transaksi"), transaksiBaru);

    tampilkanRiwayat();
}

async function tampilkanRiwayat() {
    const tabel = document.getElementById("tabelTransaksi");
    tabel.innerHTML = "";

    const snapshot = await getDocs(collection(db, "transaksi"));
    riwayatTransaksi = [];

    snapshot.forEach((docSnap) => {
        riwayatTransaksi.push({ id: docSnap.id, ...docSnap.data() });
    });

    let omzet = 0;

    riwayatTransaksi.forEach((trx, index) => {
        omzet += trx.total;

        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${trx.tanggal}</td>
                <td>${trx.nama}</td>
                <td>${trx.jumlah}</td>
                <td>Rp ${formatRupiah(trx.total)}</td>
                <td>
                    <button onclick="hapusTransaksi('${trx.id}')">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalOmzet").textContent =
        "Total Omzet: Rp " + formatRupiah(omzet);
}

async function hapusTransaksi(id) {
    await deleteDoc(doc(db, "transaksi", id));
    tampilkanRiwayat();
}

function filterTransaksi() {
    const tanggalDipilih = document
        .getElementById("filterTanggal")
        .value;

    if (!tanggalDipilih) {
        alert("Pilih tanggal dulu!");
        return;
    }

    const hasilFilter = riwayatTransaksi.filter(trx =>
        trx.tanggal.includes(tanggalDipilih)
    );

    tampilkanRiwayat(hasilFilter);
}

function resetFilter() {
    document.getElementById("filterTanggal").value = "";
    tampilkanRiwayat();
}

window.hitungTotal = hitungTotal;
window.hapusTransaksi = hapusTransaksi;

tampilkanDropdown();
tampilkanRiwayat();