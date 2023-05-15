import { useEffect, useState } from "react";
import { storage } from "../lib/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import abletonParser from 'ableton-parser';
import axios from 'axios';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [url, setUrl] = useState("");
  const [parsedData, setParsedData] = useState(null); // nueva variable de estado

  useEffect(() => {
    selectedFile?.name !== undefined && setSelectedFileName(selectedFile.name);
  }, [selectedFile]);

  const handleSubmit = async () => {
    if (selectedFile === "") return;
    console.log( "soy selected file", selectedFile);
    fileHandleParse(selectedFile)
    
    //const imageRef = ref(storage, `proyectosals/${selectedFile.name}`);

    

    // try {
    //   await uploadBytes(imageRef, selectedFile).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       setUrl(url);
    //     });
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const removeFile = () => {
    setSelectedFile("");
    setSelectedFileName("");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000?urlFile=" + url);
        const data = await response.json();
        console.log(data);
        //setParsedData(data); // actualizar el estado con los datos analizados
      } catch (error) {
        console.error(error);
      }
    }

    url !== "" && fetchData();
  }, [url]);

  const fileHandleParse = async (selectedFileParam) => {
try{
  //const handlerFile = await axios.post('/api/data.js', selectedFile);
  //an axios call to the api to the handler function
  console.log("soy selected file param", selectedFileParam);
  const handlerFile = await axios.post('api/data', selectedFileParam);

  //send to axios the selected file

  //console.log(handlerFile);


}catch(err){
  console.log(err)
}

    // try {
    //   const data = await abletonParser.parseFile(selectedFile);
    //   const audioTrackNames = data.getTracks()[0].AudioTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);
    //   const midiTrackNames = data.getTracks()[0].MidiTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);
    //   console.log('audio', audioTrackNames);
    //   console.log('midi', midiTrackNames);
    //   //res.status(200).json({ audioTrackNames, midiTrackNames });
    // } catch (err) {
    //   console.error(err);
    //   //res.status(500).json({ error: 'Internal Server Error' });
    
    // }
  }

  return (
    <div className="App">
      <header className="App-header">
        {selectedFile !== "" ? (
          <div>
            <p>{selectedFileName}</p>
            <button onClick={removeFile}>eliminar archivo seleccionado</button>
          </div>
        ) : (
          <>
            <input
              type="file"
              value={""}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </>
        )}
        <br />
        <button onClick={handleSubmit} type="submit">
          Subir
        </button>
        {parsedData && ( // mostrar los datos analizados si existen
          <ul>
            {parsedData.audioTrackNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}
