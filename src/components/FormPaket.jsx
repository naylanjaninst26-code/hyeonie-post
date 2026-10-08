import Field from "./Field";
import { ISI_PAKET } from "../data/kurir";
import { rupiah } from "../utils/format";

export default function FormPaket({ data, ubah, errors }) {
  const p = data.paket;
  const set = (k) => (e) => ubah("paket", k, e.target.value);

  return (
    <section className="seksi">
      <h2>Detail paket</h2>
      <p className="deskripsi">Ukuran kardus di samping ikut berubah sesuai isianmu.</p>

      <div className="field">
        <span className="field-label">Isi paket</span>
        <div className="chips">
          {ISI_PAKET.map((i) => (
            <button
              type="button"
              key={i}
              aria-pressed={p.isi === i}
              className={p.isi === i ? "chip aktif" : "chip"}
              onClick={() => ubah("paket", "isi", i)}
            >
              {i}
            </button>
          ))}
        </div>
        {errors.isi && <small className="error" role="alert">{errors.isi}</small>}
      </div>

      <div className="grid-2">
        <Field label="Berat (kg)" error={errors.berat} hint="Maksimal 30 kg">
          <input type="number" min="0" step="0.1" value={p.berat} onChange={set("berat")} />
        </Field>
        <Field
          label="Nilai barang (Rp)"
          error={errors.nilai}
          hint={p.nilai ? rupiah(Number(p.nilai)) : "Untuk menghitung asuransi"}
        >
          <input type="number" min="0" value={p.nilai} onChange={set("nilai")} />
        </Field>
      </div>

      <div className="grid-3">
        <Field label="Panjang (cm)" error={errors.p}>
          <input type="number" min="1" max="60" value={p.p} onChange={set("p")} />
        </Field>
        <Field label="Lebar (cm)" error={errors.l}>
          <input type="number" min="1" max="60" value={p.l} onChange={set("l")} />
        </Field>
        <Field label="Tinggi (cm)" error={errors.t}>
          <input type="number" min="1" max="60" value={p.t} onChange={set("t")} />
        </Field>
      </div>

      <label className="toggle">
        <input
          type="checkbox"
          checked={p.rapuh}
          onChange={(e) => ubah("paket", "rapuh", e.target.checked)}
        />
        <span className="slider" aria-hidden="true" />
        <span>
          <b>Paket rapuh</b>
          <small>Kurir menempel stiker dan menambah bubble wrap (+Rp 5.000)</small>
        </span>
      </label>

      <label className="toggle">
        <input
          type="checkbox"
          checked={p.asuransi}
          onChange={(e) => ubah("paket", "asuransi", e.target.checked)}
        />
        <span className="slider" aria-hidden="true" />
        <span>
          <b>Pakai asuransi</b>
          <small>Ganti rugi jika paket hilang atau rusak</small>
        </span>
      </label>

      <Field label="Catatan untuk kurir (opsional)" hint={`${p.catatan.length}/100`}>
        <textarea
          rows={2}
          maxLength={100}
          value={p.catatan}
          onChange={set("catatan")}
          placeholder="Contoh: titip di satpam jika tidak ada orang"
        />
      </Field>
    </section>
  );
}