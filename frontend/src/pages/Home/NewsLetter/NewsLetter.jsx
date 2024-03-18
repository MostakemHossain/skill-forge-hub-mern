import { useState } from "react";

const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the submission of the email, for example, sending it to your backend server
        console.log("Submitted email:", email);
        // Clear the email field after submission
        setEmail("");
    };

    return (
        <div className="md:w-[60%] mx-auto p-10 md:border border-gray-300 rounded-lg mt-10">
            <h2 className="md:text-5xl text-3xl font-semibold mb-2 text-center">Subscribe to our Newsletter</h2>
            <p className="text-gray-700 p-4 text-center md:text-3xl text-xl mb-4">What us to email you with the latest blockbuster news</p>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                    <input
                        type="email"
                        className="w-full md:py-4 py-2 px-3 placeholder-gray-400 focus:outline-none rounded-full"
                        placeholder="example@company.com"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-secondary w-[40%] text-white md:px-4 px-2 md:py-4 py-2 font-semibold hover:bg-blue-600"
                    >
                        Subscribe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsLetter;
