import {useState, useEffect, use } from 'react';
import './UjAlkat.css';
import {RequestAlaplapP, RequestVideokP,RequestMemoriaP, RequestProcesszorP} from './Request';
{/*Összes adat tárolására*/}
const mindenAdat={ 
   videokartyak : [],
   processzorok : [],
   alaplapok : [],
   memoriak : [],
   alaplapCsatlakozok : [] 
}
function UjAlkat() {
   {/*Minden adathoz használva van! */}
   const [actionMindenhezKellAdat, setActionMindenhezKellAdat] = useState(null);


    const [actionHardver, setActionHardver] =useState("Videókártya")
    const [actionButtons, setActionButtons] =useState("Post")

   {/*Arra kell hogy egy rádiógomb alapértelmezetten ki legyen választva az oldal betöltésekor */}
   const [actionIvkRadiobt, setActionIvkRadiobt] = useState("Jeloltradiogomb"); //processzor rádiógombjainál van
   const [actionHgkRadiobf, setActionHgkRadiobf] = useState("Nemjeloltradiogomb"); //alaplap rádiógombjainál van

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    {/*Videókártya PATCH/PUT részéhez szükséges useState-ek */}
      const [actionKivalasztottNev, setActionKivalasztottNev] = useState("");
      const [actionSzurtVram, setActionSzurtVram] = useState([]);
      useEffect(()=>{
         if (actionKivalasztottNev)
         {
            const vramok=mindenAdat['videokartyak'].filter((i)=>i.Nev===actionKivalasztottNev).map((i)=>i.vram);
            setActionSzurtVram(vramok);
         }
      },[actionKivalasztottNev]);
   {/*............................................................................................................................. */}
      const datak=null;
   async function adatLekeres(event, vram, nev)
      {
         event.preventDefault();
         var lekertadatok=await fetch(`https://localhost:44316/api/Videokartya/0?name=${encodeURIComponent(nev)}&vram=${vram}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {
               console.error("Nem található ilyen elem az adatbázisban!");
               
            }
         }
         else
         {
            datak= await lekertadatok.json();
            console.log(datak);
         }       
      }


   {/*............................................................................................................................. */}



   useEffect(()=>{
      {/* A backendben lévő elérési útvonalak*/}
      const backEleresiUtvonal={
         'videokartyak': "https://localhost:44316/api/Videokartya",
        'processzorok': "https://localhost:44316/api/Processzor",
        'memoriak': "https://localhost:44316/api/Ram",
        'alaplapok': "https://localhost:44316/api/Alaplap",
        'alaplapCsatlakozok': "https://localhost:44316/api/Csatlakozo"
      }
      {/*A fetchAdat beolvassa az adatbázisból az adatokat backenden keresztül.*/}
      const fetchAdat= async ()=>{
         try
         {
            for(var item in backEleresiUtvonal)
            {
               const response= await fetch(backEleresiUtvonal[item]);
               if (response.ok)
               {
                  const adat= await response.json();
                  mindenAdat[item]=adat;
               }
               else{throw new Error(`Hiba a ${item} lekérésekor: ${response.status}`);}           
            }
            
         } catch (error)
         {
            console.error("Hiba történt! Hiba: ", error)
         }
      }
      fetchAdat(); 
   },[])

    const handleUploadAndPost = async (event) => {
      event.preventDefault();
        if (!selectedFile) {
            alert("Válassz egy fájlt!");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
                mode: "cors",
            });
            
            const data = await response.json();
            if (response.ok) {
               {/*POST része */}
               if(actionHardver==="Videókártya" && actionButtons==="Post")RequestVideokP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               if(actionHardver==="Alaplap" && actionButtons==="Post")RequestAlaplapP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               if(actionHardver==="Memória" && actionButtons==="Post")RequestMemoriaP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               if(actionHardver==="Processzor" && actionButtons==="Post")RequestProcesszorP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               
               
               {/*PATCH/PUT része */}
               if(actionHardver==="Videókártya" && actionButtons==="Patch")RequestVideokP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               if(actionHardver==="Alaplap" && actionButtons==="Patch")RequestAlaplapP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               if(actionHardver==="Memória" && actionButtons==="Patch")RequestMemoriaP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
               if(actionHardver==="Processzor" && actionButtons==="Patch")RequestProcesszorP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
                setFileUrl(data.file_name);
            } else {
                console.error("Hiba történt:", data.message);
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
        }
    };
    const url="/IMAGE/"+fileUrl;

    function NeFrissuljon(event)
    {
        event.preventDefault()
    }
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div>
             <nav className='navbars'> {/*Navigációs menü*/}
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Videókártya"); setActionButtons("Post")}}>Videókártya</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Alaplap"); setActionButtons("Post")}}>Alaplap</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Memória"); setActionButtons("Post")}}>Memória</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Processzor"); setActionButtons("Post")}}>Processzor</a>
             </nav>


             {actionHardver==="Videókártya" && actionButtons==="Post" ? <div className='body'>
                 <div>
                    <form>
                    Név:<br/><input type='text' id='VideoPost1'/><br/>                 
                    Alaplapi csatlakozás:<br/><input type='text' id='VideoPost2'/><br/>
                    Ajánlott tápegység:<br/><input type='number' id='VideoPost3'/><br/>
                    Monitor csatlakozás:<br/><input type='text' id='VideoPost4'/><br/> 
                    Vram:<br/> <input type='number' id='VideoPost5'/><br/>             
                    Chip  gyártója:<br/><input type='text' id='VideoPost6'/><br/>
     
                    <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/} 
                    <button type='button' className='buttons' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>
                 <div>
                    <p>Kép neve: {fileUrl}</p>
                    <p>Url: {url}</p>
                    </div>
                 <div  >
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Patch" ? <div className='body'>
                 <div>
                    <form>
                     Név:<br/>
                        <select onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option selected>Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(
                              <option key={nev} value={nev}>{nev}</option>
                           ))}
                        </select><br/>
                     Vram:<br/>
                        <select>
                           <option selected>Válassz egyet</option>
                           {actionSzurtVram.map((vram)=>(<option value={vram} key={vram}>{vram}</option>))}
                        </select><br/>
                        <button className='buttons' type='button' onClick={(e)=>adatLekeres(e.target.value, actionKivalasztottNev)}>Adatok lekérése</button><br/>

                    Alaplapi csatlakozás:<br/><input type='text'/><br/>
                    Ajánlott tápegység:<br/><input type='number'/><br/>
                    Monitor csatlakozás:<br/><input type='text'/><br/> 
                    Chip  gyártója:<br/><input type='text'/><br/>

                    <input type="file" onChange={handleFileChange} />              {/*Képfeltöltés*/}
                    <button className='buttons' type='button' onClick={''}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div>
                    <p>Név: {datak?.Nev}</p>
                    <p>Alaplapi csatlakozás: {datak?.alaplapCsatlakozas}</p>
                    <p>Ajánlott tápegység: {datak?.ajanlottTapegyseg}</p>                 
                    <p>Monitor csatlakozás: {datak?.monitorCsatlakozas}</p> 
                    <p>Vram: {datak?.vram}</p> 
                    <p>Chip  gyártója: {datak?.chipGyartoja}</p>       
                    {/* <image src=""></image>*/}
                 </div>


                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Delete" ? <div className='body'>
                 <div>
                    <form>
                    Név:<br/><input type='text'/><br/>                 
                    Vram:<br/> <input type='number'/><br/>
                    <button className='buttons' type='button' onClick={''}>Alkatrész eltávolítása</button>
                    </form>
                 </div>
                 <div>gggsydzhstrh</div>
                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Alaplap" && actionButtons==="Post" ? <div className='body'>
                 <div>
                    <form>
                        Név:<br/><input type="text" id='AlaplapPost1'/><br/>
                        Processzor foglalat:<br/><input type="text" id='AlaplapPost2'/><br/>
                        Alaplap formátum:<br/><input type="text" id='AlaplapPost3'/><br/>
                        Maximum frekvencia:<br/><input type="number" id='AlaplapPost4'/><br/>
                        Memória típus:<br/><input type="text" id='AlaplapPost5'/><br/>
                        Lapkakészlet:<br/><input type="text" id='AlaplapPost6'/><br/>
                        Slot szám:<br/><input type="number" id='AlaplapPost7'/><br/>
                        Csatlakozók:<br/>
                        {/*Ez egy listbox az alaplap csatlakozóinak neveivel */}
                        <select id='AlaplapPost8' multiple>
                        {[...new Set(mindenAdat['alaplapCsatlakozok'].map(i=>i.Nev))].map((nev)=>(
                           <option value={nev} key={nev}>{nev}</option>
                        ))}
                        </select><br/>
                        
                        Hangkártya:<br/>
                        <input type="radio" id="AlaplapPost9" name="hgk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}></input>
                        <label htmlFor="hgk_true">Tartalmaz hangkártyát.</label><br/>
            
                        <input type="radio" id="AlaplapPost10" name="hgk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}></input>
                        <label htmlFor="hgk_false">Nem tartalmaz hangkártyát.</label>

                        <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/}
                        <button className='buttons' type='button' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>
                 <div>
                    <p>Kép neve: {fileUrl}</p>
                    <p>Url: {url}</p>
                    </div>
                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Alaplap" && actionButtons==="Patch" ? <div className='body'>
                 <div>
                    <form>
                        Név:<br/><input type="text"/><br/>
                        Processzor foglalat:<br/><input type="text"/><br/>
                        Alaplap formátum:<br/><input type="text"/><br/>
                        Maximum frekvencia:<br/><input type="number"/><br/>
                        Memória típus:<br/><input type="text"/><br/>
                        Lapkakészlet:<br/><input type="text"/><br/>
                        Slot szám:<br/><input type="number"/><br/>

                        Hangkártya:<br/>
                        <input type="radio" id="hgk_true" name="hgk_true" value="True"></input>
                        <label htmlFor="hgk_true">Tartalmaz hangkártyát.</label><br/>
            
                        <input type="radio" id="hgk_false" name="hgk_true" value="False"></input>
                        <label htmlFor="hgk_false">Nem tartalmaz hangkártyát.</label> 

                        <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/}
                        <button className='buttons' type='button' onClick={''}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div>
                    <p>Név:{}</p>
                    <p>Processzor foglalat:{}</p>
                    <p>Alaplap formátum:{}</p>
                    <p>Maximum frekvencia:{}</p>
                    <p>Memória típus:{}</p>
                    <p>Lapkakészlet:{}</p>
                    <p>Slot szám:{}</p>
                    <p>Hangkártya:{}</p>

                    <p><input type="radio" id="hgk_true" name="hgk_true" value="True"></input></p>
                    <p><label htmlFor="hgk_true">Tartalmaz hangkártyát.</label><br/></p>
            
                    <p><input type="radio" id="hgk_false" name="hgk_true" value="False"></input></p>
                    <p><label htmlFor="hgk_false">Nem tartalmaz hangkártyát.</label></p>       
                    {/* <image src=""></image>*/}
                 </div>


                 <div  >
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Alaplap" && actionButtons==="Delete" ? <div className='body'>
                 <div>
                    <form>
                    Név:<br/><input type='text'/><br/>
                    <button className='buttons' type='button' onClick={''}>Alkatrész eltávolítása</button>
                    </form>
                 </div>
                 <div >gggsydzhstrh</div>
                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Memória" && actionButtons==="Post" ? <div className='body'>
                 <div>
                    <form>
                        Név:<br/><input type="text" id='MemoriaPost1'/><br/>
                        Memória típus:<br/><input type="text" id='MemoriaPost2'/><br/>
                        Frekvencia:<br/><input type="number" id='MemoriaPost3'/>MHz<br/>
                        Méret:<br/><input type="nmuber" id='MemoriaPost4'/>
                        <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/} 
                        <button className='buttons' type='button' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>
                 <div>
                    <p>Kép neve: {fileUrl}</p>
                    <p>Url: {url}</p>
                    </div>
                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Memória" && actionButtons==="Patch" ? <div className='body'>
                 <div>
                    <form>
                        Név:<br/><input type="text"/><br/>
                        Memória típus:<br/><input type="text"/><br/>
                        Frekvencia:<br/><input type="number"/>MHz<br/>
                        Méret:<br/><input type="nmuber"/>      
                        <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/}
                        <button className='buttons' type='button' onClick={''}>Módosítások mentése</button>
                    </form>
                 </div>
                 <div>
                    <p>Név:{}</p>
                    <p>Memória típus:{}</p>
                    <p>Frekvencia:{}</p>
                    <p>Méret:{}</p>       
                    {/* <image src=""></image>*/}
                 </div>
                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Memória" && actionButtons==="Delete" ? <div className='body'>
                 <div  >
                    <form>
                    Név:<br/><input type='text'/><br/>                 
                    Frekvencia:<br/> <input type='number'/><br/>
                    <button className='buttons' type='button' onClick={''}>Alkatrész eltávolítása</button>
                    </form>
                 </div>
                 <div>gggsydzhstrh</div>
                 <div>
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Processzor" && actionButtons==="Post" ? <div className='body'>
                 <div>
                     <form>
                        Név:<br/><input type="text" id='ProcPost1'/><br/>
                        Alap frekvencia:<br/><input type="number"id='ProcPost2'/><br/>
                        Maximum frekvencia:<br/><input type="number"id='ProcPost3'/><br/> 
                        Alaplap foglalat:<br/><input type="text"id='ProcPost4'/><br/>
                        Szálak száma:<br/><input type="number"id='ProcPost5'/><br/>
                        Támogatott memória típus:<br/><input type="text"id='ProcPost6'/><br/>
                        Processzormagok száma:<br/><input type="number"id='ProcPost7'/><br/>           
                        Gyártó:<br/><input type="text"id='ProcPost8'/><br/>
                        Ajánlott tápegység:<br/><input type="number"id='ProcPost9'/>W<br/> 

                        Integrált videókártya:<br/>
                        <input type="radio" id="ProcPost10" name="ivk_true" value="True" checked={actionIvkRadiobt==='Jeloltradiogomb'}onChange={()=>setActionIvkRadiobt('Jeloltradiogomb')}></input>
                        <label htmlFor="ProcPost11">Tartalmaz integrált videókártyát.</label><br/>

                        <input type="radio" id="ProcPost11" name="ivk_true" value="False" checked={actionIvkRadiobt==='Jeloltradiogombocska'} onChange={()=>setActionIvkRadiobt('Jeloltradiogombocska')}></input>
                        <label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label>
                        
                        <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/} 
                        <button className='buttons' type='button' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>
                 <div  >
                    <p>Kép neve: {fileUrl}</p>
                    <p>Url: {url}</p>
                    </div>
                 <div  >
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Processzor" && actionButtons==="Patch" ? <div className='body'>
                 <div>
                    <form>
                            Név:<br/><input type="text"/><br/>
                            Frekvencia:<br/><input type="text"/><br/>
                            Alaplap foglalat:<br/><input type="text"/><br/>
                            Szálak száma:<br/><input type="number"/><br/>
                            Támogatott memória típus:<br/><input type="text"/><br/>
                            Processzormegok száma:<br/><input type="number"/><br/>           
                            Gyártó:<br/><input type="text"/><br/>
                            Ajánlott tápegység:<br/><input type="number"/>W<br/>            
                            Integrált videókártya:<br/>
                            <input type="radio" id="ivk_true" name="ivk_true" value="True"></input>
                            <label htmlFor="ivk_true">Tartalmaz integrált videókártyát.</label><br/>
                
                            <input type="radio" id="ivk_false" name="ivk_true" value="False"></input>
                            <label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label>
                            
                            <input type="file" onChange={handleFileChange} />                   {/*Képfeltöltés*/}
                              <button className='buttons' type='button' onClick={''}>Módosítások mentése</button> 
                     </form>
                 </div>

                 <div  >
                 <p>Név:</p><br></br>
                 <p>Frekvencia:</p><br></br>
                 <p>Alaplap foglalat:</p><br></br>
                 <p>Szálak száma:</p><br></br>
                 <p>Támogatott memória típus:</p><br></br>
                 <p>Processzormegok száma:</p><br></br>          
                 <p>Gyártó:</p><br></br>
                 <p>Ajánlott tápegység:</p><br></br>            
                 <p>Integrált videókártya:</p><br></br>
                 <p><input type="radio" id="ivk_true" name="ivk_true" value="True"></input></p>
                 <p><label htmlFor="ivk_true">Tartalmaz integrált videókártyát.</label><br/></p>
                
                <p><input type="radio" id="ivk_false" name="ivk_true" value="False"></input></p>
                 <p><label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label></p>
                 </div>
                 <div >
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Processzor" && actionButtons==="Delete" ? <div className='body'>
                 <div  >
                    <form>
                    Név:<br/><input type='text'/><br/>
                    <button className='buttons' type='button' onClick={''}>Alkatrész eltávolítása</button>                
                    </form>
                 </div>
                 <div   >gggsydzhstrh</div>
                 <div  >
                    <div>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
                 </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        </div>  
    );
  }
  
  export default UjAlkat;