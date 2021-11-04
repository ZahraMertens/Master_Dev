import { gql } from "@apollo/client";

export const LOGIN_STUDENT = gql`
  mutation loginstudent($email: String!, $password: String!) {
    loginStudent(email: $email, password: $password) {
      token
      student {
        _id
        firstName
        lastName
        email
        userType
      }
    }
  }
`;

export const LOGIN_TUTOR = gql`
  mutation logintutor($email: String!, $password: String!) {
    loginTutor(email: $email, password: $password) {
      token
      tutor {
        _id
        firstName
        lastName
        userType
      }
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $userType: String!
  ) {
    addStudent(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userType: $userType
    ) {
      token
      student {
        _id
        firstName
        lastName
        email
        userType
      }
    }
  }
`;

export const ADD_TUTOR = gql`
  mutation addTutor(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $description: String!
    $language: String!
    $degree: String!
    $hourRate: ID!
    $password: String!
    $userType: String!
    $filenameImg: String
    $zoomPMI: String!
    $zoomPass: String!
  ) {
    addTutor(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userType: $userType
      phone: $phone
      description: $description
      language: $language
      degree: $degree
      hourRate: $hourRate
      filenameImg: $filenameImg
      zoomPMI: $zoomPMI
      zoomPass: $zoomPass
    ) {
      token
      tutor {
        _id
        firstName
        lastName
        email
        userType
        phone
        description
        language
        degree
        hourRate
        filenameImg
        zoomPMI
        zoomPass
      }
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation updateStudent(
    $studentId: ID
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateStudent(
      studentId: $studentId
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      student {
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_TUTOR = gql`
  mutation updateTutor(
    $tutorId: ID
    $firstName: String
    $lastName: String
    $email: String
    $phone: String
    $description: String
    $language: String
    $degree: String
    $hourRate: ID
    $filenameImg: String
    $zoomPMI: String
    $zoomPass: String
  ) {
    updateTutor(
      tutorId: $tutorId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      description: $description
      language: $language
      degree: $degree
      hourRate: $hourRate
      filenameImg: $filenameImg
      zoomPMI: $zoomPMI
      zoomPass: $zoomPass
    ) {
      token
      tutor {
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($tutors: [ID]!) {
    addOrder(tutors: $tutors) {
      purchaseDate
      tutors {
        _id
        firstName
        lastName
        email
        userType
        phone
        description
        language
        degree
        hourRate
        filenameImg
        zoomPMI
        zoomPass
      }
    }
  }
`;
