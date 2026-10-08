import { useState } from "react";
import { rupiah } from "../utils/format";

const TAHAP = ["Paket dibuat", "Dijemput kurir", "Dalam perjalanan", "Sampai tujuan"];

export default function Resi({ resi, onBaru }) {
  const [tersalin, setTersalin] = useState(false);

  const salin = () => {
    navigator.clipboard?.writeText(resi.nomor);
    setTersalin(true);
    setTimeout(() => setTersalin(false), 1500);
  };

  const garis = [...resi.nomor, ...resi.nomor].map((c, i) => (
    <span key={i} style={{ width: 2 + (c.charCodeAt(0) % 4) }} />
  ));

  return (
    <section className="resi">
      <div className="resi-sukses">
        <span className="centang" aria-hidden="true">✓</span>
        <div>
          <h2>Paket siap dijemput</h2>
          <p className="deskripsi">Kurir akan datang ke alamat pengirim dalam 24 jam.</p>
        </div>
      </div>

      <div className="tiket">
        <div className="tiket-atas">
          <small>Nomor resi</small>
          <strong>{resi.nomor}</strong>
          <div className="garis-kode" aria-hidden="true">{garis}</div>
        </div>
        <div className="tiket-sobek" aria-hidden="true" />
        <div className="tiket-bawah">
          <div>
            <small>Dari</small>
            <b>{resi.pengirim.nama}</b>
            <span>{resi.pengirim.kota}</span>
          </div>
          <div>
            <small>Untuk</small>
            <b>{resi.penerima.nama}</b>
            <span>{resi.penerima.kota}</span>
          </div>
          <div>
            <small>Tanggal</small>
            <b>{resi.tanggal}</b>
            <span>{resi.biaya.berat} kg</span>
          </div>
          <div>
            <small>Total</small>
            <b>{rupiah(resi.biaya.total)}</b>
            <span>{resi.paket.isi}</span>
          </div>
        </div>
      </div>

      <ol className="lacak">
        {TAHAP.map((t, i) => (
          <li key={t} className={i === 0 ? "aktif" : ""}>{t}</li>
        ))}
      </ol>

      <div className="aksi">
        <button type="button" className="sekunder" onClick={salin}>
          {tersalin ? "Resi tersalin" : "Salin nomor resi"}
        </button>
        <button type="button" className="sekunder" onClick={() => window.print()}>
          Cetak
        </button>
        <button type="button" className="utama" onClick={onBaru}>
          Kirim paket lain
        </button>
      </div>
    </section>
  );
}