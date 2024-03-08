import banner1 from "../../../assets/banner1.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen bg-cover" style={{backgroundImage: `url(${banner1})`}}>
      <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-opacity-60 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
        <div>
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl">We Provide</p>
            <h1 className="md:text-7xl text-4xl font-bold">Best Effective online Course</h1>
            <div className="md:w-1/2">
              <p>
                Unlock the doors to knowledge and professional growth through our cutting-edge Learning Management System (LMS). Experience interactive online courses designed to empower you with practical skills and insights. Our expert instructors guide you through real-world applications, ensuring a hands-on and effective learning journey.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">Join Today</button>
              <button className="px-7 py-3 rounded-lg border font-bold uppercase hover:bg-secondary">Explore Courses</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
