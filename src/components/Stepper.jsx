const NAMA = ["Pengirim", "Penerima", "Paket", "Kurir", "Cek"];

export default function Stepper({ langkah }) {
  return (
    <ol className="stepper" aria-label="Langkah pengiriman">
      {NAMA.map((n, i) => (
        <li
          key={n}
          className={i < langkah ? "selesai" : i === langkah ? "aktif" : ""}
          aria-current={i === langkah ? "step" : undefined}
        >
          <span className="bulat">{i < langkah ? "✓" : i + 1}</span>
          <span className="nama">{n}</span>
        </li>
      ))}
    </ol>
  );
}