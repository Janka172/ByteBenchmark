import {useState, useEffect, use } from 'react';
import './UjAlkat_post.css';
import './UjAlkat_patch.css';
import './UjAlkat_delete.css';
import './UjAlkat_menu.css';
import EgyediAlert from '../Alert/egyediAlert.jsx';
import {RequestAlaplapP, RequestVideokP,RequestMemoriaP, RequestProcesszorP, RequestVideokPatch, RequestAlaplapPatch, RequestProcesszorPatch, RequestRamPatch, RequestVideokDelete, RequestAlaplapDelete, RequestProcesszorDelete, RequestRamDelete, RequseAlaplapCsatlakozo,RequestAlaplapCsatlakozodelete} from './Request';

function UjAlkat() {

   const[actionNavigation, setActionNavigation]=useState("Videókártya"); 

   {/*Összes adat tárolására*/}
   const [mindenAdat,setMindenAdat]=useState({ 
      videokartyak : [],
      processzorok : [],
      alaplapok : [],
      memoriak : [],
      alaplapCsatlakozok : [] 
   })
   const fetchAdat = async () => {
      {/* A backendben lévő elérési útvonalak*/}
      const backEleresiUtvonal={
         'videokartyak': "https://localhost:44316/api/Videokartya",
         'processzorok': "https://localhost:44316/api/Processzor",
         'memoriak': "https://localhost:44316/api/Ram",
         'alaplapok': "https://localhost:44316/api/Alaplap",
         'alaplapCsatlakozok': "https://localhost:44316/api/Csatlakozo"
      }
      {/*A fetchAdat beolvassa az adatbázisból az adatokat backenden keresztül.*/}
      try
      {
         const adatLekeres={};
         for(var item in backEleresiUtvonal)
         {const response= await fetch(backEleresiUtvonal[item]);
            if (response.ok)
            {
               const adat= await response.json();
               adatLekeres[item]=adat;
            }
            else{throw new Error(`Hiba a ${item} lekérésekor: ${response.status}`);}           
         }
         setMindenAdat(adatLekeres)
         console.log("Frissítve mindenAdat:", adatLekeres['videokartyak']);
      } catch (error){console.error("Hiba történt! Hiba: ", error)}
   }
   useEffect(()=>{ fetchAdat();},[])

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
      else{
         setActionSzurtVram([]);
         setActionSelectedVram("");
      }},[actionKivalasztottNev]);

   var datak=null;
   async function adatLekeres(event, vram, nev)
      {
         event.preventDefault();
         console.log(vram)
         console.log(nev)
         var lekertadatok=await fetch(`https://localhost:44316/api/Videokartya/0?name=${nev}&vram=${vram}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {console.error("Nem található ilyen elem az adatbázisban!");}
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
   const [actionSelectedAlaplapCsatlakozo, setActionSelectedAlaplapCsatlakozo]=useState("");
   var datak=null;
   async function adatAlaplapLekeres(event, nev)
      {
         event.preventDefault();
         console.log(nev)
         var lekertadatok=await fetch(`https://localhost:44316/api/Alaplap/0?name=${nev}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {console.error("Nem található ilyen elem az adatbázisban!");}
         }
         else
         {
            datak= await lekertadatok.json();
            setActionMindenhezKellAdat(datak);
            console.log(datak);
         }       
      }
   {/*............................................................................................................................. */}
   {/*Alaplap csatlakozó delete részéhez szükséges dolgok */}
   var datak=null;
   async function adatAlaplapCsatlakozoLekeres(event, nev,)
      {
         event.preventDefault();
         console.log(nev)
         var lekertadatok=await fetch(`https://localhost:44316/api/Alaplap_Csatlakozok/0?name=${nev}`);
         if (!lekertadatok.ok)
         {    
            if (lekertadatok.status===400) {console.error("Nem található ilyen elem az adatbázisban!");}
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
      }},[actionKivalaszottRamNev]);

   useEffect(()=>{
      if (actionSelectedRamFrekvencia)
      {
         console.log(actionKivalaszottRamNev);
         console.log(actionSelectedRamFrekvencia);
         const ramMeret=mindenAdat["memoriak"].filter((x)=>x.Nev===actionKivalaszottRamNev && x.Frekvencia==actionSelectedRamFrekvencia).map((y)=>y.Meret)
         console.log(ramMeret)
         setActionSzurtRamMeret(ramMeret);  
      }},[actionKivalaszottRamNev, actionSelectedRamFrekvencia]);

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
         if (lekertadatok.status===400) {console.error("Nem található ilyen elem az adatbázisban!");}
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
    if(actionHardver==="Videókártya" && actionButtons==="Delete") await RequestVideokDelete(actionKivalasztottNev, actionSelectedVram); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="Alaplap" && actionButtons==="Delete")await RequestAlaplapDelete(actionKivalasztottAlaplapNev); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="Memória" && actionButtons==="Delete")await RequestRamDelete(actionKivalaszottRamNev, actionSelectedRamFrekvencia,actionSelectedRamMeret); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="Processzor" && actionButtons==="Delete")await RequestProcesszorDelete(actionKivalasztottProcesszorNev); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
    if(actionHardver==="AlaplapiCsatlakozo" && actionButtons==="Delete")await RequestAlaplapCsatlakozodelete(actionKivalasztottAlaplapNev,actionSelectedAlaplapCsatlakozo); {/*Akkor történik  a küldés, amikor visszatér a fálj nevével */}
   }
   {/*............................................................................................................................. */}
   async function handleAlaplapCsatlakozo(event) {
      event.preventDefault();
      if(actionButtons==="Post")await RequseAlaplapCsatlakozo(actionKivalasztottAlaplapNev);
   }
   {/*............................................................................................................................. */}

    const handleUploadAndPost = async (event) => {
      event.preventDefault();

         if (!selectedFile) {
            //------------------------Post---------------------
            if(actionHardver==="Videókártya" && actionButtons==="Post"){RequestVideokP("GPUALTALANOS.png"); }
            else if(actionHardver==="Alaplap" && actionButtons==="Post"){RequestAlaplapP("ALAPLAPALTALANOS.png");}
            else if(actionHardver==="Memória" && actionButtons==="Post"){RequestMemoriaP("MEMORIAALTALANOS.png");}
            else if(actionHardver==="Processzor" && actionButtons==="Post"){RequestProcesszorP("PROCESSZORALTALANOS.png");}
            //----------------------Patch/Put---------------------
            if(actionHardver==="Videókártya" && actionButtons==="Patch"){RequestVideokPatch("",actionKivalasztottNev, actionSelectedVram); }
            else if(actionHardver==="Alaplap" && actionButtons==="Patch"){RequestAlaplapPatch("",actionKivalasztottAlaplapNev);}
            else if(actionHardver==="Memória" && actionButtons==="Patch"){RequestRamPatch("", actionKivalaszottRamNev, actionSelectedRamFrekvencia, actionSelectedRamMeret);}
            else if(actionHardver==="Processzor" && actionButtons==="Patch"){RequestProcesszorPatch("", actionKivalasztottProcesszorNev);}     
         }
         else if(selectedFile){
            const formData = new FormData();
            formData.append("file", selectedFile);
            try {
                  const response = await fetch("http://127.0.0.1:5000/upload", {
                     method: "POST",
                     body: formData,
                     headers: {"Accept": "application/json",},
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
                  } 
                  else {console.error("Hiba történt:", data.message);}
            } catch (error) {console.error("Hálózati hiba:", error);}
         };
      }

    const url="/IMAGE/"+fileUrl;

    function NeFrissuljon(event){event.preventDefault();}
    const [fileName, setFileName] = useState("Nincs fájl kiválasztva");

    const handleFileChange = (event) => {
      if (event.target.files.length > 0) {
         console.log(event.target.files[0].name)
         setFileName(event.target.files[0].name);
         setSelectedFile(event.target.files[0])
       } else {setFileName("Nincs fájl kiválasztva");}
    };

   //Hamburger menü
   const [menuNyitva, setMenuNyitva] = useState(false);
   const open = () => setMenuNyitva(true);
   const close = () => setMenuNyitva(false);
   const [kicsie, setKicsie] = useState(window.innerWidth <= 600);

   useEffect(() => {
      const handleResize = () => {
        setKicsie(window.innerWidth <= 600);
        if(window.innerWidth <= 600){
         close();
        }
        else {
         open();
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
    }, []);

    return (
        <div>
             <nav className='navbars' style={{ display: !menuNyitva ? 'none' : 'flex' }}> {/*Navigációs menü*/}
                <button className="menuVisszaGomb" onClick={close} style={{ display: window.innerWidth <= 600 ? 'flex' : 'none' }}>X</button>
                <a href='' className={actionNavigation==="Videókártya"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionHardver("Videókártya"); setActionButtons("Post");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva");setActionNavigation("Videókártya")}}>Videókártya</a>
                <a href='' className={actionNavigation==="Alaplap"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionHardver("Alaplap"); setActionButtons("Post");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva"); setActionNavigation("Alaplap")}}>Alaplap</a>
                <a href='' className={actionNavigation==="Memória"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionHardver("Memória"); setActionButtons("Post");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva"); setActionNavigation("Memória")}}>Memória</a>
                <a href='' className={actionNavigation==="Processzor"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionHardver("Processzor"); setActionButtons("Post");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva"); setActionNavigation("Processzor")}}>Processzor</a>
                <a href='' className={actionNavigation==="AlaplapiCsatlakozo"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionHardver("AlaplapiCsatlakozo"); setActionButtons("Post");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva"); setActionNavigation("AlaplapiCsatlakozo")}}>Alaplapi Csatlakozó</a>
             </nav>
             <div style={{ display: menuNyitva ? 'none' : 'flex' }}>
               <button className="menuGomb" onClick={open}>&#9776;</button>
             </div>

             {actionHardver==="Videókártya" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                    <form id='post_form'>
                     <p className='post_titles'>Név:</p><input type='text' className='beviteli_mezok' id='VideoPost1' placeholder='Pl. Geforce ...'/>               
                     <p className='post_titles'>Alaplapi csatlakozás:</p><input type='text' className='beviteli_mezok' id='VideoPost2' placeholder='Pl. PCIe'/>
                     <p className='post_titles'>Ajánlott tápegység:</p><input type='number' className='beviteli_mezok' id='VideoPost3' placeholder='Pl. 500'/>
                     <p className='post_titles'>Monitor csatlakozás:</p><input type='text' className='beviteli_mezok' id='VideoPost4' placeholder='Pl. HDMI, DisplayPort'/>
                     <p className='post_titles'>Vram:</p><input type='number' className='beviteli_mezok' id='VideoPost5' placeholder='Pl. 5'/>        
                     <p className='post_titles'>Chip  gyártója:</p><input type='text' className='beviteli_mezok' id='VideoPost6' placeholder='Pl. NVIDIA'/>
     
                     <p className='post_titles'>Kép feltöltése:</p>
                     <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                     <span className="filename" id='post_img_link'>{fileName}</span>
                     <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button type='button' className='buttons' id='post_adatkezelogomb' onClick={async(e)=>{handleUploadAndPost(e);await setFileName("Nincs fájl kiválasztva")}}>Adatok feltöltése</button>
                        <EgyediAlert/>
                    </form>
                 </div>

                  <div id='buttons_content_post'>
                     <div className='pagechangebutton'><button className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button disabled className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Elem törlése</button></div>
                  </div>

            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                     <p className='patch_titles'>Név:</p>
                     <div className='combobox'>
                        <select className="combi_patch" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option id="legordulos_option" value="">Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulos_option" key={nev} value={nev}>{nev}</option>))}
                        </select>
                     </div>
                     
                     <p className='patch_titles'>Vram:</p>
                     <div className='combobox'>
                        <select className="combi_patch" onChange={(e)=>setActionSelectedVram(e.target.value)} >
                           <option id="legordulos_option" value="">Válassz egyet</option>
                           {actionSzurtVram.map((vram)=>(<option id="legordulos_option" value={vram} key={vram}>{vram}</option>))}
                        </select>
                     </div>
                        <button className='buttons' id='adatlekerogomb' type='button' onClick={(e)=>adatLekeres(e, actionSelectedVram, actionKivalasztottNev)}>Adatok lekérése</button>
                        <EgyediAlert/>

                    <p className='patch_titles'>Alaplapi csatlakozás:</p><input type='text' id='VideokPatch1' className='patchbeviteli_mezok' placeholder='Pl. HDMI PCIe, stb.'/>
                    <p className='patch_titles'>Ajánlott tápegység:</p><input type='number' id='VideokPatch2' className='patchbeviteli_mezok' placeholder='Pl. 300'/>
                    <p className='patch_titles'>Monitor csatlakozás:</p><input type='text' id='VideokPatch3' className='patchbeviteli_mezok' placeholder='Pl. DVI'/>
                    <p className='patch_titles'>Chip  gyártója:</p><input type='text' id='VideokPatch4' className='patchbeviteli_mezok' placeholder='Pl. AMD'/>
                     <p className='patch_titles'>Kép feltöltése:</p>
                     <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                     <span className="filename" id='patch_img_link'>{fileName}</span>
                     <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>


                    <button className='buttons' id='patch_datkezelogomb' type='button' onClick={(e)=>{handleUploadAndPost(e);setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Módosítások mentése</button>                    
                    </form>
                 </div>

                 <div id='contents_patch'>
                     <div className='adatok_patch'>Név: {actionMindenhezKellAdat?.Nev}</div>
                     <div className='adatok_patch'>Vram: {actionMindenhezKellAdat?.vram}</div>
                     <div className='adatok_patch'>Chip gyártója: {actionMindenhezKellAdat?.chipGyartoja}</div>
                     <div className='adatok_patch'>Ajánlott tápegység: {actionMindenhezKellAdat?.ajanlottTapegyseg}</div>
                     <div className='adatok_patch'>Alaplapi csatlakozás: {actionMindenhezKellAdat?.alaplapiCsatlakozas}</div>
                     <div className='adatok_patch'>Monitor csatlakozás: {actionMindenhezKellAdat?.monitorCsatlakozas}</div>

                 </div>

                 <div id='buttons_content_patch'>
                     <div className='pagechangebutton'><button disabled className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Elem törlése</button></div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form id='delete_form'> 
                    <p className='titles_delete'>Név:</p>
                        <select  className="combi_delete" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                           <option >Válassz egyet</option>
                           {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>

                     <p className="titles_delete">Vram:</p>
                        <select className="combi_delete" onChange={(e)=>setActionSelectedVram(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtVram.map((vram)=>(<option value={vram} key={vram} id="legordulos_option">{vram}</option>))}
                        </select>

                        <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatLekeres(e, actionSelectedVram, actionKivalasztottNev)}>Adatok lekérése</button>

                    <button className='buttons' type='button' id='delete_adatkezelogomb' onClick={async(e)=>{await handleDelete(e);setActionKivalasztottNev("");await fetchAdat();setActionMindenhezKellAdat(null)}}>Alkatrész eltávolítása</button>
                    <EgyediAlert/>    
                    </form>
                 </div>

                 <div id='contents'>
                    <div className="adatok_delete">Név: {actionMindenhezKellAdat?.Nev}</div>
                    <div className="adatok_delete">Vram: {actionMindenhezKellAdat?.vram}</div>
                    <div className="adatok_delete">Chip gyártója: {actionMindenhezKellAdat?.chipGyartoja}</div>  
                    <div className="adatok_delete">Ajánlott tápegység: {actionMindenhezKellAdat?.ajanlottTapegyseg}</div>                 
                    <div className="adatok_delete">Monitor csatlakozás: {actionMindenhezKellAdat?.monitorCsatlakozas}</div> 
                    <div className="adatok_delete">Alaplapi csatlakozás: {actionMindenhezKellAdat?.alaplapiCsatlakozas}</div>
                 </div>


                  <div id='buttons_content'>
                     <div className='pagechangebutton'><button className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null)}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons ' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null)}}>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button disabled className='buttons select_buttons positions' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionKivalasztottNev("");setActionMindenhezKellAdat(null)}}>Elem törlése</button></div>
                  </div>

            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Alaplap" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                    <form id='post_form_alaplap'>
                        <p className='post_titles_alaplap'>Név:</p><input type="text" id='AlaplapPost1' className='beviteli_mezok_alaplap' placeholder='Pl. ASUS...'/>
                        <p className='post_titles_alaplap'>Processzor foglalat:</p><input type="text" id='AlaplapPost2' className='beviteli_mezok_alaplap' placeholder='Pl. AM4'/>
                        <p className='post_titles_alaplap'>Alaplap formátum:</p><input type="text" id='AlaplapPost3' className='beviteli_mezok_alaplap' placeholder='Pl. ATX'/>
                        <p className='post_titles_alaplap'>Maximum frekvencia:</p><input type="number" id='AlaplapPost4' className='beviteli_mezok_alaplap' placeholder='Pl. 2800'/>
                        <p className='post_titles_alaplap'>Memória típus:</p><input type="text" id='AlaplapPost5' className='beviteli_mezok_alaplap' placeholder='Pl. DDR4'/>
                        <p className='post_titles_alaplap'>Lapkakészlet:</p><input type="text" id='AlaplapPost6' className='beviteli_mezok_alaplap' placeholder='Pl. AMD B650'/>
                        <p className='post_titles_alaplap'>Slot szám:</p><input type="number" id='AlaplapPost7' className='beviteli_mezok_alaplap' placeholder='Pl. 4'/>
                        <p className='post_titles_alaplap'>Csatlakozók:</p>
                        {/*Ez egy listbox az alaplap csatlakozóinak neveivel */}
                        <select id='AlaplapPost8' multiple>
                           {[...new Set(mindenAdat['alaplapCsatlakozok'].map(i=>i.Nev))].map((nev)=>(<option value={nev} key={nev} id='csatik'>{nev}</option>))}
                        </select>
                        
                        <p className='post_titles_alaplap'>Hangkártya:</p>
                        <div id="radiobtn_alaplap">
                        <input type="radio" id="AlaplapPost9" className='radiobtn_post' name="hgk_true" value="True" checked={actionHgkRadiobf === 'Nemjeloltradiogomb'} onChange={() => setActionHgkRadiobf('Nemjeloltradiogomb')}/>
                        <label htmlFor="AlaplapPost9">Tartalmaz hangkártyát.</label>
                        </div>

                        <div id="radiobtn_alaplap">
                        <input type="radio" id="AlaplapPost10" className='radiobtn_post' name="hgk_true" value="False" checked={actionHgkRadiobf === 'Nemjeloltradiogombak'} onChange={() => setActionHgkRadiobf('Nemjeloltradiogombak')}/>
                        <label htmlFor="AlaplapPost10">Nem tartalmaz hangkártyát.</label>
                        </div>
                        <p className='post_titles_alaplap'>Kép feltöltése:</p>
                        <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='post_img_link_alaplap'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img_alaplap'>📁 Fájl kiválasztása</label>

                        <button type='button' className='buttons' id='post_adatkezelogomb_alaplap' onClick={async(e)=>{handleUploadAndPost(e);await setFileName("Nincs fájl kiválasztva")}}>Adatok feltöltése</button>
                        <EgyediAlert/>
                    </form>
                 </div>

                 <div id='buttons_content_post_alaplap'>
                     <div className='pagechangebutton'><button className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button disabled className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setFileName("Nincs fájl kiválasztva")} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem törlése</button></div>
                  </div>
            </div> : <div></div>}

            {actionHardver==="Alaplap" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                        <p className='patch_titles'>Név:</p>
                        <select className="combi_patch" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option id="legordulos_option" value="">Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>

                        <button className='buttons' id='adatlekerogomb' type='button' onClick={(e)=>adatAlaplapLekeres(e, actionKivalasztottAlaplapNev)}>Adatok lekérése</button>
                        
                        <p className='patch_titles'>Processzor foglalat:</p><input type="text" id="AlaplapPatch1" className='patchbeviteli_mezok' placeholder='Pl. AM4'/>
                        <p className='patch_titles'>Alaplap formátum:</p><input type="text" id="AlaplapPatch2" className='patchbeviteli_mezok' placeholder='Pl. ATX'/>
                        <p className='patch_titles'>Maximum frekvencia:</p><input type="number" id="AlaplapPatch3" className='patchbeviteli_mezok' placeholder='Pl. 2800'/>
                        <p className='patch_titles'>Memória típus:</p><input type="text" id="AlaplapPatch4" className='patchbeviteli_mezok' placeholder='Pl. DDR4'/>
                        <p className='patch_titles'>Lapkakészlet:</p><input type="text" id="AlaplapPatch5" className='patchbeviteli_mezok' placeholder='Pl. AMD B650'/>
                        <p className='patch_titles'>Slot szám:</p><input type="number" id="AlaplapPatch6" className='patchbeviteli_mezok' placeholder='Pl. 4'/>

                        <p className='patch_titles'>Hangkártya:</p>
                           <div id="radiobtn_patch">
                           <input type="radio" id="AlaplapPatch7" name="ivk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}></input>
                           <label htmlFor="ivk_true">Tartalmaz hangkártyát.</label>
                           </div>
                           <div id="radiobtn_patch">
                           <input type="radio" iid="AlaplapPatch8" name="ivk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}></input>
                           <label htmlFor="ivk_false">Nem tartalmaz hangkártyát.</label>
                            </div>
                            <p className='patch_titles'>Kép feltöltése:</p>
                            <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                           <span className="filename" id='patch_img_link'>{fileName}</span>
                           <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>

                        <button className='buttons' id='patch_datkezelogomb' type='button' onClick={(e)=>{handleUploadAndPost(e);setActionKivalasztottAlaplapNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Módosítások mentése</button>
                        <EgyediAlert/>

                    </form>
                 </div>

                 <div id='contents_patch'>
                    <div className='adatok_patch'>Név:{actionMindenhezKellAdat?.Nev}</div>
                    <div className='adatok_patch'>Slot szám:{actionMindenhezKellAdat?.SlotSzam}</div>
                    <div className='adatok_patch'>Hangkártya:{actionMindenhezKellAdat?.Hangkartya? "van":"nincs"}</div>   
                    <div className='adatok_patch'>Lapkakészlet:{actionMindenhezKellAdat?.Lapkakeszlet}</div>
                    <div className='adatok_patch'>Memória típus:{actionMindenhezKellAdat?.MemoriaTipusa}</div>
                    <div className='adatok_patch'>Alaplap formátum:{actionMindenhezKellAdat?.AlaplapFormatum}</div>
                    <div className='adatok_patch'>Processzor foglalat:{actionMindenhezKellAdat?.CpuFoglalat}</div>
                    <div className='adatok_patch'>Maximum frekvencia:{actionMindenhezKellAdat?.MaxFrekvencia}</div>
   
                 </div>

                    <div id='buttons_content_patch'>
                        <div className='pagechangebutton'><button disabled className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem adatainak frissítése</button></div>
                        <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setFileName("Nincs fájl kiválasztva")} }>Új elem hozzáadása</button></div>
                        <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem törlése</button></div>
                    </div>
            </div> : <div></div>}

            {actionHardver==="Alaplap" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form id='delete_form'>
                    <p className="titles_delete">Név:</p>
                    <select className="combi_delete" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>
                        <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatAlaplapLekeres(e, actionKivalasztottAlaplapNev)}>Adatok lekérése</button>

                    <button className='buttons' type='button' id='delete_adatkezelogomb' onClick={async(e)=>{await handleDelete(e);await fetchAdat();setActionKivalasztottAlaplapNev("");setActionMindenhezKellAdat(null)}}>Alkatrész eltávolítása</button>
                    <EgyediAlert/>    
                    </form>
                 </div>

                  <div id='contents'>
                     <div className="adatok_delete">Név:{actionMindenhezKellAdat?.Nev}</div>
                     <div className="adatok_delete">Processzor foglalat:{actionMindenhezKellAdat?.CpuFoglalat}</div>
                     <div className="adatok_delete">Alaplap formátum:{actionMindenhezKellAdat?.AlaplapFormatum}</div>
                     <div className="adatok_delete">Maximum frekvencia:{actionMindenhezKellAdat?.MaxFrekvencia}</div>
                     <div className="adatok_delete">Memória típus:{actionMindenhezKellAdat?.MemoriaTipusa}</div>
                     <div className="adatok_delete">Lapkakészlet:{actionMindenhezKellAdat?.Lapkakeszlet}</div>
                     <div className="adatok_delete">Slot szám:{actionMindenhezKellAdat?.SlotSzam}</div>
                     <div className="adatok_delete">Hangkártya:{actionMindenhezKellAdat?.Hangkartya? "van":"nincs"}</div>      
                  </div>
                 <div id='buttons_content'>
                     <div className='pagechangebutton'><button className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat()}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat()} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button disabled className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat()}}>Elem törlése</button></div>
                  </div>
            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Memória" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                    <form id='post_form'>
                        <p className='post_titles'>Név:</p><input type="text" id='MemoriaPost1' className='beviteli_mezok' placeholder='Pl. Kingston FURY...'/>
                        <p className='post_titles'>Memória típus:</p><input type="text" id='MemoriaPost2' className='beviteli_mezok' placeholder='Pl. DDR5'/>
                        <p className='post_titles'>Frekvencia:</p><input type="number" id='MemoriaPost3' className='beviteli_mezok' placeholder='Pl. 1600'/>
                        <p className='post_titles'>Méret:</p><input type="number" id='MemoriaPost4' className='beviteli_mezok' placeholder='Pl. 16'/>
                        <p className='post_titles'>Kép feltöltése:</p>
                        <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='post_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button className='buttons' type='button'id='post_adatkezelogomb' onClick={async(e)=>{handleUploadAndPost(e);setFileName("Nincs fájl kiválasztva")}}>Adatok feltöltése</button>
                        <EgyediAlert/>
                    </form>
                 </div>

                 <div id='buttons_content_post'>
                     <div className='pagechangebutton'><button className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button disabled className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setFileName("Nincs fájl kiválasztva")} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem törlése</button></div>
                  </div>
            </div> : <div></div>}

            {actionHardver==="Memória" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                        <p className='patch_titles'>Név:</p>
                        <select className="combi_patch" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>

                        <p className='patch_titles'>Frekvencia:</p>
                        <select className="combi_patch" onChange={(e)=>setActionSelectedRamFrekvencia(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulos_option">{Frekvencia}</option>))}
                        </select>


                        <p className='patch_titles'>Méret:</p>
                        <select className="combi_patch" onChange={(e)=>setActionSelectedRamMeret(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulos_option">{Meret}</option>))}
                        </select>

                        <button className='buttons' id='adatlekerogomb' type='button' onClick={(e)=>adatRamLekeres(e,actionKivalaszottRamNev,actionSelectedRamMeret,actionSelectedRamFrekvencia)}>Adatok lekérése</button>
                        <p className='patch_titles'>Memória típus:</p> <input type="text" id='RamPatch1' className='patchbeviteli_mezok' placeholder='Pl. DDR5'/>   
                        <p className='patch_titles'>Kép feltöltése:</p>
                        <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='patch_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>

                        <button className='buttons' id='patch_datkezelogomb'  type='button' onClick={(e)=>{handleUploadAndPost(e);setActionKivalasztottRamNev("");setActionMindenhezKellAdat(null);setActionSzurtRamFrekvencia([]);setFileName("Nincs fájl kiválasztva")}}>Módosítások mentése</button>
                        <EgyediAlert/>
                        
                    </form>
                 </div>

                 <div id='contents_patch'>
                    <div className="adatok_patch">Név:{actionMindenhezKellAdat?.Nev}</div>
                    <div className="adatok_patch">Méret:{actionMindenhezKellAdat?.Meret}</div> 
                    <div className="adatok_patch">Frekvencia:{actionMindenhezKellAdat?.Frekvencia}</div>
                    <div className="adatok_patch">Memória típus:{actionMindenhezKellAdat?.MemoriaTipus}</div>
                 </div>

                  <div id='buttons_content_patch'>
                     <div className='pagechangebutton'><button disabled className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setFileName("Nincs fájl kiválasztva")} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setFileName("Nincs fájl kiválasztva")}}>Elem törlése</button></div>
                  </div>
                </div> : <div></div>}

            {actionHardver==="Memória" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form id='delete_form'>
                        <p className='titles_delete'>Név:</p>
                        <select className="combi_delete" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                           <option id="legordulos_option">Válassz egyet</option>
                           {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>

                        <p className='titles_delete'>Frekvencia:</p>
                        <select className="combi_delete" onChange={(e)=>setActionSelectedRamFrekvencia(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulos_option">{Frekvencia}</option>))}
                        </select>

                        <p className='titles_delete'>Méret:</p>
                        <select className="combi_delete" onChange={(e)=>setActionSelectedRamMeret(e.target.value)} >
                           <option id="legordulos_option">Válassz egyet</option>
                           {actionSzurtRamMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulos_option">{Meret}</option>))}
                        </select>

                        <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatRamLekeres(e,actionKivalaszottRamNev,actionSelectedRamMeret,actionSelectedRamFrekvencia)}>Adatok lekérése</button>
                        <button className='buttons' type='button' id='delete_adatkezelogomb'  onClick={async(e)=>{await handleDelete(e);await fetchAdat();setActionKivalasztottRamNev("");setActionMindenhezKellAdat(null);setActionSzurtRamFrekvencia([])}}>Alkatrész eltávolítása</button>
                        <EgyediAlert/>   
                    </form>
                 </div>
                 
                 <div id='contents'>
                    <div className='adatok_delete'>Név:{actionMindenhezKellAdat?.Nev}</div>
                    <div className='adatok_delete'>Memória típus:{actionMindenhezKellAdat?.MemoriaTipus}</div>
                    <div className='adatok_delete'>Frekvencia:{actionMindenhezKellAdat?.Frekvencia}</div>
                    <div className='adatok_delete'>Méret:{actionMindenhezKellAdat?.Meret}</div>       
                 </div>

                    <div id='buttons_content'>
                        <div className='pagechangebutton'><button className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat()}}>Elem adatainak frissítése</button></div>
                        <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat()} }>Új elem hozzáadása</button></div>
                        <div className='pagechangebutton'><button disabled className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat()}}>Elem törlése</button></div>
                    </div>

            </div> : <div></div>}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="Processzor" && actionButtons==="Post" ? <div className='body'>
                 <div className='inputok'>
                     <form id='post_form'>
                        <p className='post_titles'>Név:</p><input type="text" id='ProcPost1' className='beviteli_mezok' placeholder='Pl. AMD Ryzen...'/>
                        <p className='post_titles'>Alap frekvencia:</p><input type="number"id='ProcPost2' className='beviteli_mezok' placeholder='Pl. 3.5'/>
                        <p className='post_titles'>Maximum frekvencia:</p><input type="number"id='ProcPost3' className='beviteli_mezok' placeholder='Pl. 4.0'/> 
                        <p className='post_titles'>Alaplap foglalat:</p><input type="text"id='ProcPost4' className='beviteli_mezok' placeholder='Pl. AM4'/>
                        <p className='post_titles'>Szálak száma:</p><input type="number"id='ProcPost5' className='beviteli_mezok' placeholder='Pl. 4'/>
                        <p className='post_titles'>Támogatott memória típus:</p><input type="text"id='ProcPost6' className='beviteli_mezok' placeholder='Pl. DDR4'/>
                        <p className='post_titles'>Processzormagok száma:</p><input type="number"id='ProcPost7' className='beviteli_mezok' placeholder='Pl. 4'/>           
                        <p className='post_titles'>Gyártó:</p><input type="text"id='ProcPost8' className='beviteli_mezok' placeholder='Pl. AMD'/>
                        <p className='post_titles'>Ajánlott tápegység:</p><input type="number"id='ProcPost9' className='beviteli_mezok' placeholder='Pl. 65'/>

                        <p className='post_titles'>Integrált videókártya:</p>

                        <div id="radiobtn">
                        <input type="radio" id="ProcPost10" name="ivk_true" value="True" checked={actionIvkRadiobt==='Jeloltradiogomb'}onChange={()=>setActionIvkRadiobt('Jeloltradiogomb')}></input>
                        <label htmlFor="ProcPost10">Tartalmaz integrált videókártyát.</label>
                        </div>

                        <div id="radiobtn">
                        <input type="radio" id="ProcPost11" name="ivk_true" value="False" checked={actionIvkRadiobt==='Jeloltradiogombocska'} onChange={()=>setActionIvkRadiobt('Jeloltradiogombocska')}></input>
                        <label htmlFor="ProcPost11">Nem tartalmaz integrált videókártyát.</label>
                        </div>
                        <p className='post_titles'>Kép feltöltése:</p>
                        <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                        <span className="filename" id='post_img_link'>{fileName}</span>
                        <label htmlFor="imginput" className="imgbutton" id='post_img'>📁 Fájl kiválasztása</label>

                        <button type='button' className='buttons' id='post_adatkezelogomb' onClick={async(e)=>{handleUploadAndPost(e);setFileName("Nincs fájl kiválasztva")}}>Adatok feltöltése</button>
                        <EgyediAlert/>
                    </form>
                 </div>

                 <div id='buttons_content_post'>
                     <div className='pagechangebutton'><button className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setFileName("Nincs fájl kiválasztva");setActionMindenhezKellAdat(null)}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button disabled className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setFileName("Nincs fájl kiválasztva");setActionMindenhezKellAdat(null)} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setFileName("Nincs fájl kiválasztva");setActionMindenhezKellAdat(null)}}>Elem törlése</button></div>
                  </div>
            </div> : <div></div>}

            {actionHardver==="Processzor" && actionButtons==="Patch" ? <div className='body'>
                 <div className='inputok'>
                    <form id='patch_form'>
                            <p className='patch_titles'>Név:</p>
                            <select className="combi_patch" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                              <option  id="legordulos_option">Válassz egyet</option>
                              {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>( <option key={nev} value={nev}  id="legordulos_option">{nev}</option>))}
                           </select>

                           <button className='buttons' id='adatlekerogomb'  type='button' onClick={(e)=>adatProcesszorLekeres(e, actionKivalasztottProcesszorNev)}>Adatok lekérése</button>

                           <p className='patch_titles'>Frekvencia:</p><input type="number" id='ProcPatch1' className='patchbeviteli_mezok' placeholder='Pl. 3.5'/>
                           <p className='patch_titles'>Maximum frekvencia:</p><input type="number" id='ProcPatch2' className='patchbeviteli_mezok' placeholder='Pl. 4.0'/>
                           <p className='patch_titles'>Alaplap foglalat:</p><input type="text" id='ProcPatch3' className='patchbeviteli_mezok' placeholder='Pl. AM4'/>
                           <p className='patch_titles'>Szálak száma:</p><input type="number" id='ProcPatch4' className='patchbeviteli_mezok' placeholder='Pl. 4'/>
                           <p className='patch_titles'>Támogatott memória típus:</p><input type="text" id='ProcPatch5' className='patchbeviteli_mezok' placeholder='Pl. DDR4'/>
                           <p className='patch_titles'>Processzormegok száma:</p><input type="number" id='ProcPatch6' className='patchbeviteli_mezok' placeholder='Pl. 4'/>         
                           <p className='patch_titles'>Gyártó:</p><input type="text" id='ProcPatch7' className='patchbeviteli_mezok' placeholder='Pl. AMD'/>
                           <p className='patch_titles'>Ajánlott tápegység:</p><input type="number" id='ProcPatch8' className='patchbeviteli_mezok' placeholder='Pl. 65'/>

                           <p className='patch_titles'>Integrált videókártya:</p>
                           <div id="radiobtn_patch">
                           <input type="radio" id="ProcPatch9" name="ivk_true" value="True" checked={actionHgkRadiobf==='Nemjeloltradiogomb'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogomb')}></input>
                           <label htmlFor="ivk_true">Tartalmaz integrált videókártyát.</label>
                           </div>
                           <div id="radiobtn_patch">
                           <input type="radio" id="ProcPatch10" name="ivk_true" value="False" checked={actionHgkRadiobf==='Nemjeloltradiogombak'} onChange={()=>setActionHgkRadiobf('Nemjeloltradiogombak')}></input>
                           <label htmlFor="ivk_false">Nem tartalmaz integrált videókártyát.</label>
                            </div>
                            <p className='patch_titles'>Kép feltöltése:</p>
                            <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                           <span className="filename" id='patch_img_link'>{fileName}</span>
                           <label htmlFor="imginput" className="imgbutton" id='patch_img'>📁 Fájl kiválasztása</label>

                           <button className='buttons'  id='patch_datkezelogomb' type='button' onClick={(e)=>{handleUploadAndPost(e);setActionKivalasztottProcesszorNev("");setActionMindenhezKellAdat(null);setFileName("Nincs fájl kiválasztva")}}>Módosítások mentése</button>
                           <EgyediAlert/>

                     </form>
                 </div>

                 <div id='contents_patch'>
                 <div className='adatok_patch'>Név:{actionMindenhezKellAdat?.Nev}</div>
                 <div className='adatok_patch'>Gyártó:{actionMindenhezKellAdat?.Gyarto}</div>
                 <div className='adatok_patch'>Frekvencia:{actionMindenhezKellAdat?.ProcesszorFrekvencia}</div>
                 <div className='adatok_patch'>Szálak száma:{actionMindenhezKellAdat?.SzalakSzama}</div>
                 <div className='adatok_patch'>Alaplap foglalat:{actionMindenhezKellAdat?.AlaplapFoglalat}</div>
                 <div className='adatok_patch'>Ajánlott tápegység:{actionMindenhezKellAdat?.AjanlottTapegyseg}</div>
                 <div className='adatok_patch'>Maximum frekvencia:{actionMindenhezKellAdat?.BProcesszorFrekvencia}</div> 
                 <div className='adatok_patch'>Processzormegok száma:{actionMindenhezKellAdat?.ProcesszormagokSzama}</div> 
                 <div className='adatok_patch'>Támogatott memória típus:{actionMindenhezKellAdat?.TamogatottMemoriatipus}</div>
                 <div className='adatok_patch'>Integrált videókártya:{actionMindenhezKellAdat?.IntegraltVideokartya?"van":"nincs"}</div>
                 </div>

                    <div id='buttons_content_patch'>
                        <div className='pagechangebutton'><button disabled className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setActionMindenhezKellAdat(null)}}>Elem adatainak frissítése</button></div>
                        <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionMindenhezKellAdat(null)} }>Új elem hozzáadása</button></div>
                        <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionMindenhezKellAdat(null)}}>Elem törlése</button></div>
                    </div>

            </div> : <div></div>}

            {actionHardver==="Processzor" && actionButtons==="Delete" ? <div className='body'>
                 <div className='inputok'>
                    <form id='delete_form'>
                    <p className='titles_delete'>Név:</p>
                            <select className="combi_delete" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                              <option id="legordulos_option" >Válassz egyet</option>
                              {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                           </select>

                     <button className='buttons' id='delete_adatlekerogomb' type='button' onClick={(e)=>adatProcesszorLekeres(e, actionKivalasztottProcesszorNev)}>Adatok lekérése</button>

                     <button className='buttons' id='delete_adatkezelogomb' type='button' onClick={async(e)=>{await handleDelete(e);await fetchAdat();setActionKivalasztottProcesszorNev("");setActionMindenhezKellAdat(null)}}>Alkatrész eltávolítása</button>
                     <EgyediAlert/>               
                    </form>
                 </div>

                 <div id='contents'>
                 <div className='adatok_delete'>Név:{actionMindenhezKellAdat?.Nev}</div>
                 <div className='adatok_delete'>Frekvencia:{actionMindenhezKellAdat?.ProcesszorFrekvencia}</div>
                 <div className='adatok_delete'>Maximum frekvencia:{actionMindenhezKellAdat?.BProcesszorFrekvencia}</div>
                 <div className='adatok_delete'>Alaplap foglalat:{actionMindenhezKellAdat?.AlaplapFoglalat}</div>
                 <div className='adatok_delete'>Szálak száma:{actionMindenhezKellAdat?.SzalakSzama}</div>
                 <div className='adatok_delete'>Támogatott memória típus:{actionMindenhezKellAdat?.TamogatottMemoriatipus}</div>
                 <div className='adatok_delete'>Processzormegok száma:{actionMindenhezKellAdat?.ProcesszormagokSzama}</div>
                 <div className='adatok_delete'>Gyártó:{actionMindenhezKellAdat?.Gyarto}</div>
                 <div className='adatok_delete'>Ajánlott tápegység:{actionMindenhezKellAdat?.AjanlottTapegyseg}</div>
                 <div className='adatok_delete'>Integrált videókártya:{actionMindenhezKellAdat?.IntegraltVideokartya? "van":"nincs"}</div>
                 </div>

                  <div id='buttons_content'>
                     <div className='pagechangebutton'><button className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Patch");await fetchAdat();setActionMindenhezKellAdat(null)}}>Elem adatainak frissítése</button></div>
                     <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionMindenhezKellAdat(null)} }>Új elem hozzáadása</button></div>
                     <div className='pagechangebutton'><button disabled className='buttons select_buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionMindenhezKellAdat(null)}}>Elem törlése</button></div>
                 </div>
            </div> : <div></div>}

            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {actionHardver==="AlaplapiCsatlakozo" && actionButtons==="Post" ? <div className='body torzscsati'>
                   <div className='inputok'>
                     <form id='post_form_csati'>
                        <p className='post_titles_csati'>Alaplap neve:</p>
                        <select className="combi_csati" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option id="legordulos_option_csati" value="">Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>
                        <p className='post_titles_csati'>Csatlakozók:</p>
                        <select id='csati' multiple>
                           {[...new Set(mindenAdat['alaplapCsatlakozok'].map(i=>i.Nev))].map((nev)=>(<option value={nev} key={nev} id='csatik'>{nev}</option>))}
                        </select>
                        <button type='button' className='buttons' id='post_adatkezelogomb_csati' onClick={async(e)=>{handleAlaplapCsatlakozo(e);setActionKivalasztottAlaplapNev("");}}>Adatok feltöltése</button>
                        <EgyediAlert/>
                    </form>
                   </div>
                   <div id='buttons_content_csati'>
                        <div className='pagechangebutton'><button disabled className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionKivalasztottAlaplapNev("");}}>Új csatlakozó hozzáadása</button></div>
                        <div className='pagechangebutton'><button className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionKivalasztottAlaplapNev("");} }>Csatlakozó törlése</button></div>
                   </div>
            </div> : <div></div>}

            {actionHardver==="AlaplapiCsatlakozo" && actionButtons==="Delete" ? <div className='body torzscsati'>
                   <div className='inputok'>
                     <form id='delete_form_csati'>
                        <p className='delete_titles_csati'>Alaplap neve:</p>
                        <select className="combi_delete_csati" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                           <option id="legordulos_option_csati" >Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                        </select>
                        <button className='buttons' id='delete_adatlekerogomb_csati' type='button' onClick={(e)=>adatAlaplapCsatlakozoLekeres(e, actionKivalasztottAlaplapNev)}>Adatok lekérése</button>
                        <p className='delete_titles_csati'>Csatlakozók:</p>
                        <select className='combi_delete_csati' onChange={(an=>setActionSelectedAlaplapCsatlakozo(an.target.value))} value={actionSelectedAlaplapCsatlakozo}>
                           <option id="legordulos_option_csati" >Válassz egyet</option>
                           {[...new Set(mindenAdat['alaplapCsatlakozok'].map(i=>i.Nev))].map((nev)=>(<option value={nev} key={nev} id='csatik'>{nev}</option>))}
                        </select>
                        <button type='button' className='buttons' id='delete_adatkezelogomb_csati' onClick={async(e)=>{await handleDelete(e);await fetchAdat();setActionKivalasztottAlaplapNev("");setActionSelectedAlaplapCsatlakozo("");setActionMindenhezKellAdat(null)}}>Kiválasztott adat törlése</button>
                        <EgyediAlert/>
                    </form>
                   </div>

                  <div id='contentsCsati'>
                     <div className='adatok_delete'>Név: {actionKivalasztottAlaplapNev}</div>
                     {actionMindenhezKellAdat && actionMindenhezKellAdat.length > 0 ? (
                        <>
                           {actionMindenhezKellAdat.map(csatlakozo => (<div className='adatok_delete'>Csatlakozó neve: {csatlakozo.CsatlakozoNev}</div>))}
                        </>
                     ) : (<div className='adatok_delete'>Csatlakozó neve:</div>)}
                  </div>
                   <div id='buttons_content_csati_delete'>
                        <div className='pagechangebutton'><button className='select_buttons  buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Post");await fetchAdat();setActionKivalasztottAlaplapNev("");}}>Új csatlakozó hozzáadása</button></div>
                        <div className='pagechangebutton'><button disabled className='select_buttons buttons' onClick={async(event)=>{NeFrissuljon(event); setActionButtons("Delete");await fetchAdat();setActionKivalasztottAlaplapNev("");} }>Csatlakozó törlése</button></div>
                   </div>
            </div> : <div></div>}  
            </div>
    );
  }
  export default UjAlkat;