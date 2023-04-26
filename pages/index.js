import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    selectedFile?.name !== undefined && setSelectedFileName(selectedFile.name);
  }, [selectedFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/data", {
        method: "POST",
        body: formData,
      });

      console.log(res);

      if (res.status === 200) {
        console.log("File processed successfully");
      } else {
        console.log("Error processing file");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFile = () =>{
    setSelectedFile("");
    setSelectedFileName("");
  };

  return (
    <div className="App">
      <header className="App-header">
        {selectedFileName !== "" ? (
          <div>
            <p>{selectedFileName}</p>
            <button onClick={ removeFile } >eliminar archivo seleccionado</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              value={""}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </header>
    </div>
  );

}
