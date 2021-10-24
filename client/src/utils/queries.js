import { gql } from "@apollo/client"

export const GET_TUTORS = gql `
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