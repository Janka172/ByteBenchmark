import React, { useState } from 'react';
import { Link } from "react-router-dom";
import VisszaOsszesitobeStilus from './VisszaOsszesitobe.css';

function VisszaOsszesitobe() {

  return (
    <Link to='/oldalak/Alkalmazasok'><button className='oszeshez'> &#8592; Vissza az Összesítőbe</button></Link>
  );
}

export default VisszaOsszesitobe;