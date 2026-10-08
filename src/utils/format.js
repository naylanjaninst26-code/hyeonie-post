import { KURIR } from "../data/kurir";

export const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

const hpValid = (v) => /^08\d{8,11}$/.test(v);

export function hitungBiaya({ pengirim, penerima, paket, kurir }) {
  const k = KURIR.find((x) => x.id === kurir);
  const aktual = Number(paket.berat) || 0;
  const volume =
    ((Number(paket.p) || 0) * (Number(paket.l) || 0) * (Number(paket.t) || 0)) / 6000;
  const berat = Math.max(1, Math.ceil(Math.max(aktual, volume)));
  const faktorJarak = pengirim.kota && pengirim.kota === penerima.kota ? 0.6 : 1;
  const ongkir = (k.dasar + (berat - 1) * k.tarifKg) * faktorJarak;
  const asuransi = paket.asuransi ? 2000 + (Number(paket.nilai) || 0) * 0.002 : 0;
  const packing = paket.rapuh ? 5000 : 0;
  return {
    berat,
    volume,
    pakaiVolume: volume > aktual,
    ongkir,
    asuransi,
    packing,
    total: ongkir + asuransi + packing,
  };
}

export const validasi = [
  ({ pengirim: p }) => {
    const e = {};
    if (!p.nama.trim()) e.nama = "Nama pengirim wajib diisi.";
    if (!hpValid(p.hp)) e.hp = "Nomor HP harus diawali 08 dan 10-13 digit.";
    if (!p.kota) e.kota = "Pilih kota asal paket.";
    return e;
  },
  ({ penerima: p }) => {
    const e = {};
    if (!p.nama.trim()) e.nama = "Nama penerima wajib diisi.";
    if (!hpValid(p.hp)) e.hp = "Nomor HP harus diawali 08 dan 10-13 digit.";
    if (!p.kota) e.kota = "Pilih kota tujuan.";
    if (p.alamat.trim().length < 10) e.alamat = "Alamat minimal 10 karakter agar kurir tidak nyasar.";
    return e;
  },
  ({ paket: p }) => {
    const e = {};
    const b = Number(p.berat);
    if (!p.isi) e.isi = "Pilih isi paket.";
    if (!b || b <= 0) e.berat = "Isi berat paket.";
    else if (b > 30) e.berat = "Maksimal 30 kg per paket.";
    ["p", "l", "t"].forEach((k) => {
      const v = Number(p[k]);
      if (!v || v < 1 || v > 60) e[k] = "1-60 cm";
    });
    if (p.asuransi && !(Number(p.nilai) > 0)) e.nilai = "Isi nilai barang untuk asuransi.";
    return e;
  },
  () => ({}),
];