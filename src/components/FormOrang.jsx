import Field from "./Field";
import { KOTA } from "../data/kurir";

export default function FormOrang({ judul, deskripsi, bagian, data, ubah, errors, denganAlamat }) {
  const d = data[bagian];

  return (
    <section className="seksi">
      <h2>{judul}</h2>
      <p className="deskripsi">{deskripsi}</p>

      <div className="grid-2">
        <Field label="Nama lengkap" error={errors.nama}>
          <input
            value={d.nama}
            onChange={(e) => ubah(bagian, "nama", e.target.value)}
            placeholder="Sesuai KTP"
            autoComplete="name"
          />
        </Field>

        <Field label="Nomor HP" error={errors.hp} hint="Contoh: 081234567890">
          <input
            inputMode="numeric"
            maxLength={13}
            value={d.hp}
            onChange={(e) => ubah(bagian, "hp", e.target.value.replace(/\D/g, ""))}
          />
        </Field>
      </div>

      <Field label={bagian === "pengirim" ? "Kota asal" : "Kota tujuan"} error={errors.kota}>
        <select value={d.kota} onChange={(e) => ubah(bagian, "kota", e.target.value)}>
          <option value="">Pilih kota</option>
          {KOTA.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </Field>

      {denganAlamat && (
        <Field
          label="Alamat lengkap"
          error={errors.alamat}
          hint={`${d.alamat.length} karakter`}
        >
          <textarea
            rows={3}
            value={d.alamat}
            onChange={(e) => ubah(bagian, "alamat", e.target.value)}
            placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kode pos"
          />
        </Field>
      )}
    </section>
  );
}