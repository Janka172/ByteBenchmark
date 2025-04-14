import { useState, useEffect } from 'react';
import React from 'react';
import './UjAlk.css';
function UjAlk()
{
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
    useEffect(()=>{
        fetchAdat(); 
    },[])

    const [actionMindenhezKellAdat, setActionMindenhezKellAdat] = useState(null);
    const [actionButtons, setActionButtons] =useState("Post")
    const [actionKivalasztottNev, setActionKivalasztottNev] = useState("");

    const [actionKivalasztottAlaplapNev, setActionKivalasztottAlaplapNev] = useState("");
    const [actionKivalaszottRamNev, setActionKivalasztottRamNev]=useState("");
    const [actionKivalasztottProcesszorNev, setActionKivalasztottProcesszorNev] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");


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
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post");setActionMindenhezKellAdat(null)}}>Feltöltés</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch");setActionMindenhezKellAdat(null)}}>Módosítás</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete");setActionMindenhezKellAdat(null)}}>Eltávoltítás</a>
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
                            <p className='alkTitles'>Kategória</p>
                            <div id='combobox'>
                                <select id="comboboxCategory" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                                    <option className="comboboxAlkPost" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['kategoriak'].map(i=>i.Nev))].map((nev)=>(<option className="comboboxAlkPost" key={nev} value={nev}>{nev}</option>))}
                                </select>

                            </div>
                            <p className='alkTitles'>Kép feltöltése</p>
                            <div className='imageUpload'>
                                <input type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                                <span className="AlkFilename" id='alkImgLinkPost'>{fileName}</span>
                                <label htmlFor="imginput" className="AlkImgButton" id='alkImgPost'>📁 Fájl kiválasztása</label>
                            </div>
                        </form>
                    </div>
                        
                </div>
                    <div id='Also'>
                        <div id='minSetup'>
                            <p className='patch_titles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                                    <option id="legordulos_option" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulos_option" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                                    <option id="legordulos_option" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                                    <option id="legordulos_option">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                                    <option  id="legordulos_option">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>( <option key={nev} value={nev}  id="legordulos_option">{nev}</option>))}
                                </select>
                           </div>
                        </div>

                        <div id='maxSetup'>
                            <p className='patch_titles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(v)=>setActionKivalasztottNev(v.target.value)} value={actionKivalasztottNev}>
                                    <option id="legordulos_option" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulos_option" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(an)=>setActionKivalasztottAlaplapNev(an.target.value)} value={actionKivalasztottAlaplapNev}>
                                    <option id="legordulos_option" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(v)=>setActionKivalasztottRamNev(v.target.value)} value={actionKivalaszottRamNev}>
                                    <option id="legordulos_option">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulos_option">{nev}</option>))}
                                </select>
                            </div>

                            <p className='patch_titles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_patch" onChange={(an)=>setActionKivalasztottProcesszorNev(an.target.value)} value={actionKivalasztottProcesszorNev}>
                                    <option  id="legordulos_option">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>( <option key={nev} value={nev}  id="legordulos_option">{nev}</option>))}
                                </select>
                           </div>
                        </div>
                    </div>
            </div> : <div></div>}
        </div>
    );
  }
  
  export default UjAlk;