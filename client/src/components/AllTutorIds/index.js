import React from 'react';
import AllTutorDetails from '../AllTutorDetails/index';

export default function AllTutorIds({orders}) {

    console.log(orders)

    return (
        <div>
            {orders.map((order) => (
                <AllTutorDetails key={order.tutors[0]._id} tutorId={order.tutors[0]._id} />
            ))}
        </div>
    )
}
