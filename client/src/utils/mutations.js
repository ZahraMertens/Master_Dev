import { gql } from '@apollo/client';

export const LOGIN_STUDENT = gql`
   mutation loginstudent($email: String!, $password: String!){
       loginStudent(email: $email, password: $password){
           token
           student {
               _id
               firstName
               lastName
           }
       }
   }
`;

export const LOGIN_TUTOR = gql`
   mutation logintutor($email: String!, $password: String!){
    loginTutor(email: $email, password: $password){
           token
           tutor {
               _id
               firstName
               lastName
           }
       }
   }
`;