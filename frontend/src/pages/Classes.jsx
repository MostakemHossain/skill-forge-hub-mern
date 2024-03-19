import { Transition } from '@headlessui/react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import useAxiosFetch from "../hooks/useAxiosFetch";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [hoverCard, setHoverCard] = useState(null);
  const axiosFetch = useAxiosFetch();

  const handleHover = (index) => {
    setHoverCard(index)
  }

  useEffect(() => {
    axiosFetch.get('/classes')
      .then((res) => {
        setClasses(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <div className="mt-28 p-4">
        <h1 className="text-4xl font-bold text-center text-secondary">All Classes</h1>
      </div>
      <div className="my-16 w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {classes.map((cls, i) => (
          <div key={i} className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[390px]  mx-auto ${cls.vailableSeats < 1 ? "bg-red-300" : "bg-white"} dark:bg-slate-300 rounded-lg shadow-2xl overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={() => setHoverCard(null)}
          >
            <div className="relative h-48">
              <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoverCard === i ? "opacity-60" : ""}`} />
              <img src={cls.image} alt="" className="object-cover w-full h-full" />
              <Transition
                show={hoverCard === i}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 hover:bg-red-700'>Add to Card</button>
                </div>
              </Transition>

            </div>
            <div className='px-6 py-2'>
              <h3 className="font-bold">{cls.name}</h3>
              <p className='text-gray-500 text-xs mt-1'>Instructor:{cls.instructorName}</p>
              <div className='flex justify-between mt-2 items-center'>
                <span className='text-red-600 font-bold '>AvailableSeats : {cls.availableSeats}</span>
                <span className='text-green-500 font-bold'>${cls.price}</span>
              </div>
              <div className=''>
                <Link to={`/class/${cls._id}`} className=''>
                  <button className='px-4 buttom-0 py-2 my-4 rounded-lg w-full mx-auto text-white disabled:bg-red-500 bg-secondary hover:bg-red-700'>View</button>
                </Link>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Classes;
