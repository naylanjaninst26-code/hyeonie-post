import { useState } from "react";
import Stepper from "./components/Stepper";
import Kardus from "./components/Kardus";
import FormOrang from "./components/FormOrang";
import FormPaket from "./components/FormPaket";
import PilihKurir from "./components/PilihKurir";
import Ringkasan from "./components/Ringkasan";
import Resi from "./components/Resi";
import Riwayat from "./components/Riwayat";
import useLocalStorage from "./hooks/useLocalStorage";
import { hitungBiaya, validasi, rupiah } from "./utils/format";
import "./App.css";

const awal = {
  pengirim: { nama: "", hp: "", kota: "" },
  penerima: { nama: "", hp: "", kota: "", alamat: "" },
  paket: {
    isi: "", berat: "", p: "30", l: "25", t: "20",
    nilai: "", catatan: "", rapuh: false, asuransi: false,
  },
  kurir: "reguler",
};

export default function App() {
  const [data, setData] = useState(awal);
  const [langkah, setLangkah] = useState(0);
  const [errors, setErrors] = useState({});
  const [setuju, setSetuju] = useState(false);
  const [mengemas, setMengemas] = useState(false);
  const [resi, setResi] = useState(null);
  const [terbuka, setTerbuka] = useState(false);
  const [riwayat, setRiwayat] = useLocalStorage("riwayat-paket", []);

  const biaya = hitungBiaya(data);

  const ubah = (bagian, kunci, nilai) => {
    setData((d) =>
      bagian
        ? { ...d, [bagian]: { ...d[bagian], [kunci]: nilai } }
        : { ...d, [kunci]: nilai }
    );
    setErrors({});
  };

  const kirimForm = (e) => {
    e.preventDefault();
    if (mengemas) return;

    if (langkah < 4) {
      const galat = validasi[langkah](data);
      if (Object.keys(galat).length) return setErrors(galat);
      setErrors({});
      return setLangkah(langkah + 1);
    }

    if (!setuju) {
      return setErrors({ setuju: "Centang pernyataan di atas untuk melanjutkan." });
    }

    setMengemas(true);
    setTimeout(() => {
      const baru = {
        ...data,
        biaya,
        nomor: "PKT" + Date.now().toString().slice(-9),
        tanggal: new Date().toLocaleDateString("id-ID", {
          day: "numeric", month: "long", year: "numeric",
        }),
      };
      setResi(baru);
      setRiwayat([baru, ...riwayat].slice(0, 5));
      setMengemas(false);
    }, 1800);
  };

  const ulang = () => {
    setData(awal);
    setLangkah(0);
    setSetuju(false);
    setErrors({});
    setResi(null);
    setTerbuka(false);
  };

  const ke = (n) => {
    setErrors({});
    setLangkah(n);
  };

  const props = { data, ubah, errors };

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">
          <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
            <polygon points="16,3 29,9 16,15 3,9" fill="#e9c28a" />
            <polygon points="3,9 16,15 16,29 3,23" fill="#d8a567" />
            <polygon points="29,9 16,15 16,29 29,23" fill="#bd8849" />
            <rect x="14" y="3" width="4" height="12" fill="#f6e6c2" opacity="0.9" />
          </svg>
          Hyeonie Post
        </div>
        <span>Layanan kirim paket</span>
      </header>

      <section className="hero">
        <h1>Kirim paket dari rumah, tanpa antre</h1>
        <ul>
          <li>Dijemput kurir di alamatmu</li>
          <li>Ongkir langsung terhitung</li>
          <li>Resi bisa dilacak</li>
        </ul>
      </section>

      <main className="layout">
        <aside className="panel-kardus">
          <button
            type="button"
            className="kardus-tombol"
            onClick={() => setTerbuka(true)}
            aria-label="Buka kardus untuk mulai mengirim paket"
          >
            <Kardus
              paket={data.paket}
              penerima={data.penerima}
              tertutup={!terbuka || mengemas || !!resi}
            />
          </button>

          <div className="biaya-mini">
            <span>{mengemas ? "Mengemas paket..." : "Estimasi biaya"}</span>
            <strong>{rupiah(biaya.total)}</strong>
          </div>
        </aside>

        <section className={terbuka ? "kartu muncul" : "kartu"}>
          {!terbuka ? (
            <div className="ajakan">
              <h2>Ada paket yang mau dikirim?</h2>
              <p>Klik kardus untuk membukanya, lalu isi data pengiriman.</p>
              <button
                type="button"
                className="utama"
                onClick={() => setTerbuka(true)}
              >
                Buka kardus
              </button>
            </div>
          ) : resi ? (
            <Resi resi={resi} onBaru={ulang} />
          ) : (
            <>
              <Stepper langkah={langkah} />

              <form onSubmit={kirimForm} noValidate>
                {langkah === 0 && (
                  <FormOrang
                    {...props}
                    bagian="pengirim"
                    judul="Data pengirim"
                    deskripsi="Kurir akan menjemput paket dari kota ini."
                  />
                )}
                {langkah === 1 && (
                  <FormOrang
                    {...props}
                    bagian="penerima"
                    judul="Data penerima"
                    deskripsi="Tulis alamat selengkap mungkin."
                    denganAlamat
                  />
                )}
                {langkah === 2 && <FormPaket {...props} />}
                {langkah === 3 && <PilihKurir data={data} ubah={ubah} />}
                {langkah === 4 && (
                  <Ringkasan
                    data={data}
                    biaya={biaya}
                    ke={ke}
                    setuju={setuju}
                    setSetuju={(v) => { setSetuju(v); setErrors({}); }}
                    error={errors.setuju}
                  />
                )}

                <div className="aksi">
                  {langkah > 0 && (
                    <button
                      type="button"
                      className="sekunder"
                      onClick={() => ke(langkah - 1)}
                      disabled={mengemas}
                    >
                      Kembali
                    </button>
                  )}
                  <button type="submit" className="utama" disabled={mengemas}>
                    {langkah < 4 ? "Lanjut" : mengemas ? "Mengemas..." : "Kirim paket"}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </main>

      <Riwayat riwayat={riwayat} onHapus={() => setRiwayat([])} />
    </div>
  );
}