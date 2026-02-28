let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

function ambilDataHarian() {
    let dataHarian = {};

    transaksi.forEach(trx => {
        let tanggal = trx.tanggal.split(",")[0]; // ambil tanggal saja

        if (!dataHarian[tanggal]) {
            dataHarian[tanggal] = 0;
        }

        dataHarian[tanggal] += parseInt(trx.total);
    });

    return dataHarian;
}

function buatGrafik() {
    const ctx = document.getElementById("grafikOmzet");

    const dataHarian = ambilDataHarian();

    const labels = Object.keys(dataHarian);
    const data = Object.values(dataHarian);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Omzet per Hari",
                data: data
            }]
        }
    });
}

buatGrafik();