import {useState, useEffect, use } from 'react';
import './UjAlkat.css';
import {RequestAlaplapP, RequestVideokP,RequestMemoriaP, RequestProcesszorP, RequestVideokPatch, RequestAlaplapPatch, RequestProcesszorPatch} from './Request';
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

    {/*Videókártya PATCH/PUT részéhez szükséges dolgok */}
      const [actionKivalasztottNev, setActionKivalasztottNev] = useState("");
      const [actionSzurtVram, setActionSzurtVram] = useState([]);
      const [actionSelectedVram, setActionSelectedVram]=useState("");
      useEffect(()=>{
         if (actionKivalasztottNev)
         {
            const vramok=mindenAdat['videokartyak'].filter((i)=>i.Nev===actionKivalasztottNev).map((i)=>i.vram);
            setActionSzurtVram(vramok);
         }
      },[actionKivalasztottNev]);

   var datak=null;
   async function adatLekeres(event, vram, nev)
      {
         event.preventDefault();
         console.log(vram)
         console.log(nev)
         var lekertadatok=await fetch(`https://localhost:44316/api/Videokartya/0?name=${nev}&vram=${vram}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {
               console.error("Nem található ilyen elem az adatbázisban!");
               
            }
         }
         else
         {
            datak= await lekertadatok.json();
            setActionMindenhezKellAdat(datak);
            console.log(datak);
         }       
      }
{/*............................................................................................................................. */}
   {/*Alaplap PATCH/PUT részéhez szükséges dolgok */}
   const [actionKivalasztottAlaplapNev, setActionKivalasztottAlaplapNev] = useState("");

   var datak=null;
   async function adatAlaplapLekeres(event, nev)
      {
         event.preventDefault();
         console.log(nev)
         var lekertadatok=await fetch(`https://localhost:44316/api/Alaplap/0?name=${nev}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {
               console.error("Nem található ilyen elem az adatbázisban!");
               
            }
         }
         else
         {
            datak= await lekertadatok.json();
            setActionMindenhezKellAdat(datak);
            console.log(datak);
         }       
      }
   {/*............................................................................................................................. */}
      {/*Processzor PATCH részéhez szükséges dolgok*/}
      const [actionKivalasztottProcesszorNev, setActionKivalasztottProcesszorNev] = useState("");
      
      var datak=null;
   async function adatProcesszorLekeres(event, nev)
      {
         event.preventDefault();
         console.log(nev)
         var lekertadatok=await fetch(`https://localhost:44316/api/Processzor/0?name=${nev}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {console.error("Nem található ilyen elem az adatbázisban!"); }
         }
         else
         {
            datak= await lekertadatok.json();
            setActionMindenhezKellAdat(datak);
            console.log(datak);
         }       
      }

   {/*............................................................................................................................. */}
   {/*Memória PATCH részéhez szükséges dolgok */}
   const [actionKivalaszottRamNev, setActionKivalasztottRamNev]=useState("");

   const [actionSzurtRamMeret, setActionSzurtRamMeret]=useState([]);
   const [actionSelectedRamMeret, setActionSelectedRamMeret]=useState("");

   const [actionSzurtRamFrekvencia, setActionSzurtRamFrekvencia]=useState([]);
   const [actionSelectedRamFrekvencia, setActionSelectedRamFrekvencia]=useState("");

   
   useEffect(()=>{
      if (actionKivalaszottRamNev)
      {
         const ramMeret=mindenAdat['memoriak'].filter((i)=>i.Nev===actionKivalaszottRamNev).map((i)=>i.Meret);
         setActionSzurtRamMeret(ramMeret);
      }
   },[actionKivalaszottRamNev]);

var datak=null;
async function adatLekeres(event, vram, nev)
   {
      event.preventDefault();
      console.log(vram)
      console.log(nev)
      var lekertadatok=await fetch(`https://localhost:44316/api/Videokartya/0?name=${nev}&vram=${vram}`);
      if (!lekertadatok.ok)
      {    
         if (lekertadatok.status===400) {
            console.error("Nem található ilyen elem az adatbázisban!");
            
         }
      }
      else
      {
         datak= await lekertadatok.json();
         setActionMindenhezKellAdat(datak);
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
            //------------------------Post---------------------
            if(actionHardver==="Videókártya" && actionButtons==="Post"){
               RequestVideokP("GPUALTALANOS.png"); 
            }
            else if(actionHardver==="Alaplap" && actionButtons==="Post"){
               RequestAlaplapP(fileUrl);
            }
            else if(actionHardver==="Memória" && actionButtons==="Post"){
               RequestMemoriaP(fileUrl);
            }
            else if(actionHardver==="Processzor" && actionButtons==="Post"){
               RequestProcesszorP(fileUrl);
            }
            //----------------------Patch/Put---------------------
            if(actionHardver==="Videókártya" && actionButtons==="Patch"){
               RequestVideokPatch("",actionKivalasztottNev, actionSelectedVram); 
            }
            else if(actionHardver==="Alaplap" && actionButtons==="Patch"){
               RequestAlaplapPatch("",actionKivalasztottAlaplapNev);
            }
            //else if(actionHardver==="Memória" && actionButtons==="Patch"){
               //RequestMemoriaP(fileUrl);
            //}
            else if(actionHardver==="Processzor" && actionButtons==="Patch"){
               RequestProcesszorPatch("", actionKivalasztottProcesszorNev);
            }
            
         }
         else if(selectedFile){
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
                     if(actionHardver==="Videókártya" && actionButtons==="Patch")RequestVideokPatch(data.file_name, actionKivalasztottNev, actionSelectedVram); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
                     if(actionHardver==="Alaplap" && actionButtons==="Patch")RequestAlaplapPatch(data.file_name, actionKivalasztottAlaplapNev); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
                     if(actionHardver==="Memória" && actionButtons==="Patch")RequestMemoriaP(data.file_name); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
                     if(actionHardver==="Processzor" && actionButtons==="Patch")RequestProcesszorPatch(data.file_name, actionKivalasztottProcesszorNev); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
                     setFileUrl(data.file_name);
                  } else {
                     console.error("Hiba történt:", data.message);
                  }
            } catch (error) {
                  console.error("Hálózati hiba:", error);
            }
         };
      }
    
        
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
                        <select className="combi"onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option>Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev}>{nev}</option>))}
                        </select><br/>

                     Vram:<br/>
                        <select onChange={(e)=>setActionSelectedVram(e.target.value)} >
                           <option>Válassz egyet</option>
                           {actionSzurtVram.map((vram)=>(<option value={vram} key={vram}>{vram}</option>))}
                        </select><br/>

                        <button className='buttons' type='button' onClick={(e)=>adatLekeres(e, actionSelectedVram, actionKivalasztottNev)}>Adatok lekérése</button><br/>

                    Alaplapi csatlakozás:<br/><input type='text' id='VideokPatch1'/><br/>
                    Ajánlott tápegység:<br/><input type='number' id='VideokPatch2'/><br/>
                    Monitor csatlakozás:<br/><input type='text' id='VideokPatch3'/><br/> 
                    Chip  gyártója:<br/><input type='text' id='VideokPatch4'/><br/>

                    <input type="file" onChange={handleFileChange} />              {/*Képfeltöltés*/}
                    <button className='buttons' type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div>
                    <p>Név: {actionMindenhezKellAdat?.Nev}</p>
                    <p>Alaplapi csatlakozás: {actionMindenhezKellAdat?.alaplapCsatlakozas}</p>
                    <p>Ajánlott tápegység: {actionMindenhezKellAdat?.ajanlottTapegyseg}</p>                 
                    <p>Monitor csatlakozás: {actionMindenhezKellAdat?.monitorCsatlakozas}</p> 
                    <p>Vram: {actionMindenhezKellAdat?.vram}</p> 
                    <p>Chip  gyártója: {actionMindenhezKellAdat?.chipGyartoja}</p>       
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
                        Név:<br/>
                        <select className="combi" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option>Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(
                              <option key={nev} value={nev}>{nev}</option>
                           ))}
                        </select><br/>

                           <button className='buttons' type='button' onClick={(e)=>adatAlaplapLekeres(e, actionKivalasztottAlaplapNev)}>Adatok lekérése</button><br/>
                        
                        Processzor foglalat:<br/><input type="text" id="AlaplapPatch1"/><br/>
                        Alaplap formátum:<br/><input type="text" id="AlaplapPatch2"/><br/>
                        Maximum frekvencia:<br/><input type="number" id="AlaplapPatch3"/><br/>
                        Memória típus:<br/><input type="text" id="AlaplapPatch4"/><br/>
                        Lapkakészlet:<br/><input type="text" id="AlaplapPatch5"/><br/>
                        Slot szám:<br/><input type="number" id="AlaplapPatch6"/><br/>

                        Hangkártya:<br/>
                        <input type="radio" id="AlaplapPatch7" name="hgk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}/>
                        <label htmlFor="hgk_true">Tartalmaz hangkártyát.</label><br/>
            
                        <input type="radio" id="AlaplapPatch8" name="hgk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}/>
                        <label htmlFor="hgk_false">Nem tartalmaz hangkártyát.</label> 

                        <input type="file" onChange={handleFileChange} />                     {/*Képfeltöltés*/}
                        <button className='buttons' type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div>
                    <p>Név:{actionMindenhezKellAdat?.Nev}</p>
                    <p>Processzor foglalat:{actionMindenhezKellAdat?.CpuFoglalat}</p>
                    <p>Alaplap formátum:{actionMindenhezKellAdat?.AlaplapFormatum}</p>
                    <p>Maximum frekvencia:{actionMindenhezKellAdat?.MaxFrekvencia}</p>
                    <p>Memória típus:{actionMindenhezKellAdat?.MemoriaTipusa}</p>
                    <p>Lapkakészlet:{actionMindenhezKellAdat?.Lapkakeszlet}</p>
                    <p>Slot szám:{actionMindenhezKellAdat?.SlotSzam}</p>
                    <p>Hangkártya:{actionMindenhezKellAdat?.Hangkartya}</p>      
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
                        Méret:<br/><input type="number" id='MemoriaPost4'/>GB
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
                        Név:<br/>
                        <select className="combi"onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option>Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev}>{nev}</option>))}
                        </select><br/>

                        //Frekvencia:<br/><input type="number"/>MHz<br/>
                        //Méret:<br/><input type="nmuber"/>


                        Memória típus:<br/><input type="text"/><br/>
                       
                             
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
                            Név:<br/>
                            <select className="combi" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                           <option>Válassz egyet</option>
                           {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(
                              <option key={nev} value={nev}>{nev}</option>
                           ))}
                        </select><br/>

                           <button className='buttons' type='button' onClick={(e)=>adatProcesszorLekeres(e, actionKivalasztottProcesszorNev)}>Adatok lekérése</button><br/>

                            Frekvencia:<br/><input type="number" id='ProcPatch1'/><br/>
                            Maximum frekvencia:<br/><input type="number" id='ProcPatch2'/><br/>
                            Alaplap foglalat:<br/><input type="text" id='ProcPatch3'/><br/>
                            Szálak száma:<br/><input type="number" id='ProcPatch4'/><br/>
                            Támogatott memória típus:<br/><input type="text" id='ProcPatch5'/><br/>
                            Processzormegok száma:<br/><input type="number" id='ProcPatch6'/><br/>           
                            Gyártó:<br/><input type="text" id='ProcPatch7'/><br/>
                            Ajánlott tápegység:<br/><input type="number" id='ProcPatch8'/>W<br/>

                            Integrált videókártya:<br/>
                            <input type="radio" id="ProcPatch9" name="ivk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}></input>
                            <label htmlFor="ivk_true">Tartalmaz integrált videókártyát.</label><br/>
                
                            <input type="radio" id="ProcPatch10" name="ivk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}></input>
                            <label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label>
                            
                            <input type="file" onChange={handleFileChange} />                   {/*Képfeltöltés*/}
                              <button className='buttons' type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button> 
                     </form>
                 </div>

                 <div  >
                 <p>Név:{actionMindenhezKellAdat?.Nev}</p><br></br>
                 <p>Frekvencia:{actionMindenhezKellAdat?.ProcesszorFrekvencia}</p><br></br>
                 <p>Maximum frekvencia:{actionMindenhezKellAdat?.BProcesszorFrekvencia}</p><br></br>
                 <p>Alaplap foglalat:{actionMindenhezKellAdat?.AlaplapFoglalat}</p><br></br>
                 <p>Szálak száma:{actionMindenhezKellAdat?.SzalakSzama}</p><br></br>
                 <p>Támogatott memória típus:{actionMindenhezKellAdat?.TamogatottMemoriatipus}</p><br></br>
                 <p>Processzormegok száma:{actionMindenhezKellAdat?.ProcesszormagokSzama}</p><br></br>          
                 <p>Gyártó:{actionMindenhezKellAdat?.Gyarto}</p><br></br>
                 <p>Ajánlott tápegység:{actionMindenhezKellAdat?.AjanlottTapegyseg}</p><br></br>            
                 <p>Integrált videókártya:{actionMindenhezKellAdat?.IntegraltVideokartya}</p><br></br>
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