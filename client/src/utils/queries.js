import { gql } from "@apollo/client"

export const GET_TUTOR = gql `
   query searchtutor($language: String) {
     searchtutor(language: $language) {
       _id
       firstName
       lastName
       email
       phone
       pasword
       userType
       describtion
       language
       degree
       hourRate
     }
   }
`;