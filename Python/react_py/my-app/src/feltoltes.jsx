import { useState } from "react";
import React  from "react";


const Valami = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

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
            });
    
            const data = await response.json();
            if (response.ok) {
                setFileUrl(data.file_url);
                console.log("Feltöltött kép elérési útja:", data.file_url);
            } else {
                console.error("Hiba történt:", data.message);
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
        }
    };
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Feltöltés</button>
            {fileUrl && (
                <div>
                    <p>Feltöltött fájl:</p>
                    <img src={fileUrl} alt="Feltöltött kép" width="300px" />
                </div>
            )}
        </div>
    );
};

export default Valami;
