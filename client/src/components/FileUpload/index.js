import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPLOAD_FILE } from "../../utils/mutations"


export default function FileUpload({handleUpload}) {

    const [picture, setPicture] = useState("");
    
    const [uploadFile, {error}] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });


    const fileSelectedHandler = async (event) => {
        event.preventDefault();
        
        console.log(event.target.files[0]); //returns the file name and details
        try {
            let file = await event.target.files[0] 
            console.log(file)//as files is an array get the first element
            //if no files return else causes error
            if(!file) return

            const newFile =  await uploadFile({
                variables: {file}
            });
            console.log(newFile)

            setPicture(file.name)

            handleUpload({
                filenameImg: newFile.data.uploadFile.filename
            });

            console.log(file.name)

        } catch(error) {
            console.log(error)
        }
    }

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload a profile image:</Form.Label>
        <Form.Control type="file" name="picture" onChange={fileSelectedHandler}/>
      </Form.Group>
    </>
  );
}
