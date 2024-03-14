import course2 from "../../../assets/banner2.jpg"
import course3 from "../../../assets/course2.jpeg"
import course1 from "../../../assets/course3.jpeg"
import course6 from "../../../assets/course6.jpeg"
import course7 from "../../../assets/course7.jpeg"

const Gallary = () => {
  return (
    <div className="md:w-[90%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-6xl uppercase dark:text-white font-bold text-center">Our Gallery</h1>
      </div>
      <div className="md:grid grid-cols-2 items-center justify-center gap-4">
        <div className="mb-4 md:mb-0">
          <img src={course2} alt="" className="md:h-[720px] w-full mx-auto rounded-sm" />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <div>
            <img src={course1} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={course6} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={course7} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={course3} alt="" className="md:h-[350px] rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallary