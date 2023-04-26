import { useEffect, useState } from "react";
import { storage } from "../lib/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    selectedFile?.name !== undefined && setSelectedFileName(selectedFile.name);
  }, [selectedFile]);

  const handleSubmit = async () => {
    if (selectedFile === "") return;
    console.log(selectedFile);
    const imageRef = ref(storage, `proyectosals/${selectedFile.name}`);

    try {
      await uploadBytes(imageRef, selectedFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const removeFile = () => {
    setSelectedFile("");
    setSelectedFileName("");
  };

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
      </header>
    </div>
  );
}
