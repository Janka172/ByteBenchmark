import { useState, useEffect } from 'react';
import React from 'react';
import './UjAlk.css';
function UjAlk()
{
    const[actionNavigation, setActionNavigation]=useState("Post"); 
    {/*Összes adat tárolására*/}
    const [mindenAdat,setMindenAdat]=useState({ 
        videokartyak : [],
        processzorok : [],
        alaplapok : [],
        memoriak : [],
        kategoriak:[],
        alkalmazasok: [],
        oprendszerek:[],
    })

    const fetchAdat = async () => {
        {/* A backendben lévő elérési útvonalak*/}
        const backEleresiUtvonal={
            'videokartyak': "https://localhost:44316/api/Videokartya",
            'processzorok': "https://localhost:44316/api/Processzor",
            'memoriak': "https://localhost:44316/api/Ram",
            'alaplapok': "https://localhost:44316/api/Alaplap",
            'kategoriak': "https://localhost:44316/api/Kategoria",
            'alkalmazasok': "https://localhost:44316/api/Applikacio",
            'oprendszerek': "https://localhost:44316/api/Oprendszer"
        }
        {/*A fetchAdat beolvassa az adatbázisból az adatokat backenden keresztül.*/}
        try
        {
            const adatLekeres={};
            for(var item in backEleresiUtvonal)
            {
                const response= await fetch(backEleresiUtvonal[item]);
                if (response.ok)
                {
                    const adat= await response.json();
                    adatLekeres[item]=adat;
                }
                else{throw new Error(`Hiba a ${item} lekérésekor: ${response.status}`);}           
            }
            setMindenAdat(adatLekeres)
            console.log("Frissítve mindenAdat:", adatLekeres['videokartyak']);
        } catch (error)
        {
            console.error("Hiba történt! Hiba: ", error)
        }
        
    }
    useEffect(()=>{ fetchAdat(); },[])

    const [actionMindenhezKellAdat, setActionMindenhezKellAdat] = useState(null);
    const [actionButtons, setActionButtons] =useState("Post")
    const [actionKivalasztottNev, setActionKivalasztottNev] = useState("");
    const [actionKivalasztottAlaplapNev, setActionKivalasztottAlaplapNev] = useState("");
    const [actionKivalasztottProcesszorNev, setActionKivalasztottProcesszorNev] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [actionSzurtVram, setActionSzurtVram] = useState([]);
    const [actionSelectedVram, setActionSelectedVram]=useState("");
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

    function NeFrissuljon(event){event.preventDefault()}

    const [fileName, setFileName] = useState("Nincs fájl kiválasztva");
    const handleFileChange = (event) =>
    {
      if (event.target.files.length > 0) {
         setFileName(event.target.files[0].name);
         setSelectedFile(event.target.files[0])
       } else {setFileName("Nincs fájl kiválasztva");}
    }

    const handleUploadAndPost = async (event) => {
          event.preventDefault();
    
             if (!selectedFile) {}
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
                         {/*PATCH része */}
                         
                         setFileUrl(data.file_name);
                      } else {
                         console.error("Hiba történt:", data.message);
                      }
                } catch (error) {
                      console.error("Hálózati hiba:", error);
                }
             };       
          }

    return (
        <div id='torzs'>
            <nav className='navbars'> {/*Navigációs menü*/}
                <a href='' className={actionNavigation==="Post"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post");setActionMindenhezKellAdat(null); setActionNavigation("Post")}}>Feltöltés</a>
                <a href='' className={actionNavigation==="Patch"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch");setActionMindenhezKellAdat(null); setActionNavigation("Patch")}}>Módosítás</a>
                <a href='' className={actionNavigation==="Delete"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete");setActionMindenhezKellAdat(null); setActionNavigation("Delete")}}>Eltávolítás</a>
             </nav>

             {actionButtons==="Post" ? <div id='Alk_post_torzs'>
                <div id='Felso'>
                    <div className='inputs'>
                        <form id='inputs_post'>
                            <p className='alkTitles'>Alkalmazás neve:</p><input type="text" id="alkNamePost" className='inputStyle'/>
                            <p className='alkTitles'>Alkalmazás mérete:</p><input type="number" id="alkSizePost" className='inputStyle'/>
                        </form> 
                    </div>
                    <div className='inputs'>
                        <form id='comboImage'>
                            <p className='alkTitles'>Kategória:</p>
                            <div id='combobox'>
                                <select id="comboboxCategory" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                                    <option className="comboboxAlkPost" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['kategoriak'].map(i=>i.Nev))].map((nev)=>(<option className="comboboxAlkPost" key={nev} value={nev}>{nev}</option>))}
                                </select>

                            </div>
                            <p className='alkTitles'>Kép feltöltése:</p>
                            <div className='imageUpload'>
                                <input type="file" className="elrejtes" onChange={handleFileChange}/>
                                <span className="AlkFilename" id='alkImgLinkPost'>{fileName}</span>
                            </div>
                            <label htmlFor="imginput" className="AlkImgButton" id='alkImgPost'>📁 Fájl kiválasztása</label>
                        </form>
                    </div>
                        
                </div>
                    <div id='Also'>
                        <div id='minSetup'>
                            <p className='patch_titles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMin" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedVram(e.target.value)} >
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {actionSzurtVram.map((vram)=>(<option id="legordulosOptionMin" value={vram} key={vram}>{vram}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedRamFrekvencia(e.target.value)} >
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {actionSzurtRamFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulosOptionMin">{Frekvencia}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedRamMeret(e.target.value)} >
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {actionSzurtRamMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulosOptionMin">{Meret}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                                    <option  id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>( <option key={nev} value={nev}  id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                        </div>

                        <div id='maxSetup'>
                            <p className='patch_titles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMax" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedVram(e.target.value)} >
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {actionSzurtVram.map((vram)=>(<option id="legordulosOptionMax" value={vram} key={vram}>{vram}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedRamFrekvencia(e.target.value)} >
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {actionSzurtRamFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulosOptionMax">{Frekvencia}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedRamMeret(e.target.value)} >
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {actionSzurtRamMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulosOptionMax">{Meret}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                                    <option  id="legordulosOptionMax">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>( <option key={nev} value={nev}  id="legordulosOptionMax">{nev}</option>))}
                                </select>
                           </div>
                        </div>
                    </div>
            </div> : <div></div>}
        </div>
    );
  }
  
  export default UjAlk;