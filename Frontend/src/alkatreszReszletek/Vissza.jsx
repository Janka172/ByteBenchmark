import React, { useState } from 'react';
import { Link } from "react-router-dom";
import VisszaStilus from './Vissza.css';

function Vissza() {

  return (
    <Link to='/oldalak/Alkatreszek'><button className='osszeshez'> &#8592; Az Összes Alkatrészhez</button></Link>
  );
}

export default Vissza;