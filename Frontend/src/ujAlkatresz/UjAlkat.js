import {useState } from 'react';
import './UjAlkat.css';

function UjAlkat() {
    const [actionVideoK, setActionViedoK] =useState(null)
    const [actionAlaplap, setActionAlaplap] =useState(null) 
    const [actionRam, setActionRam] =useState(null) 
    const [actionProcesszor, setActionProcesszor] =useState(null)

    const [actionTorol, setActionTorol] =useState(null) 
    const [actionHozzaAd, setActionHozzaAd] =useState(null) 
    const [actionFrissit, setActionFrissit] =useState(null)
    function NeFrissuljon(event)
    {
        event.preventDefault()
    }
    return (
        <div>
             <nav className='navbars'> {/*Navigációs menü*/}
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionAlaplap("Alaplap");console.log(actionAlaplap) }}>Alaplap</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionViedoK("Videókártya")}}>Videókártya</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionRam("Memória")}}>Memória</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionProcesszor("Processzor")}}>Processzor</a>
             </nav>
            <div className='body'>
                 <div className='kozos'>
                    <form>
                    Név:<br/><input type='text'/><br/>                {/*név mező*/}
                    Alaplapi csatlakozás:<br/><input type='text'/><br/>{/*alaplapi csatlakozás mező*/}
                    Ajánlott tápegység:<br/><input type='number'/><br/>{/*Ajánlott tápegység mező*/}
                    Monitor csatlakozás:<br/><input type='text'/><br/> {/*Monitor csatlakozás mező*/}
                    Vram:<br/> <input type='number'/><br/>              {/*Vram mező*/}
                    Chip  gyártója:<br/><input type='text'/><br/>      {/*név mező*/}
                    <input type='button' value='Beszúrás'/><br/>
                    </form>
                 </div>
                 <div className='kozos'>gggsydzhstrh</div>
                 <div className='kozos'>tahjtrzuyah</div>
            </div>
        </div>  
    );
  }
  
  export default UjAlkat;