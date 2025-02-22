import {useState } from 'react';
import './UjAlkat.css';

function UjAlkat() {
    const [actionHardver, setActionHardver] =useState("Videókártya")
    const [actionButtons, setActionButtons] =useState("Post") 
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleUpload = async () => {
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
                setFileUrl(data.file_name);
                console.log("Feltöltött kép elérési útja:", data.file_name);
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
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Alaplap"); setActionButtons("Post")}}>Alaplap</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Videókártya"); setActionButtons("Post")}}>Videókártya</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Memória"); setActionButtons("Post")}}>Memória</a>
                <a href='' onClick={(event)=>{NeFrissuljon(event); setActionHardver("Processzor"); setActionButtons("Post")}}>Processzor</a>
             </nav>


             {actionHardver==="Videókártya" && actionButtons==="Post" ? <div className='body'>
                 <div className='kozos'>
                    <form>
                    Név:<br/><input type='text'/><br/>                 {/*név mező*/}
                    Alaplapi csatlakozás:<br/><input type='text'/><br/>{/*alaplapi csatlakozás mező*/}
                    Ajánlott tápegység:<br/><input type='number'/><br/>{/*Ajánlott tápegység mező*/}
                    Monitor csatlakozás:<br/><input type='text'/><br/> {/*Monitor csatlakozás mező*/}
                    Vram:<br/> <input type='number'/><br/>             {/*Vram mező*/}
                    Chip  gyártója:<br/><input type='text'/><br/>      {/*név mező*/}
                    <input type="file" onChange={handleFileChange} />
                    </form>
                 </div>
                 <div className='kozos'>
                    <p>Kép neve: {fileUrl}</p>
                    <p>Url: {url}</p>
                    </div>
                 <div className='kozos'>
                    <div>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Patch" ? <div className='body'>
                 <div className='kozos'>
                    <form>
                    Név:<br/><input type='text'/><br/>                 
                    Alaplapi csatlakozás:<br/><input type='text'/><br/>
                    Ajánlott tápegység:<br/><input type='number'/><br/>
                    Monitor csatlakozás:<br/><input type='text'/><br/> 
                    Vram:<br/> <input type='number'/><br/>             
                    Chip  gyártója:<br/><input type='text'/><br/>      
                    <input type="file" onChange={handleFileChange} />
                    </form>
                 </div>

                 <div className='kozos'>
                    <p>Név: {}</p>
                    <p>Alaplapi csatlakozás: {}</p>
                    <p>Ajánlott tápegység: {}</p>                 
                    <p>Monitor csatlakozás: {}</p> 
                    <p>Vram: {}</p> 
                    <p>Chip  gyártója: {}</p>       
                    {/* <image src=""></image>*/}
                 </div>


                 <div className='kozos'>
                    <div>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                    </div>
                 </div>
            </div> : <div></div>}

            {actionHardver==="Videókártya" && actionButtons==="Delete" ? <div className='body'>
                 <div className='kozos'>
                    <form>
                    Név:<br/><input type='text'/><br/>                 
                    Vram:<br/> <input type='number'/><br/>
                    </form>
                 </div>
                 <div className='kozos' >gggsydzhstrh</div>
                 <div className='kozos'>
                    <div>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                    </div>
                 </div>
            </div> : <div></div>}

        </div>  
    );
  }
  
  export default UjAlkat;
{/*
             <div className='body'>
                 <div className='kozos'>
                    <form>
                    Név:<br/><input type='text'/><br/>
                    Alaplapi csatlakozás:<br/><input type='text'/><br/>
                    Ajánlott tápegység:<br/><input type='number'/><br/>
                    Monitor csatlakozás:<br/><input type='text'/><br/>
                    Vram:<br/> <input type='number'/><br/>              
                    Chip  gyártója:<br/><input type='text'/><br/>      
                    <input type="file" onChange={handleFileChange} />
                    </form>
                 </div>
                 <div className='kozos'>gggsydzhstrh</div>
                 <div className='kozos'>
                    <div>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Post")}}>Új elem hozzáadása</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Delete")}}>Elem törlése</button>
                        <button onClick={(event)=>{NeFrissuljon(event); setActionButtons("Patch")}}>Elem adatainak frissítése</button>
                    </div>
                 </div>
            </div>
            */}