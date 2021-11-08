import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { uploadFile } from "react-s3";
import Amplify from "@aws-amplify/core";
import { Storage } from "aws-amplify";

import { UPLOAD_FILE } from "../../utils/mutations";

// const S3_BUCKET = "master-dev-app";
// const REGION = "ap-southeast-2"; //Sydney region
// const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
// // console.log(ACCESS_KEY)
// const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
// console.log(SECRET_ACCESS_KEY)

// // Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'ap-southeast-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'ap-southeast-2:3f05d5da-41c8-40b3-9429-71b4e4e39023',
// });

// const config = {
//   bucketName: S3_BUCKET,
//   region: REGION,
//   accessKeyId: ACCESS_KEY,
//   secretAccessKey: SECRET_ACCESS_KEY,
// };

export default function FileUpload({ handleAWS }) {


  //AWS
  // const ref = useRef(null);
  // //config aws amplify service
  // useEffect(() => {
  //   Amplify.configure({
  //     Auth: {
  //       identityPoolId: "ap-southeast-2:3f05d5da-41c8-40b3-9429-71b4e4e39023",
  //       region: "ap-southeast-2",
  //     },

  //     Storage: {
  //       AWSS3: {
  //         bucket: "master-dev-bucket",
  //         region: "ap-southeast-2",
  //       },
  //     },
  //   });
  // }, []);

  // const handleFileInput = (event) => {
  //   const newFile = ref.current.files[0].name;
  //   console.log(newFile);
  //   Storage.put(newFile, ref.current.files[0])
  //     .then((res) => {
  //       console.log(res);
  //       if (res) {
  //         console.log(res.key)
  //         handleAWS({ filenameImg: res.key})
  //       }
  //     })
  //     .then(() => {})
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };



  //s3 bucket
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileInput = (event) => {
  //   const newFile = event.target.files[0];
  //   console.log(newFile)
  //   setSelectedFile(newFile);

  //   if (newFile) {
  //     uploadFile(newFile, config)
  //       .then((data) => {
  //         if(data){
  //           //const newkey = generateString(10) + data.key
  //           console.log(data);
  //           handleAWS({ filenameImg: data.location})
  //         }
  //       }) //returns obj with aws bucket, key(image name) and location (link for image in cloud)
  //       .catch((err) => console.error(err));
  //   }
  // };



  //APOLLO UPLOAD
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
          handleAWS({
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
        {/* WHEN FILE UPLOAD WITHOUT S3 */}
        <Form.Control type="file" name="picture" onChange={fileSelectedHandler}/>
        {/* <Form.Control
          // ref={ref}
          type="file"
          name="picture"
          onChange={handleFileInput}
        /> */}
      </Form.Group>
    </>
  );
}
