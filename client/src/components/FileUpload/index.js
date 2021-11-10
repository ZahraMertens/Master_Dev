import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { uploadFile } from "react-s3";

const S3_BUCKET = process.env.REACT_APP_HEROKU_AWS_BUCKET
const REGION = process.env.REACT_APP_HEROKU_AWS_DEFAULT_REGION; //Sydney region
const ACCESS_KEY = process.env.REACT_APP_HEROKU_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_HEROKU_AWS_SECRET_ACCESS_KEY;

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

export default function FileUpload({ handleAWS }) {

  //s3 bucket
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    const newFile = event.target.files[0];
    setSelectedFile(newFile);

    if (newFile) {
      uploadFile(newFile, config)
        .then((data) => {
          if(data){
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
        <Form.Control
          type="file"
          name="picture"
          onChange={handleFileInput}
        />
      </Form.Group>
    </>
  );
}
