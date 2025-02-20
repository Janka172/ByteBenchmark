import { useState } from 'react';
import Gorgeto from './Gorgeto';
import Reszlet from './Reszletek';
import { useLocation } from 'react-router-dom';

function KeretAlkatresz() {
  

  return (
    <div className='gorketok' id='alkok'>
      <Gorgeto tema='Videókártyák'></Gorgeto>
      <Gorgeto tema='Processzorok'></Gorgeto>
      <Gorgeto tema='RAM-ok'></Gorgeto>
      <Gorgeto tema='Operációsrendszerek'></Gorgeto>
      <Gorgeto tema='Alaplapok'></Gorgeto>
    </div>
  );
}

export default KeretAlkatresz;