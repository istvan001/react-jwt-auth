import { render } from '@testing-library/react';
import axios from 'axios';
import React,{useState} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';



function FileUpload(props) {
    

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [etterem, setEtterem]=useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
           
            console.log(res);
            alert("Sikeres feltöltés!")
                //-----------------------------------------------------------------------------
                let bemenet={
                    bevitel1:props.etteremnev,
                    bevitel2:props.lakcim,
                    bevitel3:props.telefon,
                    bevitel4:props.nyitas,
                    bevitel5:fileName

                    

                  }
               
                  fetch('http://localhost:8080/etterem_felvi', {
                    method: "POST",
                    body: JSON.stringify(bemenet),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                    } )
                    .then((response) => response.text())
                    .then((szoveg) => {
              
                      
                      
                      
                      
                    })
                    .catch((error) =>{
                      console.error(error);
                    });
                    //---------------------------------------------------------------

        } catch (ex) {
            alert("Töltsd ki az összes mezőt!");
        }
    };

        return (
            <div className="App">          
                <input type="file" onChange={saveFile} style={{marginTop:5,marginBottom:10}} />
               
                <button onClick={uploadFile}>Feltöltés</button>
                
            </div>
        );
}


export default FileUpload;
