import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import { GET_STUDENT_PROFILE } from "../../utils/queries";

export default function StudentProfile () {

    const { studentId } = useParams();

    console.log(studentId)

    return (
        <div>
            <h1>Student</h1>
        </div>
    )
}