import { KURIR } from "../data/kurir";
import { hitungBiaya, rupiah } from "../utils/format";

export default function PilihKurir({ data, ubah }) {
  const info = hitungBiaya(data);

  return (
    <section className="seksi">
      <h2>Pilih kurir</h2>
      <p className="deskripsi">
        Berat dihitung {info.berat} kg
        {info.pakaiVolume ? " (berdasarkan ukuran kardus)" : ""}.
      </p>

      <div className="kurir-list" role="radiogroup" aria-label="Pilihan kurir">
        {KURIR.map((k) => {
          const aktif = data.kurir === k.id;
          const b = hitungBiaya({ ...data, kurir: k.id });
          return (
            <button
              type="button"
              key={k.id}
              role="radio"
              aria-checked={aktif}
              className={aktif ? "kurir aktif" : "kurir"}
              onClick={() => ubah(null, "kurir", k.id)}
            >
              <span className="radio-bulat" aria-hidden="true" />
              <span className="kurir-info">
                <b>{k.nama}</b>
                <small>{k.estimasi}</small>
              </span>
              <span className="kurir-harga">{rupiah(b.ongkir)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}