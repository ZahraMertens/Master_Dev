import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { TUTOR_BY_ID } from '../../utils/queries';

export default function Profile () {

    const { tutorId } = useParams();

    const { loading, data }= useQuery(TUTOR_BY_ID, {
        variables: { tutorId: tutorId},
    })

    const tutor = data?.onetutor || {};

    return (
        <div>
            {/* DISPLAY THE WHOLE TUTOR DATA */}
            <h1>Test Header</h1>
        </div>
    )
}
