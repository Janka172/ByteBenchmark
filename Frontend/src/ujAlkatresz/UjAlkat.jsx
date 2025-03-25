import {useState, useEffect, use } from 'react';
import './UjAlkat_post.css';
import './UjAlkat_patch.css';
import './UjAlkat_delete.css';
import {RequestAlaplapP, RequestVideokP,RequestMemoriaP, RequestProcesszorP, RequestVideokPatch, RequestAlaplapPatch, RequestProcesszorPatch, RequestRamPatch, RequestVideokDelete, RequestAlaplapDelete, RequestProcesszorDelete, RequestRamDelete} from './Request';
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
         const ramFrekvencia=[...new Set(mindenAdat['memoriak'].filter((i)=>i.Nev===actionKivalaszottRamNev).map((i)=>i.Frekvencia))];
         setActionSzurtRamFrekvencia(ramFrekvencia);
      }
   },[actionKivalaszottRamNev]);

   useEffect(()=>{
      if (actionSelectedRamFrekvencia)
      {
         console.log(actionKivalaszottRamNev);
         console.log(actionSelectedRamFrekvencia);
         const ramMeret=mindenAdat["memoriak"].filter((x)=>x.Nev===actionKivalaszottRamNev && x.Frekvencia==actionSelectedRamFrekvencia).map((y)=>y.Meret)
         console.log(ramMeret)
         setActionSzurtRamMeret(ramMeret);
         
      }
   },[actionKivalaszottRamNev, actionSelectedRamFrekvencia]);


