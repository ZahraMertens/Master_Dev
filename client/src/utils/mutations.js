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
    $describtion: String!
    $language: String!
    $degree: String! 
    $hourRate: ID!
    $password: String!
    $userType: String!
  ) {
    addTutor(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userType: $userType
      phone: $phone
      describtion: $describtion
      language: $language
      degree: $degree
      hourRate: $hourRate
    ) {
      token
      tutor {
        _id
        firstName
        lastName
        email
        userType
        phone
        describtion
        language
        degree
        hourRate
      }
    }
  }
`;
