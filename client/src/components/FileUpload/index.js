// import React, {useState} from "react";
// import { Form, Button } from "react-bootstrap";
// // import { useMutation } from "@apollo/client";

// // import { UPLOAD_FILE } from "../../utils/mutations"


// export default function FileUpload() {

//     // const [uploadFile] = useMutation(UPLOAD_FILE, {
//     //     onCompleted: data => console.log(data)
//     // });

//     // const fileSelectedHandler = (event) => {
//     //     const file = event.target.files[0]
//     //     //if no files return else causes error
//     //     if(!file) return

//     //     uploadFile({variables: {file}})
//     // }

//     // const [picture, setPicture] = useState("")

//     // const fileSelectedHandler = (event) => {
//     //     console.log(event.target.files[0]); //returns the file name and details
//     //     this.setPicture({
//     //         selectedFile: event.target.files[0]
//     //     })
//     // }

//     // const fileUploadHandler = () => {
//     //     fetch()
//     // }

//   return (
//     <>
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Label>Upload a profile image:</Form.Label>
//         <Form.Control type="file" onChange={this.fileSelectedHandler}/>
//         {/* <Button onClick={this.fileUploadHandler}>Upload</Button> */}
//       </Form.Group>
//     </>
//   );
// }
