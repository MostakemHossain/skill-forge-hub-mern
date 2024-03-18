import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import user from "../../../../public/dynny.jpeg";
import useAxiosFetch from "../../../hooks/useAxiosFetch";


const PopularTeacher = () => {
    const [instructors, setInstructors] = useState([]);
    const axiosFetch = useAxiosFetch();
    useEffect(() => {
        axiosFetch.get('/popular-instructors').then((data) => {
            setInstructors(data.data)
        }).catch((err) => console.log(err))

    }, [])



    return (
        <div className="md:w-[80%] mx-auto my-36">
            <div className="dark:text-white">
                <h1 className="text-5xl font-bold text-center uppercase">Our <span className="text-secondary">Best</span> Instructors</h1>
                <div className="w-[40%] text-center mx-auto my-4">
                    <p className="text-gray-500">Our instructors represent the pinnacle of knowledge and skill in their respective fields, offering an enriching learning experience that transcends traditional boundaries</p>
                </div>
            </div>

            {
                instructors ? <>
                    <div className="grid mb-28 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%] gap-4 mx-auto">
                        {
                            instructors?.map((instructor, index) => (
                                <div key={index} className="flex dark:text-black hover:translate-y-2 duration-200 cursor-pointer flex-col shadow-lg dark:bg-white py-8 px-10 md:px-8 rounded-2xl">
                                    <div className="flex-col flex gap-6 md:gap-8">
                                        <img className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto" src={instructor?.instructor?.photoUrl || user} alt="" />
                                    </div>

                                    <div className="mt-4 flex flex-col text-center">
                                        <p className="font-semibold text-lg dark:text-black text-gray-800">{instructor?.instructor?.name}</p>
                                        <p className="font-bold text-secondary">Instructor</p>
                                        <p className="text-red-500">Total Students : {instructor?.totalEnrolled}</p>
                                    </div>

                                    <div className="flex gap-2 text-center mx-auto mt-2 text-secondary">
                                        <FaFacebook className="w-6 h-6" />
                                        <FaInstagram className="w-6 h-6" />
                                        <FaLinkedin className="w-6 h-6" />
                                    </div>

                                </div>
                            ))
                        }
                    </div>


                </> : <></>
            }
        </div>

    )
}

export default PopularTeacher;