import { useState } from 'react';
import AppStilus from '../App.css';
import AppReszlet from '../alkalmazasReszletek/AppReszlet';

function AlkalmazasReszletek() {

  return (
    <div className='Tartalmak'>
      <AppReszlet></AppReszlet>
    </div> 
  );
}

export default AlkalmazasReszletek;