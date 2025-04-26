import { useState, useEffect } from 'react';
import React from 'react';
import './UjAlk.css';
import EgyediAlert from '../Alert/egyediAlert.jsx';
import {Ellenorzes,PatchEllenorzes,DeleteEllenorzes} from "./AlkalmazasRequest.js";
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
    const [actionKivalasztottCategoria, setActionKivalasztottCategoria] = useState("");
    const [actionKivalasztottNev, setActionKivalasztottNev] = useState({
        minimumNev: "",
        maximumNev: ""
    });
    const [actionKivalasztottAlaplapNev, setActionKivalasztottAlaplapNev] = useState({
        minimumAlapNev: "",
        maximumAlapNev: ""
    });
    const [actionKivalasztottProcesszorNev, setActionKivalasztottProcesszorNev] = useState({
        minimumProcesszorNev: "",
        maximumProcesszorNev: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [actionSzurtVram, setActionSzurtVram] = useState({
        minimumVram: [],
        maximumVram: []
    });
    const [actionSelectedVram, setActionSelectedVram]=useState({
        minimumVram: "",
        maximumVram: ""
    });
    const [actionKivalaszottRamNev, setActionKivalasztottRamNev]=useState({
        minimumRamNev: "",
        maximumRamNev: ""
    });
    const [actionSzurtRamMeret, setActionSzurtRamMeret]=useState({
        minimumMeret: [],
        maximumMeret: []
    });
    const [actionSelectedRamMeret, setActionSelectedRamMeret]=useState({
        minimumMeret: "",
        maximumMeret: ""
    });
    const [actionSzurtRamFrekvencia, setActionSzurtRamFrekvencia]=useState({
        minimumFrekvencia: [],
        maximumFrekvencia: []
    });
    const [actionSelectedRamFrekvencia, setActionSelectedRamFrekvencia]=useState({
        minimumFrekvencia: "",
        maximumFrekvencia: ""
    });
    const [actionOprendszer, setActionOprendszer]=useState({
        minimumOprendszer: "",
        maximumOprendszer: ""
    });
    const [actionAlkalmazasNev, setActionAlkalmazasNev]=useState("");
    useEffect(()=>{
       if (actionKivalaszottRamNev.minimumRamNev)
       {
          const ramFrekvencia=[...new Set(mindenAdat['memoriak'].filter((i)=>i.Nev===actionKivalaszottRamNev.minimumRamNev).map((i)=>i.Frekvencia))];
          setActionSzurtRamFrekvencia(prev => ({...prev, minimumFrekvencia: ramFrekvencia}));
       } else {
          setActionSzurtRamFrekvencia(prev => ({...prev, minimumFrekvencia: []}));
          setActionSelectedRamFrekvencia(prev => ({...prev, minimumFrekvencia: ""}));
       }
    },[actionKivalaszottRamNev.minimumRamNev, mindenAdat]);

    useEffect(()=>{
       if (actionKivalaszottRamNev.maximumRamNev)
       {
          const ramFrekvencia=[...new Set(mindenAdat['memoriak'].filter((i)=>i.Nev===actionKivalaszottRamNev.maximumRamNev).map((i)=>i.Frekvencia))];
          setActionSzurtRamFrekvencia(prev => ({...prev, maximumFrekvencia: ramFrekvencia}));
       } else {
          setActionSzurtRamFrekvencia(prev => ({...prev, maximumFrekvencia: []}));
          setActionSelectedRamFrekvencia(prev => ({...prev, maximumFrekvencia: ""}));
       }
    },[actionKivalaszottRamNev.maximumRamNev, mindenAdat]);
 
    useEffect(()=>{
       if (actionKivalaszottRamNev.minimumRamNev && actionSelectedRamFrekvencia.minimumFrekvencia)
       {
          console.log(actionKivalaszottRamNev.minimumRamNev);
          console.log(actionSelectedRamFrekvencia.minimumFrekvencia);
          const ramMeret=mindenAdat["memoriak"].filter((x)=>x.Nev===actionKivalaszottRamNev.minimumRamNev && x.Frekvencia==actionSelectedRamFrekvencia.minimumFrekvencia).map((y)=>y.Meret);
          console.log(ramMeret);
          setActionSzurtRamMeret(prev => ({...prev, minimumMeret: ramMeret}));  
       } else {
          setActionSzurtRamMeret(prev => ({...prev, minimumMeret: []}));
          setActionSelectedRamMeret(prev => ({...prev, minimumMeret: ""}));
       }
    },[actionKivalaszottRamNev.minimumRamNev, actionSelectedRamFrekvencia.minimumFrekvencia, mindenAdat]);

    useEffect(()=>{
       if (actionKivalaszottRamNev.maximumRamNev && actionSelectedRamFrekvencia.maximumFrekvencia)
       {
          console.log(actionKivalaszottRamNev.maximumRamNev);
          console.log(actionSelectedRamFrekvencia.maximumFrekvencia);
          const ramMeret=mindenAdat["memoriak"].filter((x)=>x.Nev===actionKivalaszottRamNev.maximumRamNev && x.Frekvencia==actionSelectedRamFrekvencia.maximumFrekvencia).map((y)=>y.Meret);
          console.log(ramMeret);
          setActionSzurtRamMeret(elozoAllapot => ({...elozoAllapot, maximumMeret: ramMeret}));  
       } else {
          setActionSzurtRamMeret(prev => ({...prev, maximumMeret: []}));
          setActionSelectedRamMeret(prev => ({...prev, maximumMeret: ""}));
       }
    },[actionKivalaszottRamNev.maximumRamNev, actionSelectedRamFrekvencia.maximumFrekvencia, mindenAdat]);

    useEffect(()=>{
       if (actionKivalasztottNev.minimumNev)
       {
          const vramok=mindenAdat['videokartyak'].filter((i)=>i.Nev===actionKivalasztottNev.minimumNev).map((i)=>i.vram);
          setActionSzurtVram(elozoAllapot => ({...elozoAllapot, minimumVram: vramok}));
       } else {
          setActionSzurtVram(elozoAllapot => ({...elozoAllapot, minimumVram: []}));
          setActionSelectedVram(elozoAllapot => ({...elozoAllapot, minimumVram: ""}));
       }
    },[actionKivalasztottNev.minimumNev, mindenAdat]);

    useEffect(()=>{
       if (actionKivalasztottNev.maximumNev)
       {
          const vramok=mindenAdat['videokartyak'].filter((i)=>i.Nev===actionKivalasztottNev.maximumNev).map((i)=>i.vram);
          setActionSzurtVram(elozoAllapot => ({...elozoAllapot, maximumVram: vramok}));
       } else {
          setActionSzurtVram(elozoAllapot => ({...elozoAllapot, maximumVram: []}));
          setActionSelectedVram(elozoAllapot => ({...elozoAllapot, maximumVram: ""}));
       }
    },[actionKivalasztottNev.maximumNev, mindenAdat]);

    useEffect(() => {
        const fetchAlkalmazasAdat = async () => {
            if (actionAlkalmazasNev) {
                try {
                    // Fetch application data
                    const response = await fetch(`https://localhost:44316/api/Applikacio/0?name=${actionAlkalmazasNev}`);
                    if (!response.ok) {
                        console.error("Hiba:", response.status);
                        return;
                    }
                    const alkAdat = await response.json();

                    // Fetch setup data
                    const setupResponse = await fetch(`https://localhost:44316/api/Setup/0?name=${actionAlkalmazasNev}`);
                    if (!setupResponse.ok) {
                        console.error("Hiba:", setupResponse.status);
                        return;
                    }
                    const setupAdat = await setupResponse.json();

                    // Update input fields
                    document.getElementById("alkSizePost").value = alkAdat.Tarhely;

                    // Update category combobox
                    setActionKivalasztottCategoria(alkAdat.KategoriaNev);

                    // Process setup data (min and max)
                    const minSetup = setupAdat.find(setup => setup.Gepigeny === "min");
                    const maxSetup = setupAdat.find(setup => setup.Gepigeny === "opt");

                    if (minSetup) {
                        setActionKivalasztottNev(elozoAllapot => ({ ...elozoAllapot, minimumNev: minSetup.VidekortyaNev }));
                        setActionSelectedVram(elozoAllapot => ({ ...elozoAllapot, minimumVram: minSetup.VideokartyaVram}));
                        setActionKivalasztottAlaplapNev(elozoAllapot => ({ ...elozoAllapot, minimumAlapNev: minSetup.AlaplapNeve }));
                        setActionKivalasztottRamNev(elozoAllapot => ({ ...elozoAllapot, minimumRamNev: minSetup.RamNeve }));
                        setActionSelectedRamFrekvencia(elozoAllapot => ({ ...elozoAllapot, minimumFrekvencia: minSetup.RamFrekvencia}));
                        setActionSelectedRamMeret(elozoAllapot => ({ ...elozoAllapot, minimumMeret: minSetup.RamMeret}));
                        setActionKivalasztottProcesszorNev(elozoAllapot => ({ ...elozoAllapot, minimumProcesszorNev: minSetup.ProcesszorNev }));
                        setActionOprendszer(elozoAllapot => ({ ...elozoAllapot, minimumOprendszer: minSetup.OprendszerNev }));
                    }

                    if (maxSetup) {
                        setActionKivalasztottNev(elozoAllapot => ({ ...elozoAllapot, maximumNev: maxSetup.VidekortyaNev }));
                        setActionSelectedVram(elozoAllapot => ({ ...elozoAllapot, maximumVram: maxSetup.VideokartyaVram}));
                        setActionKivalasztottAlaplapNev(elozoAllapot => ({ ...elozoAllapot, maximumAlapNev: maxSetup.AlaplapNeve }));
                        setActionKivalasztottRamNev(elozoAllapot => ({ ...elozoAllapot, maximumRamNev: maxSetup.RamNeve }));
                        setActionSelectedRamFrekvencia(elozoAllapot => ({ ...elozoAllapot, maximumFrekvencia: maxSetup.RamFrekvencia}));
                        setActionSelectedRamMeret(elozoAllapot => ({ ...elozoAllapot, maximumMeret: maxSetup.RamMeret}));
                        setActionKivalasztottProcesszorNev(elozoAllapot => ({ ...elozoAllapot, maximumProcesszorNev: maxSetup.ProcesszorNev }));
                        setActionOprendszer(elozoAllapot => ({ ...elozoAllapot, maximumOprendszer: maxSetup.OprendszerNev }));
                    }
                } catch (error) {
                    console.error("Hiba a fetchben:", error);
                }
            } else {
                // Reset fields when no application is selected
                document.getElementById("alkSizePost").value = "";
                setActionKivalasztottCategoria("");
                setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });
                setActionSelectedVram({ minimumVram: "", maximumVram: "" });
                setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });
                setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });
                setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });
                setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });
                setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });
                setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });
            }
        };
        fetchAlkalmazasAdat();
    }, [actionAlkalmazasNev]);

    function NeFrissuljon(event){event.preventDefault()}

    const [fileName, setFileName] = useState("Nincs fájl kiválasztva");
    const handleFileChange = (event) =>
    {
      if (event.target.files.length > 0) {
         setFileName(event.target.files[0].name);
         setSelectedFile(event.target.files[0])
       } else {setFileName("Nincs fájl kiválasztva");}
    }
    async function handleDelete(event)
    {
        event.preventDefault();
        if(actionButtons==="Delete") await DeleteEllenorzes(actionAlkalmazasNev);
    }


    const handleUploadAndPost = async (event) => {
          event.preventDefault();
    
             if (!selectedFile) {
                if(actionButtons==="Post"){await Ellenorzes("",actionKivalasztottCategoria,actionKivalasztottNev.minimumNev,actionSelectedVram.minimumVram,actionKivalasztottAlaplapNev.minimumAlapNev,actionKivalaszottRamNev.minimumRamNev,actionSelectedRamFrekvencia.minimumFrekvencia,actionSelectedRamMeret.minimumMeret,actionKivalasztottProcesszorNev.minimumProcesszorNev,actionOprendszer.minimumOprendszer,actionKivalasztottNev.maximumNev,actionSelectedVram.maximumVram,actionKivalasztottAlaplapNev.maximumAlapNev,actionKivalaszottRamNev.maximumRamNev,actionSelectedRamFrekvencia.maximumFrekvencia,actionSelectedRamMeret.maximumMeret,actionKivalasztottProcesszorNev.maximumProcesszorNev,actionOprendszer.maximumOprendszer); }
                if(actionButtons==="Patch"){await PatchEllenorzes("",actionAlkalmazasNev,actionKivalasztottCategoria,actionKivalasztottNev.minimumNev,actionSelectedVram.minimumVram,actionKivalasztottAlaplapNev.minimumAlapNev,actionKivalaszottRamNev.minimumRamNev,actionSelectedRamFrekvencia.minimumFrekvencia,actionSelectedRamMeret.minimumMeret,actionKivalasztottProcesszorNev.minimumProcesszorNev,actionOprendszer.minimumOprendszer,actionKivalasztottNev.maximumNev,actionSelectedVram.maximumVram,actionKivalasztottAlaplapNev.maximumAlapNev,actionKivalaszottRamNev.maximumRamNev,actionSelectedRamFrekvencia.maximumFrekvencia,actionSelectedRamMeret.maximumMeret,actionKivalasztottProcesszorNev.maximumProcesszorNev,actionOprendszer.maximumOprendszer);}
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
                        if(actionButtons==="Post")await Ellenorzes(data.file_name,actionKivalasztottCategoria,actionKivalasztottNev.minimumNev,actionSelectedVram.minimumVram,actionKivalasztottAlaplapNev.minimumAlapNev,actionKivalaszottRamNev.minimumRamNev,actionSelectedRamFrekvencia.minimumFrekvencia,actionSelectedRamMeret.minimumMeret,actionKivalasztottProcesszorNev.minimumProcesszorNev,actionOprendszer.minimumOprendszer,actionKivalasztottNev.maximumNev,actionSelectedVram.maximumVram,actionKivalasztottAlaplapNev.maximumAlapNev,actionKivalaszottRamNev.maximumRamNev,actionSelectedRamFrekvencia.maximumFrekvencia,actionSelectedRamMeret.maximumMeret,actionKivalasztottProcesszorNev.maximumProcesszorNev,actionOprendszer.maximumOprendszer);
                        {/*PATCH része */}
                        if(actionButtons==="Patch")await PatchEllenorzes(data.file_name,actionAlkalmazasNev,actionKivalasztottCategoria,actionKivalasztottNev.minimumNev,actionSelectedVram.minimumVram,actionKivalasztottAlaplapNev.minimumAlapNev,actionKivalaszottRamNev.minimumRamNev,actionSelectedRamFrekvencia.minimumFrekvencia,actionSelectedRamMeret.minimumMeret,actionKivalasztottProcesszorNev.minimumProcesszorNev,actionOprendszer.minimumOprendszer,actionKivalasztottNev.maximumNev,actionSelectedVram.maximumVram,actionKivalasztottAlaplapNev.maximumAlapNev,actionKivalaszottRamNev.maximumRamNev,actionSelectedRamFrekvencia.maximumFrekvencia,actionSelectedRamMeret.maximumMeret,actionKivalasztottProcesszorNev.maximumProcesszorNev,actionOprendszer.maximumOprendszer);
                        setFileUrl(data.file_name);
                        setSelectedFile(null);
                      } else {
                        console.error("Hiba történt:", data.message);
                      }
                } catch (error) {
                      console.error("Hálózati hiba:", error);
                }
             };       
          }

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
        <div id='torzs'>
            <nav className='navbars' style={{ display: !menuNyitva ? 'none' : 'flex' }}> {/*Navigációs menü*/}
                <button className="menuVisszaGomb" onClick={close} style={{ display: window.innerWidth <= 600 ? 'flex' : 'none' }}>X</button>
                <a href='' className={actionNavigation==="Post"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post");setActionMindenhezKellAdat(null); setActionNavigation("Post");setFileName("Nincs fájl kiválasztva");setActionKivalasztottCategoria("");setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });setActionSelectedVram({ minimumVram: "", maximumVram: "" });setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });setActionAlkalmazasNev("")}}>Feltöltés</a>
                <a href='' className={actionNavigation==="Patch"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch");setActionMindenhezKellAdat(null); setActionNavigation("Patch");setFileName("Nincs fájl kiválasztva");setActionKivalasztottCategoria("");setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });setActionSelectedVram({ minimumVram: "", maximumVram: "" });setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });setActionAlkalmazasNev("")}}>Módosítás</a>
                <a href='' className={actionNavigation==="Delete"?"color":""} onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete");setActionMindenhezKellAdat(null); setActionNavigation("Delete");setFileName("Nincs fájl kiválasztva");setActionKivalasztottCategoria("");setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });setActionSelectedVram({ minimumVram: "", maximumVram: "" });setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });setActionAlkalmazasNev("")}}>Eltávolítás</a>
             </nav>
             <div style={{ display: menuNyitva ? 'none' : 'flex' }}>
               <button className="menuGomb" onClick={open}>&#9776;</button>
             </div>

             {actionButtons==="Post" ? <div id='Alk_post_torzs'>
                <div id='Felso'>
                    <div className='inputs'>
                        <form id='inputs_post'>
                            <p className='alkTitlesFelso'>Alkalmazás neve:</p><input type="text" id="alkNamePost" className='inputStyle'/>
                            <p className='alkTitlesFelso'>Alkalmazás mérete:</p><input type="number" id="alkSizePost" className='inputStyle'/>
                        </form> 
                    </div>
                    <div className='inputs'>
                        <form id='comboImage'>
                            <p className='alkTitlesFelso'>Kategória:</p>
                            <div id='combobox'>
                                <select id="comboboxCategory" onChange={(v)=>setActionKivalasztottCategoria(v.target.value)} value={actionKivalasztottCategoria}>
                                    <option className="comboboxAlkPost" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['kategoriak'].map(i=>i.Nev))].map((nev)=>(<option className="comboboxAlkPost" key={nev} value={nev}>{nev}</option>))}
                                </select>

                            </div>
                            <p className='alkTitlesFelso'>Kép feltöltése:</p>
                            <div className='imageUpload'>
                                <input key={fileName} type="file" id="imginput" className="elrejtes" onChange={handleFileChange}/>
                                <span className="AlkFilename">{fileName}</span>
                            </div>
                            <label htmlFor="imginput" className="AlkImgButton">📁 Fájl kiválasztása</label>
                        </form>
                    </div>
                </div>
                    <div id='upload_button'><button className='buttons' id='AlkButton' type='button' onClick={async(e)=>{handleUploadAndPost(e);await fetchAdat();setFileName("Nincs fájl kiválasztva");setActionKivalasztottCategoria("");setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });setActionSelectedVram({ minimumVram: "", maximumVram: "" });setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });}}>Adatok feltöltése</button> </div>
                    <EgyediAlert/>
                    <div id='Also'>
                        <div id='minSetup'>
                            <p className='title'>Minimum setup</p>
                            <p className='alkTitles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(v)=>setActionKivalasztottNev({...actionKivalasztottNev,minimumNev:v.target.value})} value={actionKivalasztottNev.minimumNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMin" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedVram({...actionSelectedVram,minimumVram:e.target.value})} value={actionSelectedVram.minimumVram} >
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {actionSzurtVram.minimumVram.map((vram)=>(<option id="legordulosOptionMin" value={vram} key={vram}>{vram}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(an)=>setActionKivalasztottAlaplapNev({...actionKivalasztottAlaplapNev,minimumAlapNev:an.target.value})} value={actionKivalasztottAlaplapNev.minimumAlapNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(v)=>setActionKivalasztottRamNev({...actionKivalaszottRamNev,minimumRamNev:v.target.value})} value={actionKivalaszottRamNev.minimumRamNev}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedRamFrekvencia({...actionSelectedRamFrekvencia,minimumFrekvencia:e.target.value})} value={actionSelectedRamFrekvencia.minimumFrekvencia}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {actionSzurtRamFrekvencia.minimumFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulosOptionMin">{Frekvencia}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedRamMeret({...actionSelectedRamMeret,minimumMeret:e.target.value})} value={actionSelectedRamMeret.minimumMeret} >
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {actionSzurtRamMeret.minimumMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulosOptionMin">{Meret}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(an)=>setActionKivalasztottProcesszorNev({...actionKivalasztottProcesszorNev,minimumProcesszorNev:an.target.value})} value={actionKivalasztottProcesszorNev.minimumProcesszorNev}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                           <p className='alkTitles'>Operációs rendszer:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" id='alja' onChange={(an)=>setActionOprendszer({...actionOprendszer,minimumOprendszer:an.target.value})} value={actionOprendszer.minimumOprendszer}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['oprendszerek'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                        </div>

                        <div id='maxSetup'>
                            <p className='title'>Maximum setup</p>
                            <p className='alkTitles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(v)=>setActionKivalasztottNev({...actionKivalasztottNev,maximumNev:v.target.value})} value={actionKivalasztottNev.maximumNev}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMax" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedVram({...actionSelectedVram,maximumVram:e.target.value})} value={actionSelectedVram.maximumVram}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {actionSzurtVram.maximumVram.map((vram)=>(<option id="legordulosOptionMax" value={vram} key={vram}>{vram}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionKivalasztottAlaplapNev({...actionKivalasztottAlaplapNev,maximumAlapNev:an.target.value})} value={actionKivalasztottAlaplapNev.maximumAlapNev}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(v)=>setActionKivalasztottRamNev({...actionKivalaszottRamNev,maximumRamNev:v.target.value})} value={actionKivalaszottRamNev.maximumRamNev}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedRamFrekvencia({...actionSelectedRamFrekvencia,maximumFrekvencia:e.target.value})} value={actionSelectedRamFrekvencia.maximumFrekvencia}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {actionSzurtRamFrekvencia.maximumFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulosOptionMax">{Frekvencia}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedRamMeret({...actionSelectedRamMeret,maximumMeret:e.target.value})} value={actionSelectedRamMeret.maximumMeret}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {actionSzurtRamMeret.maximumMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulosOptionMax">{Meret}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionKivalasztottProcesszorNev({...actionKivalasztottProcesszorNev,maximumProcesszorNev:an.target.value})} value={actionKivalasztottProcesszorNev.maximumProcesszorNev}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                           </div>
                           <p className='alkTitles'>Operációs rendszer:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionOprendszer({...actionOprendszer,maximumOprendszer:an.target.value})} value={actionOprendszer.maximumOprendszer}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['oprendszerek'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                        </div>
                    </div>
            </div> : <div></div>}
{/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            {actionButtons==="Patch" ? <div id='Alk_post_torzs'>
                <div id='Felso'>
                    <div className='inputs'>
                        <form id='inputs_post'>
                            <p className='alkTitlesFelso'>Alkalmazás neve:</p>
                                <select id='comboboxCategory' onChange={(v)=>setActionAlkalmazasNev(v.target.value)} value={actionAlkalmazasNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alkalmazasok'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMin" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            <p className='alkTitlesFelso'>Alkalmazás mérete:</p><input type="number" id="alkSizePost" className='inputStyle'/>
                        </form> 
                    </div>
                    <div className='inputs'>
                        <form id='comboImage'>
                            <p className='alkTitlesFelso'>Kategória:</p>
                            <div id='combobox'>
                                <select id="comboboxCategory" onChange={(v)=>setActionKivalasztottCategoria(v.target.value)} value={actionKivalasztottCategoria}>
                                    <option className="comboboxAlkPost" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['kategoriak'].map(i=>i.Nev))].map((nev)=>(<option className="comboboxAlkPost" key={nev} value={nev}>{nev}</option>))}
                                </select>

                            </div>
                            <p className='alkTitlesFelso'>Kép feltöltése:</p>
                            <div className='imageUpload'>
                                <input type="file" className="elrejtes" onChange={handleFileChange}/>
                                <span className="AlkFilename" id='alkImgLinkPost'>{fileName}</span>
                            </div>
                            <label htmlFor="imginput" className="AlkImgButton" id='alkImgPost'>📁 Fájl kiválasztása</label>
                        </form>
                    </div>
                    <div>               
                    <EgyediAlert/>                   
                    </div>
                </div>
                <div id='upload_button'><button className='buttons' id='AlkButton' type='button' onClick={async(e)=>{handleUploadAndPost(e);await fetchAdat();setActionAlkalmazasNev("");setFileName("Nincs fájl kiválasztva");setActionKivalasztottCategoria("");setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });setActionSelectedVram({ minimumVram: "", maximumVram: "" });setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });}}>Módosítások mentése</button> </div>
                    <div id='Also'>
                        <div id='minSetup'>
                            <p className='title'>Minimum setup</p>
                            <p className='alkTitles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(v)=>setActionKivalasztottNev({...actionKivalasztottNev,minimumNev:v.target.value})} value={actionKivalasztottNev.minimumNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMin" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedVram({...actionSelectedVram,minimumVram:e.target.value})} value={actionSelectedVram.minimumVram} >
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {actionSzurtVram.minimumVram.map((vram)=>(<option id="legordulosOptionMin" value={vram} key={vram}>{vram}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(an)=>setActionKivalasztottAlaplapNev({...actionKivalasztottAlaplapNev,minimumAlapNev:an.target.value})} value={actionKivalasztottAlaplapNev.minimumAlapNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(v)=>setActionKivalasztottRamNev({...actionKivalaszottRamNev,minimumRamNev:v.target.value})} value={actionKivalaszottRamNev.minimumRamNev}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedRamFrekvencia({...actionSelectedRamFrekvencia,minimumFrekvencia:e.target.value})} value={actionSelectedRamFrekvencia.minimumFrekvencia}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {actionSzurtRamFrekvencia.minimumFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulosOptionMin">{Frekvencia}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(e)=>setActionSelectedRamMeret({...actionSelectedRamMeret,minimumMeret:e.target.value})} value={actionSelectedRamMeret.minimumMeret} >
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {actionSzurtRamMeret.minimumMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulosOptionMin">{Meret}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" onChange={(an)=>setActionKivalasztottProcesszorNev({...actionKivalasztottProcesszorNev,minimumProcesszorNev:an.target.value})} value={actionKivalasztottProcesszorNev.minimumProcesszorNev}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                           <p className='alkTitles'>Operációs rendszer:</p>
                            <div className='comboboxes'>
                                <select className="combi_min" id='alja' onChange={(an)=>setActionOprendszer({...actionOprendszer,minimumOprendszer:an.target.value})} value={actionOprendszer.minimumOprendszer}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['oprendszerek'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                        </div>

                        <div id='maxSetup'>
                            <p className='title'>Maximum setup</p>
                            <p className='alkTitles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(v)=>setActionKivalasztottNev({...actionKivalasztottNev,maximumNev:v.target.value})} value={actionKivalasztottNev.maximumNev}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['videokartyak'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMax" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedVram({...actionSelectedVram,maximumVram:e.target.value})} value={actionSelectedVram.maximumVram}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {actionSzurtVram.maximumVram.map((vram)=>(<option id="legordulosOptionMax" value={vram} key={vram}>{vram}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionKivalasztottAlaplapNev({...actionKivalasztottAlaplapNev,maximumAlapNev:an.target.value})} value={actionKivalasztottAlaplapNev.maximumAlapNev}>
                                    <option id="legordulosOptionMax" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alaplapok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(v)=>setActionKivalasztottRamNev({...actionKivalaszottRamNev,maximumRamNev:v.target.value})} value={actionKivalaszottRamNev.maximumRamNev}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {[...new Set(mindenAdat['memoriak'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedRamFrekvencia({...actionSelectedRamFrekvencia,maximumFrekvencia:e.target.value})} value={actionSelectedRamFrekvencia.maximumFrekvencia}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {actionSzurtRamFrekvencia.maximumFrekvencia.map((Frekvencia)=>(<option value={Frekvencia} key={Frekvencia} id="legordulosOptionMax">{Frekvencia}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(e)=>setActionSelectedRamMeret({...actionSelectedRamMeret,maximumMeret:e.target.value})} value={actionSelectedRamMeret.maximumMeret}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {actionSzurtRamMeret.maximumMeret.map((Meret)=>(<option value={Meret} key={Meret} id="legordulosOptionMax">{Meret}</option>))}
                                </select>
                            </div>

                            <p className='alkTitles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionKivalasztottProcesszorNev({...actionKivalasztottProcesszorNev,maximumProcesszorNev:an.target.value})} value={actionKivalasztottProcesszorNev.maximumProcesszorNev}>
                                    <option id="legordulosOptionMax">Válassz egyet</option>
                                    {[...new Set(mindenAdat['processzorok'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMax">{nev}</option>))}
                                </select>
                           </div>
                           <p className='alkTitles'>Operációs rendszer:</p>
                            <div className='comboboxes'>
                                <select className="combi_max" onChange={(an)=>setActionOprendszer({...actionOprendszer,maximumOprendszer:an.target.value})} value={actionOprendszer.maximumOprendszer}>
                                    <option id="legordulosOptionMin">Válassz egyet</option>
                                    {[...new Set(mindenAdat['oprendszerek'].map(i=>i.Nev))].map((nev)=>(<option key={nev} value={nev} id="legordulosOptionMin">{nev}</option>))}
                                </select>
                           </div>
                        </div>
                    </div>
            </div> : <div></div>}
            {actionButtons==="Delete" ? <div id='Alk_post_torzs'>
                <div id='Felso'>
                    <div className='inputs'>
                        <form id='inputs_post'>
                            <p className='alkTitlesFelso'>Alkalmazás neve:</p>
                                <select id='comboboxCategory' onChange={(v)=>setActionAlkalmazasNev(v.target.value)} value={actionAlkalmazasNev}>
                                    <option id="legordulosOptionMin" value="">Válassz egyet</option>
                                    {[...new Set(mindenAdat['alkalmazasok'].map(i=>i.Nev))].map((nev)=>(<option id="legordulosOptionMin" key={nev} value={nev}>{nev}</option>))}
                                </select>
                            <p className='alkTitlesFelso'>Alkalmazás mérete:</p><input type="number" id="alkSizePost" className='inputStyle' readOnly/>
                        </form> 
                    </div>
                    <div className='inputs'>
                        <form id='comboImage'>
                            <p className='alkTitlesFelso'>Kategória:</p>
                            <div id='combobox'>
                                <input type="comboboxCategory" value={actionKivalasztottCategoria} readOnly/>
                            </div>
                        </form>
                    </div>
                    <div>                               
                    </div>
                </div>
                <div id='upload_button'><button className='buttons' id='AlkButton' type='button' onClick={async(e)=>{handleDelete(e);await fetchAdat();setActionAlkalmazasNev("");setActionKivalasztottCategoria("");setActionKivalasztottNev({ minimumNev: "", maximumNev: "" });setActionSelectedVram({ minimumVram: "", maximumVram: "" });setActionKivalasztottAlaplapNev({ minimumAlapNev: "", maximumAlapNev: "" });setActionKivalasztottRamNev({ minimumRamNev: "", maximumRamNev: "" });setActionSelectedRamFrekvencia({ minimumFrekvencia: "", maximumFrekvencia: "" });setActionSelectedRamMeret({ minimumMeret: "", maximumMeret: "" });setActionKivalasztottProcesszorNev({ minimumProcesszorNev: "", maximumProcesszorNev: "" });setActionOprendszer({ minimumOprendszer: "", maximumOprendszer: "" });}}>Törlés</button></div>
                <EgyediAlert/>  
                    <div id='Also'>
                        <div id='minSetup'>
                            <p className='title'>Minimum setup</p>
                            <p className='alkTitles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionKivalasztottNev.minimumNev} readOnly/>
                            </div>

                            <p className='alkTitles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionSelectedVram.minimumVram} readOnly/>
                            </div>

                            <p className='alkTitles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionKivalasztottAlaplapNev.minimumAlapNev} readOnly/>
                            </div>

                            <p className='alkTitles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionKivalaszottRamNev.minimumRamNev} readOnly/>
                            </div>

                            <p className='alkTitles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionSelectedRamFrekvencia.minimumFrekvencia} readOnly/>
                            </div>

                            <p className='alkTitles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionSelectedRamMeret.minimumMeret} readOnly/>
                            </div>

                            <p className='alkTitles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionKivalasztottProcesszorNev.minimumProcesszorNev} readOnly/>
                           </div>
                           <p className='alkTitles'>Operációs rendszer:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_min' value={actionOprendszer.minimumOprendszer} readOnly/>
                           </div>
                        </div>

                        <div id='maxSetup'>
                            <p className='title'>Maximum setup</p>
                            <p className='alkTitles'>Videókártya neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_max' value={actionKivalasztottNev.maximumNev} readOnly/>
                            </div>

                            <p className='alkTitles'>Videókártya Vram:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_max' value={actionSelectedVram.maximumVram} readOnly/>
                            </div>

                            <p className='alkTitles'>Alaplap neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_max' value={actionKivalasztottAlaplapNev.maximumAlapNev} readOnly/>
                            </div>

                            <p className='alkTitles'>Memória neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className='combi_max' value={actionKivalaszottRamNev.maximumRamNev} readOnly/>
                            </div>

                            <p className='alkTitles'>Memória frekvencia:</p>
                            <div className='comboboxes'>
                                <input type="text" className="combi_max" value={actionSelectedRamFrekvencia.maximumFrekvencia} readOnly/>
                            </div>

                            <p className='alkTitles'>Memória méret:</p>
                            <div className='comboboxes'>
                                <input type="text" className="combi_max" value={actionSelectedRamMeret.maximumMeret} readOnly/>
                            </div>

                            <p className='alkTitles'>Processzor neve:</p>
                            <div className='comboboxes'>
                                <input type="text" className="combi_max" value={actionKivalasztottProcesszorNev.maximumProcesszorNev} readOnly/>
                           </div>
                           <p className='alkTitles'>Operációs rendszer:</p>
                            <div className='comboboxes'>
                                <input type="text" className="combi_max" value={actionOprendszer.maximumOprendszer} readOnly/>
                           </div>
                        </div>
                    </div>
            </div> : <div></div>}
        </div>
    );
  }
  
export default UjAlk;