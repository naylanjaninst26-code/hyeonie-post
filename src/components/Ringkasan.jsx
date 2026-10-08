import { KURIR } from "../data/kurir";
import { rupiah } from "../utils/format";

function Baris({ judul, onUbah, children }) {
  return (
    <div className="ringkas-baris">
      <div>
        <h3>{judul}</h3>
        <div className="ringkas-isi">{children}</div>
      </div>
      <button type="button" className="tautan" onClick={onUbah}>
        Ubah
      </button>
    </div>
  );
}

export default function Ringkasan({ data, biaya, ke, setuju, setSetuju, error }) {
  const k = KURIR.find((x) => x.id === data.kurir);
  const { pengirim, penerima, paket } = data;

  return (
    <section className="seksi">
      <h2>Cek sebelum kirim</h2>
      <p className="deskripsi">Pastikan semua data sudah benar.</p>

      <Baris judul="Pengirim" onUbah={() => ke(0)}>
        {pengirim.nama} • {pengirim.hp}
        <br />
        {pengirim.kota}
      </Baris>

      <Baris judul="Penerima" onUbah={() => ke(1)}>
        {penerima.nama} • {penerima.hp}
        <br />
        {penerima.alamat}, {penerima.kota}
      </Baris>

      <Baris judul="Paket" onUbah={() => ke(2)}>
        {paket.isi}, {biaya.berat} kg, {paket.p}×{paket.l}×{paket.t} cm
        {paket.rapuh && " • rapuh"}
        {paket.catatan && (
          <>
            <br />
            Catatan: {paket.catatan}
          </>
        )}
      </Baris>

      <Baris judul="Kurir" onUbah={() => ke(3)}>
        {k.nama} ({k.estimasi})
      </Baris>

      <dl className="rincian">
        <div><dt>Ongkos kirim</dt><dd>{rupiah(biaya.ongkir)}</dd></div>
        {biaya.packing > 0 && (
          <div><dt>Packing paket rapuh</dt><dd>{rupiah(biaya.packing)}</dd></div>
        )}
        {biaya.asuransi > 0 && (
          <div><dt>Asuransi</dt><dd>{rupiah(biaya.asuransi)}</dd></div>
        )}
        <div className="total"><dt>Total bayar</dt><dd>{rupiah(biaya.total)}</dd></div>
      </dl>

      <label className="setuju">
        <input
          type="checkbox"
          checked={setuju}
          onChange={(e) => setSetuju(e.target.checked)}
        />
        <span>Paket ini tidak berisi barang terlarang dan data di atas sudah benar.</span>
      </label>
      {error && <small className="error" role="alert">{error}</small>}
    </section>
  );
}