var datak=null;
async function adatRamLekeres(event, nev, meret, frekvencia)
   {
      event.preventDefault();
      console.log(nev);
      console.log(meret);
      console.log(frekvencia);
      var lekertadatok=await fetch(`https://localhost:44316/api/Ram/0?name=${nev}&meret=${meret}&frekvencia=${frekvencia}`);
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
    async function handleDelete(event)
   {
    event.preventDefault();
    if(actionHardver==="Videókártya" && actionButtons==="Delete")RequestVideokDelete(actionKivalasztottNev, actionSelectedVram); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="Alaplap" && actionButtons==="Delete")RequestAlaplapDelete(actionKivalasztottAlaplapNev); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="Memória" && actionButtons==="Delete")RequestRamDelete(actionKivalaszottRamNev, actionSelectedRamFrekvencia); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="Processzor" && actionButtons==="Delete")RequestProcesszorDelete(actionKivalasztottProcesszorNev); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}

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
            else if(actionHardver==="Memória" && actionButtons==="Patch"){
               RequestRamPatch("", actionKivalaszottRamNev, actionSelectedRamFrekvencia, actionSelectedRamMeret);
            }
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
                     if(actionHardver==="Memória" && actionButtons==="Patch")RequestMemoriaP(data.file_name, actionKivalaszottRamNev, actionSelectedRamFrekvencia, actionSelectedRamMeret); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
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
    const [fileName, setFileName] = useState("Nincs fájl kiválasztva");

    const handleFileChange = (event) => {
      if (event.target.files.length > 0) {
         setFileName(event.target.files[0].name);
       } else {
         setFileName("Nincs fájl kiválasztva");
       }
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
                 <div className='inputok'>
                    <form id='post_form'>
                     <p id='post_titles'>Név:</p><input type='text' className='beviteli_mezok' id='VideoPost1'/><br/>                 
                     <p id='post_titles'>Alaplapi csatlakozás:</p><input type='text' className='beviteli_mezok' id='VideoPost2'/><br/>
                     <p id='post_titles'>Ajánlott tápegység:</p><input type='number' className='beviteli_mezok' id='VideoPost3'min={50} max={1800}/><br/>
                     <p id='post_titles'>Monitor csatlakozás:</p><input type='text' className='beviteli_mezok' id='VideoPost4'/><br/> 
                     <p id='post_titles'>Vram:</p><input type='number' className='beviteli_mezok' id='VideoPost5' min={1} max={48}/><br/>         
                     <p id='post_titles'>Chip  gyártója:</p><input type='text' className='beviteli_mezok' id='VideoPost6'/><br/>
     

                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/><br/>
                        <span className="filename" id='post_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button type='button' className='buttons' id='post_adatkezelogomb' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>

                  <div id='buttons_content_post'>
                     <button className='select_buttons  buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button><br/>
                     <button disabled className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")} }>Új elem hozzáadása</button><br/>
                     <button className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button><br/>
                  </div>

            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                     <p id='patch_titles'>Név:</p>
                     <div className='combobox'>
                        <select className="combi_patch" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulos_option" key={nev} value={nev}>{nev}</option>))}
                        </select>
                     </div>
                     
                     <p id='patch_titles'>Vram:</p>
                     <div className='combobox'>
                        <select className="combi_patch" onChange={(e)=>setActionSelectedVram(e.target.value)} >
                           <option id="legordulos_option" >Válassz egyet</option>
                           {actionSzurtVram.map((vram)=>(<option id="legordulos_option" value={vram} key={vram}>{vram}</option>))}
                        </select>
                     </div>
                        <button className='buttons' id='adatlekerogomb' type='button' onClick={(e)=>adatLekeres(e, actionSelectedVram, actionKivalasztottNev)}>Adatok lekérése</button>

                    <p id='patch_titles'>Alaplapi csatlakozás:</p><input type='text' id='VideokPatch1' className='patchbeviteli_mezok'/>
                    <p id='patch_titles'>Ajánlott tápegység:</p><input type='number' id='VideokPatch2' className='patchbeviteli_mezok'/>
                    <p id='patch_titles'>Monitor csatlakozás:</p><input type='text' id='VideokPatch3' className='patchbeviteli_mezok'/>
                    <p id='patch_titles'>Chip  gyártója:</p><input type='text' id='VideokPatch4' className='patchbeviteli_mezok'/>

                    <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                     <span className="filename" id='patch_img_link'>{fileName}</span>
                     <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>


                    <button className='buttons' id='patch_datkezelogomb' type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div id='contents_patch'>
                     <div id='adatok_patch'>Név: {actionMindenhezKellAdat?.Nev}</div>
                     <div id='adatok_patch'>Vram: {actionMindenhezKellAdat?.vram}</div>
                     <div id='adatok_patch'>Chip gyártója: {actionMindenhezKellAdat?.chipGyartoja}</div>
                     <div id='adatok_patch'>Ajánlott tápegység: {actionMindenhezKellAdat?.ajanlottTapegyseg}</div>
                     <div id='adatok_patch'>Alaplapi csatlakozás: {actionMindenhezKellAdat?.alaplapiCsatlakozas}</div>
                     <div id='adatok_patch'>Monitor csatlakozás: {actionMindenhezKellAdat?.monitorCsatlakozas}</div>

                 </div>

                 <div id='buttons_content_patch'>
                     <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form> 
                    <p id='titles_delete'>Név:</p>
                        <select  onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option >Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select><br/>

                     <p id="titles_delete">Vram:</p>
                        <select className="combi_delete" onChange={(e)=>setActionSelectedVram(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtVram.map((vram)=>(<option value={vram} key={vram} id="legordulos_option">{vram}</option>))}
                        </select><br/>

                        <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatLekeres(e, actionSelectedVram, actionKivalasztottNev)}>Adatok lekérése</button><br/>

                    <button className='buttons' type='button' onClick={(e)=>handleDelete(e)}>Alkatrész eltávolítása</button>
                    </form>
                 </div>

                 <div id='contents'>
                    <div id="adatok_delete">Név: {actionMindenhezKellAdat?.Nev}</div>
                    <div id="adatok_delete">Vram: {actionMindenhezKellAdat?.vram}</div>
                    <div id="adatok_delete">Chip gyártója: {actionMindenhezKellAdat?.chipGyartoja}</div>  
                    <div id="adatok_delete">Ajánlott tápegység: {actionMindenhezKellAdat?.ajanlottTapegyseg}</div>                 
                    <div id="adatok_delete">Monitor csatlakozás: {actionMindenhezKellAdat?.monitorCsatlakozas}</div> 
                    <div id="adatok_delete">Alaplapi csatlakozás: {actionMindenhezKellAdat?.alaplapiCsatlakozas}</div>
                 </div>


                  <div id='buttons_content'>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                     <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                  </div>

            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Alaplap" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                    <form id='post_form'>
                        <p id='post_titles'>Név:</p><input type="text" id='AlaplapPost1' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Processzor foglalat:</p><input type="text" id='AlaplapPost2' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Alaplap formátum:</p><input type="text" id='AlaplapPost3' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Maximum frekvencia:</p><input type="number" id='AlaplapPost4' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Memória típus:</p><input type="text" id='AlaplapPost5' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Lapkakészlet:</p><input type="text" id='AlaplapPost6' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Slot szám:</p><input type="number" id='AlaplapPost7' className='beviteli_mezok'/><br/>
                        <p id='post_titles'>Csatlakozók:</p>
                        {/*Ez egy listbox az alaplap csatlakozóinak neveivel */}
                        <select id='AlaplapPost8' multiple>
                           {[...new Set(mindenAdat['alaplapCsatlakozok'].map(i=>i.Nev))].map((nev)=>(<option value={nev} key={nev} id='csatik'>{nev}</option>))}
                        </select><br/>
                        
                        <p id='post_titles'>Hangkártya:</p>
                        <div id="radiobtn">
                        <input type="radio" id="AlaplapPost9" className='radiobtn_post' name="hgk_true" value="True" checked={actionHgkRadiobf === 'Nemjeloltradiogomb'} onChange={() => setActionHgkRadiobf('Nemjeloltradiogomb')}/>
                        <label htmlFor="AlaplapPost9">Tartalmaz hangkártyát.</label>
                        </div>

                        <div id="radiobtn">
                        <input type="radio" id="AlaplapPost10" className='radiobtn_post' name="hgk_true" value="False" checked={actionHgkRadiobf === 'Nemjeloltradiogombak'} onChange={() => setActionHgkRadiobf('Nemjeloltradiogombak')}/>
                        <label htmlFor="AlaplapPost10">Nem tartalmaz hangkártyát.</label>
                        </div>

                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/><br/>
                        <span className="filename" id='post_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button type='button' className='buttons' id='post_adatkezelogomb' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>

                 <div id='buttons_content_post'>
                     <button className='select_buttons  buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button><br/>
                     <button disabled className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")} }>Új elem hozzáadása</button><br/>
                     <button className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button><br/>
                  </div>
            </div> : <div></div>}

            {actionHardver==="Alaplap" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form>
                        <p id='patch_titles'>Név:</p>
                        <select className="combi_patch" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(
                           <option key={nev} value={nev} id="legordulos_option">{nev}</option>
                           ))}
                        </select><br/>

                        <button className='buttons' id='adatlekerogomb' type='button' onClick={(e)=>adatAlaplapLekeres(e, actionKivalasztottAlaplapNev)}>Adatok lekérése</button><br/>
                        
                        <p id='patch_titles'>Processzor foglalat:</p><input type="text" id="AlaplapPatch1" className='patchbeviteli_mezok'/><br/>
                        <p id='patch_titles'>Alaplap formátum:</p><input type="text" id="AlaplapPatch2" className='patchbeviteli_mezok'/><br/>
                        <p id='patch_titles'>Maximum frekvencia:</p><input type="number" id="AlaplapPatch3" className='patchbeviteli_mezok'/><br/>
                        <p id='patch_titles'>Memória típus:</p><input type="text" id="AlaplapPatch4" className='patchbeviteli_mezok'/><br/>
                        <p id='patch_titles'>Lapkakészlet:</p><input type="text" id="AlaplapPatch5" className='patchbeviteli_mezok'/><br/>
                        <p id='patch_titles'>Slot szám:</p><input type="number" id="AlaplapPatch6" className='patchbeviteli_mezok'/><br/>

                        <p id='patch_titles'>Hangkártya:</p>
                        <div id="radiobtn_patch">
                           <input type="radio" id="AlaplapPatch7" name="hgk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}/>
                           <label htmlFor="hgk_true">Tartalmaz hangkártyát.</label><br/>
                        </div>
                        
                        <div id="radiobtn_patch">
                           <input type="radio" id="AlaplapPatch8" name="hgk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}/>
                           <label htmlFor="hgk_false">Nem tartalmaz hangkártyát.</label>
                        </div>
                         
                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='patch_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>

                        <button className='buttons' id='patch_datkezelogomb' type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div id='contents'>
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

                    <div id='buttons_content'>
                        <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>
            </div> : <div></div>}

            {actionHardver==="Alaplap" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form>
                    <p id="titles_delete">Név:</p>
                    <select className="combi_delete" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(
                           <option key={nev} value={nev} id="legordulos_option">{nev}</option>
                           ))}
                        </select>
                        <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatAlaplapLekeres(e, actionKivalasztottAlaplapNev)}>Adatok lekérése</button><br/>

                    <button className='buttons' type='button' onClick={(e)=>handleDelete(e)}>Alkatrész eltávolítása</button>
                    </form>
                 </div>

                  <div id='contents'>
                     <div id="adatok_delete">Név:{actionMindenhezKellAdat?.Nev}</div>
                     <div id="adatok_delete">Processzor foglalat:{actionMindenhezKellAdat?.CpuFoglalat}</div>
                     <div id="adatok_delete">Alaplap formátum:{actionMindenhezKellAdat?.AlaplapFormatum}</div>
                     <div id="adatok_delete">Maximum frekvencia:{actionMindenhezKellAdat?.MaxFrekvencia}</div>
                     <div id="adatok_delete">Memória típus:{actionMindenhezKellAdat?.MemoriaTipusa}</div>
                     <div id="adatok_delete">Lapkakészlet:{actionMindenhezKellAdat?.Lapkakeszlet}</div>
                     <div id="adatok_delete">Slot szám:{actionMindenhezKellAdat?.SlotSzam}</div>
                     <div id="adatok_delete">Hangkártya:{actionMindenhezKellAdat?.Hangkartya}</div>      
                  </div>
                 <div id='buttons_content'>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                     <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                  </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Memória" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                    <form id='post_form'>
                        <p id='post_titles'>Név:</p><input type="text" id='MemoriaPost1' className='beviteli_mezok'/>
                        <p id='post_titles'>Memória típus:</p><input type="text" id='MemoriaPost2' className='beviteli_mezok'/>
                        <p id='post_titles'>Frekvencia:</p><input type="number" id='MemoriaPost3' className='beviteli_mezok'/>
                        <p id='post_titles'>Méret:</p><input type="number" id='MemoriaPost4' className='beviteli_mezok'/>
                         
                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='post_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button className='buttons' type='button'id='post_adatkezelogomb' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>

                 <div id='buttons_content_post'>
                     <button className='select_buttons  buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button><br/>
                     <button disabled className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")} }>Új elem hozzáadása</button><br/>
                     <button className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button><br/>
                  </div>
            </div> : <div></div>}

            {actionHardver==="Memória" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                        <p id='patch_titles'>Név:</p>
                        <select className="combi_patch" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>

                        <p id='patch_titles'>Frekvencia:</p>
                        <select className="combi_patch" onChange={(e)=>setActionSelectedRamFrekvencia(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulos_option">{Frekvencia}</option>))}
                        </select>


                        <p id='patch_titles'>Méret:</p>
                        <select className="combi_patch" onChange={(e)=>setActionSelectedRamMeret(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulos_option">{Meret}</option>))}
                        </select>

                        <button className='buttons' id='adatlekerogomb' type='button' onClick={(e)=>adatRamLekeres(e,actionKivalaszottRamNev,actionSelectedRamMeret,actionSelectedRamFrekvencia)}>Adatok lekérése</button><br/>
                        <p id='patch_titles'>Memória típus:<br/><input type="text" id='RamPatch1' className='patchbeviteli_mezok'/></p>    
                         
                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='patch_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>

                        <button className='buttons' id='patch_datkezelogomb'  type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button>
                    </form>
                 </div>

                 <div id='contents_patch'>
                    <div id="adatok_patch">Név:{actionMindenhezKellAdat?.Nev}</div>
                    <div id="adatok_patch">Méret:{actionMindenhezKellAdat?.Meret}</div> 
                    <div id="adatok_patch">Frekvencia:{actionMindenhezKellAdat?.Frekvencia}</div>
                    <div id="adatok_patch">Memória típus:{actionMindenhezKellAdat?.MemoriaTipus}</div>
                 </div>

                  <div id='buttons_content'>
                     <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                  </div>
                </div> : <div></div>}

            {actionHardver==="Memória" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form>
                        <p id='titles_delete'>Név:</p>
                        <select className="combi_delete" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>

                        <p id='titles_delete'>Frekvencia:</p>
                        <select className="combi_delete" onChange={(e)=>setActionSelectedRamFrekvencia(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulos_option">{Frekvencia}</option>))}
                        </select>


                        <p id='titles_delete'>Méret:</p>
                        <select className="combi_delete" onChange={(e)=>setActionSelectedRamMeret(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulos_option">{Meret}</option>))}
                        </select>

                        <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatRamLekeres(e,actionKivalaszottRamNev,actionSelectedRamMeret,actionSelectedRamFrekvencia)}>Adatok lekérése</button><br/>


                    <button className='buttons' type='button' onClick={(e)=>handleDelete(e)}>Alkatrész eltávolítása</button>
                    </form>
                 </div>
                 
                 <div id='contents'>
                    <div id='adatok_delete'>Név:{actionMindenhezKellAdat?.Nev}</div>
                    <div id='adatok_delete'>Memória típus:{actionMindenhezKellAdat?.MemoriaTipus}</div>
                    <div id='adatok_delete'>Frekvencia:{actionMindenhezKellAdat?.Frekvencia}</div>
                    <div id='adatok_delete'>Méret:{actionMindenhezKellAdat?.Meret}</div>       
                    {/* <image src=""></image>*/}
                 </div>

                    <div id='buttons_content'>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>

            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Processzor" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                     <form id='post_form'>
                        <p id='post_titles'>Név:</p><input type="text" id='ProcPost1' className='beviteli_mezok'/>
                        <p id='post_titles'>Alap frekvencia:</p><input type="number"id='ProcPost2' className='beviteli_mezok'/>
                        <p id='post_titles'>Maximum frekvencia:</p><input type="number"id='ProcPost3' className='beviteli_mezok'/> 
                        <p id='post_titles'>Alaplap foglalat:</p><input type="text"id='ProcPost4' className='beviteli_mezok'/>
                        <p id='post_titles'>Szálak száma:</p><input type="number"id='ProcPost5' className='beviteli_mezok'/>
                        <p id='post_titles'>Támogatott memória típus:</p><input type="text"id='ProcPost6' className='beviteli_mezok'/>
                        <p id='post_titles'>Processzormagok száma:</p><input type="number"id='ProcPost7' className='beviteli_mezok'/>           
                        <p id='post_titles'>Gyártó:</p><input type="text"id='ProcPost8' className='beviteli_mezok'/>
                        <p id='post_titles'>Ajánlott tápegység:</p><input type="number"id='ProcPost9' className='beviteli_mezok'/>

                        <p id='post_titles'>Integrált videókártya:</p>

                        <div id="radiobtn">
                        <input type="radio" id="ProcPost10" name="ivk_true" value="True" checked={actionIvkRadiobt==='Jeloltradiogomb'}onChange={()=>setActionIvkRadiobt('Jeloltradiogomb')}></input>
                        <label htmlFor="ProcPost11">Tartalmaz integrált videókártyát.</label><br/>
                        </div>

                        <div id="radiobtn">
                        <input type="radio" id="ProcPost11" name="ivk_true" value="False" checked={actionIvkRadiobt==='Jeloltradiogombocska'} onChange={()=>setActionIvkRadiobt('Jeloltradiogombocska')}></input>
                        <label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label>
                        </div>

                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/><br/>
                        <span className="filename" id='post_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button type='button' className='buttons' id='post_adatkezelogomb' onClick={handleUploadAndPost}>Adatok feltöltése</button>
                    </form>
                 </div>

                 <div id='buttons_content_post'>
                     <button className='select_buttons  buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button><br/>
                     <button disabled className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")} }>Új elem hozzáadása</button><br/>
                     <button className='select_buttons buttons' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button><br/>
                  </div>
            </div> : <div></div>}

            {actionHardver==="Processzor" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                            <p id='patch_titles'>Név:</p>
                            <select className="combi_patch" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                              <option  id="legordulos_option">Válassz egyet</option>
                              {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>( <option key={nev} value={nev}  id="legordulos_option">{nev}</option>))}
                           </select>

                           <button className='buttons' id='patch_datkezelogomb' type='button' onClick={(e)=>adatProcesszorLekeres(e, actionKivalasztottProcesszorNev)}>Adatok lekérése</button>

                           <p id='patch_titles'>Frekvencia:</p><input type="number" id='ProcPatch1' className='patchbeviteli_mezok'/>
                           <p id='patch_titles'>Maximum frekvencia:</p><input type="number" id='ProcPatch2' className='patchbeviteli_mezok'/>
                           <p id='patch_titles'>Alaplap foglalat:</p><input type="text" id='ProcPatch3' className='patchbeviteli_mezok'/>
                           <p id='patch_titles'>Szálak száma:</p><input type="number" id='ProcPatch4' className='patchbeviteli_mezok'/>
                           <p id='patch_titles'>Támogatott memória típus:</p><input type="text" id='ProcPatch5' className='patchbeviteli_mezok'/>
                           <p id='patch_titles'>Processzormegok száma:</p><input type="number" id='ProcPatch6' className='patchbeviteli_mezok'/>         
                           <p id='patch_titles'>Gyártó:</p><input type="text" id='ProcPatch7' className='patchbeviteli_mezok'/>
                           <p id='patch_titles'>Ajánlott tápegység:</p><input type="number" id='ProcPatch8' className='patchbeviteli_mezok'/>

                           <p id='patch_titles'>Integrált videókártya:</p>
                           <div id="radiobtn_patch">
                           <input type="radio" id="ProcPatch9" name="ivk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}></input>
                           <label htmlFor="ivk_true">Tartalmaz integrált videókártyát.</label><br/>
                           </div>
                           <div id="radiobtn_patch">
                           <input type="radio" id="ProcPatch10" name="ivk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}></input>
                           <label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label>
                            </div>

                            <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                           <span className="filename" id='patch_img_link'>{fileName}</span>
                           <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>

                           <button className='buttons' type='button' onClick={(e)=>handleUploadAndPost(e)}>Módosítások mentése</button> 
                     </form>
                 </div>

                 <div id='contents'>
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

                    <div id='buttons_content'>
                        <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                    </div>

            </div> : <div></div>}

            {actionHardver==="Processzor" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form>
                    Név:<br/>
                            <select className="combi" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                              <option>Válassz egyet</option>
                              {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(
                                 <option key={nev} value={nev}>{nev}</option>
                              ))}
                           </select><br/>

                           <button className='buttons' type='button' onClick={(e)=>adatProcesszorLekeres(e, actionKivalasztottProcesszorNev)}>Adatok lekérése</button><br/>

                     <button className='buttons' type='button' onClick={(e)=>handleDelete(e)}>Alkatrész eltávolítása</button>                
                    </form>
                 </div>

                 <div id='contents'>
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

                  <div id='contents'>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                     <button className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                     <button disabled className='buttons positions' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                 </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        </div>  
    );
  }
  
  export default UjAlkat;