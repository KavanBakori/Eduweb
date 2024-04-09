import React, { useState } from 'react';
import './upload.css'; // assuming your CSS file is named 'styles.css'
import axios from 'axios';

function FileUpload({form}) {
  const [fileName, setFileName] = useState('Browse Files');
  const [file, setFile] = useState(null);
  const [secure_url, setsecure_url] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append('upload_preset', 'videoes_preset');

    try {
      const api = `https://api.cloudinary.com/v1_1/dvy3tlqix/video/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      setsecure_url(secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }


    try{
      const sendvideo = await  fetch('/videoupload', {
        method: 'POST',
        body: JSON.stringify({"videolink": secure_url, "uploadname":form.uploadname, "uploaddes":form.uploaddes, "uploadtime":form.uploadtime}),
        headers: {'Content-Type': 'application/json'},
      });
      if (sendvideo.ok) {
        alert('Your suggestion has been sent successfully');
      } else {
        alert('Failed to send suggestion');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('An error occurred while submitting your suggestion');
    }
  };

  return (
    <>
      <label htmlFor="custom-file-upload" className="filupp">
        <span style={{ color: 'white' }} className="filupp-file-name js-value">{fileName}</span>
        <input
          type="file"
          name="attachment-file"
          id="custom-file-upload"
          onChange={handleFileChange}
        />
     </label>
      <br />
      <button style={{backgroundColor:'#1AB79D',paddingInline:'40px',paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',color:'white'}} onClick={handleUpload}>Upload</button>
    </>
  );
}

export default FileUpload;
