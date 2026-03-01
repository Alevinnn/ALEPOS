function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID").format(angka);
}
let daftarProduk = JSON.parse(localStorage.getItem("produk")) || [];
let riwayatTransaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

function tampilkanDropdown() {
    const select = document.getElementById("pilihProduk");
    select.innerHTML = "";

    daftarProduk.forEach((produk, index) => {
        select.innerHTML += `
            <option value="${index}">
                ${produk.nama} - Rp ${produk.harga}
            </option>
        `;
    });
}

function hitungTotal() {
    const index = document.getElementById("pilihProduk").value;
    const jumlah = document.getElementById("jumlahTransaksi").value;

    if (jumlah === "") {
        alert("Masukkan jumlah!");
        return;
    }

    const harga = daftarProduk[index].harga;
    const total = harga * jumlah;

    document.getElementById("totalBayar").textContent =
        "Total: Rp " + formatRupiah(total);
}

function simpanTransaksi() {
    const index = document.getElementById("pilihProduk").value;
    const jumlah = document.getElementById("jumlahTransaksi").value;

    if (jumlah === "") {
        alert("Masukkan jumlah!");
        return;
    }

    const produk = daftarProduk[index];
    const total = produk.harga * jumlah;

    const sekarang = new Date();
    const tanggal = sekarang.toLocaleString("id-ID");

    const transaksiBaru = {
        tanggal: tanggal,
        nama: produk.nama,
        jumlah: jumlah,
        total: total
    };

    riwayatTransaksi.push(transaksiBaru);
    localStorage.setItem("transaksi", JSON.stringify(riwayatTransaksi));

    tampilkanRiwayat();

    document.getElementById("jumlahTransaksi").value = "";
    document.getElementById("totalBayar").textContent = "Total: Rp 0";
}

function tampilkanRiwayat(data = riwayatTransaksi) {
    const tabel = document.getElementById("tabelTransaksi");
    tabel.innerHTML = "";

    let omzet = 0;

    data.forEach((trx) => {
        omzet += parseInt(trx.total);

        const indexAsli = riwayatTransaksi.indexOf(trx);

        tabel.innerHTML += `
            <tr>
                <td>${indexAsli + 1}</td>
                <td>${trx.tanggal}</td>
                <td>${trx.nama}</td>
                <td>${trx.jumlah}</td>
                <td>Rp ${formatRupiah(trx.total)}</td>
                <td>
                    <button onclick="hapusTransaksi(${indexAsli})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalOmzet").textContent =
        "Total Omzet: Rp " + formatRupiah(omzet);
}

tampilkanDropdown();
tampilkanRiwayat();

function hapusTransaksi(index) {
    riwayatTransaksi.splice(index, 1);
    localStorage.setItem("transaksi", JSON.stringify(riwayatTransaksi));
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