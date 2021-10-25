import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import { GET_TUTOR_PROFILE } from "../../utils/queries";

export default function TutorProfile () {

    const { tutorId } = useParams();

    console.log(tutorId)

    return (
        <div>
            <h1>Tutor</h1>
        </div>
    )
}
