import { FaBurger, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-gray-900 pt-[5rem] pb-[5rem]">
            <div className="w-[80%] pb-[2rem] border-b-[2px] border-b-gray-300 border-opacity-50 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3rem] items-start">
                <div>
                    <div className="flex items-center space-x-2">
                        <FaBurger className="w-[1.2rem] h-[1.2rem] sm:w-[1.4rem] sm:h-[1.4rem] text-orange-500" />
                        <h1 className="text-[20px] sm:text-[30px] font-semibold text-white">
                            Skill Forge Hub
                        </h1>
                    </div>
                    <p className="text-white text-opacity-60 mt-[.3rem]">
                        Empower your learning journey with our comprehensive courses and expert instructors. Dive into a world of knowledge and unlock your full potential.
                    </p>
                    <p className="text-white mt-[1rem]">mostakememon123@gmail.com</p>
                    <p className="text-red-300 text-[19px] font-bold">+1 (123) 456-7890</p>
                </div>

                <div className="text-gray-600">
                    <h1 className="text-[23px] font-semibold mb-[2rem] text-white">
                        Courses
                    </h1>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Programming Fundamentals
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Web Development
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Data Science
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Artificial Intelligence
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Graphic Design
                    </p>
                </div>
                <div className="text-gray-600">
                    <h1 className="text-[23px] font-semibold mb-[2rem] text-white">
                        Quick Links
                    </h1>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Home
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        About Us
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Courses
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        Contact Us
                    </p>
                    <p className="mt-[0.7rem] hover:text-yellow-300 transition-all cursor-pointer w-fit duration-300">
                        News & Events
                    </p>
                </div>

                <div>
                    <h1 className="text-[23px] font-semibold mb-[2rem] text-white uppercase">
                        Operating Hours
                    </h1>
                    <p className="text-white text-[18px]">
                        Monday-Friday: <span className="text-yellow-300">9AM - 6PM</span>
                    </p>
                    <p className="text-white text-[18px]">
                        Saturday-Sunday: <span className="text-yellow-300">Closed</span>
                    </p>
                    <div className="flex items-center space-x-6 mt-[2rem]">
                        <FaFacebook className="w-[1.5rem] h-[1.5rem] text-blue-400" />
                        <FaInstagram className="w-[1.5rem] h-[1.5rem] text-red-400" />
                        <FaTwitter className="w-[1.5rem] h-[1.5rem] text-blue-600" />
                    </div>
                </div>
            </div>
            <p className="text-gray-600 hover:text-yellow-500 text-center mt-[1.3rem] text-[18px]">
                © 2024 Learning Management System. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
