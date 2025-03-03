import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 text-white">
      <NavBar />
      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 md:p-12">
              <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
                Welcome to WebChat
              </h1>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                Connect with friends and family instantly through our secure and
                user-friendly messaging platform.
              </p>
              <Link to="/login">
                <button className="bg-white text-blue-900 font-semibold py-3 px-6 cursor-pointer rounded-lg transition duration-300 transform hover:scale-105 hover:bg-gray-100">
                  Start Chatting
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
            <img
              src="/images/Login.jpeg"
              alt="Chat Illustration"
              className="w-full max-w-lg rounded-3xl shadow-2xl border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 space-y-20">
        <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/img-1.jpeg"
              alt="Real-time Chat"
              className="w-full max-w-sm rounded-2xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition duration-300"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left p-6">
            <h2 className="text-3xl font-semibold text-white mb-4 drop-shadow-lg">
              Real-time Messaging
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Experience lightning-fast, real-time messaging with instant
              message delivery. Stay connected anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/img-2.jpeg"
              alt="Secure Messaging"
              className="w-full max-w-sm rounded-2xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition duration-300"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left p-6">
            <h2 className="text-3xl font-semibold text-white mb-4 drop-shadow-lg">
              End-to-End Encryption
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Your privacy is our top priority. All conversations are encrypted,
              ensuring secure and private communication.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/img-3.jpeg"
              alt="User Friendly UI"
              className="w-full max-w-sm rounded-2xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition duration-300"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left p-6">
            <h2 className="text-3xl font-semibold text-white mb-4 drop-shadow-lg">
              Easy to Use Interface
            </h2>
            <p className="text-gray-200 leading-relaxed">
              A simple, modern, and user-friendly interface designed for smooth
              communication without any complexity.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
