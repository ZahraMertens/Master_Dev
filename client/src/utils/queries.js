import { gql } from "@apollo/client";

export const GET_TUTORS = gql`
  query searchtutor($language: String) {
    searchtutor(language: $language) {
      _id
      firstName
      lastName
      email
      phone
      userType
      description
      language
      degree
      hourRate
      filenameImg
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
      userType
      description
      language
      degree
      hourRate
      filenameImg
      zoomPMI
      zoomPass
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($tutors: [ID]!) {
    checkout(tutors: $tutors) {
      session
    }
  }
`;

export const STUDENT_BY_ID = gql`
  query getSingleStudent($studentId: ID!) {
    onestudent(studentId: $studentId) {
      _id
      firstName
      lastName
      email
      userType
      orders {
        _id
        purchaseDate
        tutors {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const ME_STUDENT = gql`
  query meStudent {
    meStudent {
      _id
      firstName
      lastName
      email
      userType
      orders {
        _id
        purchaseDate
        tutors {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const ME_TUTOR = gql`
  query meTutor {
    meTutor {
      _id
      firstName
      lastName
      email
      phone
      userType
      description
      language
      degree
      hourRate
      filenameImg
    }
  }
`;
