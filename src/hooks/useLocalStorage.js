import { useState, useEffect } from "react";

export default function useLocalStorage(kunci, awal) {
  const [nilai, setNilai] = useState(() => {
    const simpan = localStorage.getItem(kunci);
    return simpan ? JSON.parse(simpan) : awal;
  });

  useEffect(() => {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  }, [kunci, nilai]);

  return [nilai, setNilai];
}