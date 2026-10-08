import { rupiah } from "../utils/format";

export default function Riwayat({ riwayat, onHapus }) {
  if (!riwayat.length) return null;

  return (
    <section className="riwayat">
      <div className="riwayat-kepala">
        <h3>Kiriman terakhir</h3>
        <button type="button" className="tautan" onClick={onHapus}>
          Hapus riwayat
        </button>
      </div>
      <ul>
        {riwayat.map((r) => (
          <li key={r.nomor}>
            <div>
              <b>{r.nomor}</b>
              <span>
                {r.pengirim.kota} ke {r.penerima.kota} • {r.paket.isi}
              </span>
            </div>
            <strong>{rupiah(r.biaya.total)}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}