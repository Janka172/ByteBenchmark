import React, { useState } from 'react';
import { Link } from "react-router-dom";
import VisszaStilus from './Vissza.css';

function Vissza() {

  return (
    <Link to='/oldalak/Alkatreszek'><button className='osszeshez'> &#8592; Vissza az Összesítőbe</button></Link>
  );
}

export default Vissza;