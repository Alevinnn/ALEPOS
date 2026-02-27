let daftarProduk = JSON.parse(localStorage.getItem("produk")) || [];

function tambahProduk() {
    const nama = document.getElementById("namaProduk").value;
    const harga = document.getElementById("hargaProduk").value;

    if (nama === "" || harga === "") {
        alert("Isi semua data!");
        return;
    }

    const produkBaru = {
        nama: nama,
        harga: harga
    };

    daftarProduk.push(produkBaru);
    simpanKeStorage();
    tampilkanProduk();

    document.getElementById("namaProduk").value = "";
    document.getElementById("hargaProduk").value = "";
}

function tampilkanProduk() {
    const tabel = document.getElementById("tabelProduk");
    tabel.innerHTML = "";

    daftarProduk.forEach((produk, index) => {
        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${produk.nama}</td>
                <td>Rp ${produk.harga}</td>
                <td>
                    <button onclick="hapusProduk(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

function hapusProduk(index) {
    daftarProduk.splice(index, 1);
    simpanKeStorage();
    tampilkanProduk();
}

function simpanKeStorage() {
    localStorage.setItem("produk", JSON.stringify(daftarProduk));
}

tampilkanProduk();