import { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Card from "./Card";


const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axiosFetch.get('/classes');
            setClasses(response.data)
        }
        fetchClasses();
    }, [])

    return (
        <div className="md:w-[80%] mx-auto my-36">
            <div className="dark:text-white">
                <h1 className="text-5xl font-bold text-center uppercase">Our <span className="text-secondary">Popular</span> Classes</h1>
                <div className="w-[40%] text-center mx-auto my-4">
                    <p className="text-gray-500">Explore our popular classes.Here is some popular classes based on home many students enrolled.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {
                    classes.slice(0, 9).map((item, index) => <Card key={index} item={item} />)
                }
            </div>
        </div>
    )
}

export default PopularClasses