import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const tabel = document.getElementById("tabelProduk");

async function simpanProduk() {
    const nama = document.getElementById("namaProduk").value;
    const harga = document.getElementById("hargaProduk").value;

    if (!nama || !harga) return alert("Isi semua field!");

    await addDoc(collection(db, "produk"), {
        nama: nama,
        harga: parseInt(harga)
    });

    document.getElementById("namaProduk").value = "";
    document.getElementById("hargaProduk").value = "";

    tampilkanProduk();
}

async function tampilkanProduk() {
    const querySnapshot = await getDocs(collection(db, "produk"));
    tabel.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        tabel.innerHTML += `
            <tr>
                <td>${data.nama}</td>
                <td>Rp ${data.harga.toLocaleString()}</td>
                <td>
                    <button onclick="hapusProduk('${docSnap.id}')">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });
}

async function hapusProduk(id) {
    await deleteDoc(doc(db, "produk", id));
    tampilkanProduk();
}

window.simpanProduk = simpanProduk;
window.hapusProduk = hapusProduk;

tampilkanProduk();