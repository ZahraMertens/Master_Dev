import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { uploadFile } from "react-s3";

//import { UPLOAD_FILE } from "../../utils/mutations";

const S3_BUCKET = "master-dev-app";
const REGION = "ap-southeast-2"; //Sydney region
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
// console.log(ACCESS_KEY)
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
// console.log(SECRET_ACCESS_KEY)

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

export default function FileUpload({ handleAWS }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    const newFile = event.target.files[0];
    console.log(newFile)
    setSelectedFile(newFile);
    
    if (newFile) {
      uploadFile(newFile, config)
        .then((data) => {
          if(data){
            //const newkey = generateString(10) + data.key
            //console.log(newkey);
            handleAWS({ filenameImg: data.location})
          }
        }) //returns obj with aws bucket, key(image name) and location (link for image in cloud)
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload a profile image:</Form.Label>
        <Form.Control type="file" name="picture" onChange={handleFileInput} />
      </Form.Group>
    </>
  );
}
