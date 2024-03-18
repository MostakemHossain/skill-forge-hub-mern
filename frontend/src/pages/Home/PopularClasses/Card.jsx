/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


const Card = ({ item }) => {
    const { _id, name, image, availableSeats, price, totalEnrolled } = item
    console.log(image)
    return (
        <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4">
            <img className="w-full h-[350px]" src={image} alt="" />
            <div className="p-4">
                <h1 className="text-xl font-semibold mb-2 dark:text-white">{name}</h1>
                <p className="text-gray-600 mb-2">Available seats : {availableSeats}</p>
                <p className="text-red-600 font-bold mb-2">Price : ${price}</p>
                <p className="text-secondary font-bold mb-2">Total Students : {totalEnrolled}</p>

                <Link to={`/class/${_id}`} className="text-center mt-2">
                    <button className="px-2 w-full py-2 rounded-xl bg-secondary text-white font-bold mt-2">view course</button>
                </Link>

            </div>
        </div>
    )
}

export default Card