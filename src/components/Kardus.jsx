export default function Kardus({ paket, penerima, tertutup }) {
  const batas = (v, def) => Math.min(60, Math.max(10, Number(v) || def));
  const p = batas(paket.p, 30);
  const l = batas(paket.l, 25);
  const t = batas(paket.t, 20);

  const w = 80 + p * 1.6;
  const h = 50 + t * 1.6;
  const dx = 40 + l * 0.8;
  const dy = dx * 0.45;
  const x0 = (320 - (w + dx)) / 2;
  const fy = 240 - h;
  const tapeX = x0 + w / 2 - 9;

  const nama = (penerima.nama || "Nama penerima").slice(0, 16);
  const kota = penerima.kota || "Kota tujuan";
  const labelW = Math.min(w - 20, 116);

  return (
    <figure className="kardus-stage">
      <svg
        viewBox="0 0 320 260"
        className={tertutup ? "kardus tertutup" : "kardus"}
        role="img"
        aria-label={`Kardus berukuran ${paket.p || 30} kali ${paket.l || 25} kali ${paket.t || 20} sentimeter`}
      >
        <ellipse cx="160" cy="246" rx={(w + dx) / 2} ry="8" className="bayangan" />

        <g className="kotak">
          {/* sisi samping */}
          <polygon
            className="k-sisi"
            points={`${x0 + w},${fy} ${x0 + w + dx},${fy - dy} ${x0 + w + dx},${fy - dy + h} ${x0 + w},${fy + h}`}
          />
          {/* depan */}
          <rect className="k-depan" x={x0} y={fy} width={w} height={h} />
          {/* atas */}
          <polygon
            className="k-atas"
            points={`${x0},${fy} ${x0 + dx},${fy - dy} ${x0 + w + dx},${fy - dy} ${x0 + w},${fy}`}
          />

          {/* lakban */}
          <rect className="tape" x={tapeX} y={fy} width="18" height={h * 0.5} />
          <polygon
            className="tape"
            points={`${tapeX},${fy} ${tapeX + 18},${fy} ${tapeX + 18 + dx},${fy - dy} ${tapeX + dx},${fy - dy}`}
          />

          {/* label alamat */}
          <rect className="label" x={x0 + 10} y={fy + h - 44} width={labelW} height="34" rx="4" />
          <text className="label-nama" x={x0 + 18} y={fy + h - 28}>{nama}</text>
          <text className="label-kota" x={x0 + 18} y={fy + h - 15}>{kota}</text>

          {/* stiker rapuh */}
          {paket.rapuh && (
            <g>
              <rect className="stiker" x={x0 + w - 56} y={fy + 10} width="46" height="20" rx="4" />
              <text className="stiker-teks" x={x0 + w - 33} y={fy + 24} textAnchor="middle">
                RAPUH
              </text>
            </g>
          )}
        </g>
      </svg>
      <figcaption>
        {paket.p || 30} × {paket.l || 25} × {paket.t || 20} cm
      </figcaption>
    </figure>
  );
}