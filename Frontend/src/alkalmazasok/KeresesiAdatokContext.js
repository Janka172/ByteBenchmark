import React, { createContext, useContext, useState } from 'react';

const KeresesiAdatokContext = createContext();

export function KeresesiAdatokProvider({ children }) {
  const [keresesiAdatok, setKeresesiAdatok] = useState({
    nev: '',
    kategoria: '-',
    videokartya: '-',
    processzor: '-',
    opRendszer: '-',
    ram: '',
    tarhely: '',
  });

  return (
    <KeresesiAdatokContext.Provider value={{ keresesiAdatok, setKeresesiAdatok }}>
      {children}
    </KeresesiAdatokContext.Provider>
  );
}

// Hook, amellyel könnyen hozzáférhetünk a keresési adatokhoz
export function useKeresesiAdatok() {
  return useContext(KeresesiAdatokContext);
}
