import { gql } from "@apollo/client";

export const GET_TUTORS = gql`
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

export const TUTOR_BY_ID = gql`
  query getSingleTutor($tutorId: ID!) {
    onetutor(tutorId: $tutorId) {
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
