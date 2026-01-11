import React from "react";
import { IoMdRose } from "react-icons/io";
import {
  FaInstagram,
  FaXTwitter,
  FaPinterest,
  FaFacebookF,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-40">
       <hr className="text-gray-300" />
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        <div>
          <p className="text-3xl font-bold font-dancing flex items-center gap-2 pb-4 font-dancing">
            <IoMdRose className="inline" />
            GlamSide
          </p>
          <p className="w-full md:w-2/3 ">
            India's number one trusted brand for modern women fashion
            essentials. We bring top quality products, custom services and a
            seamless shopping experiences.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivary</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1">
            <li>+1-234-567-8901</li>
            <li>hello@glamside.com</li>
            <div className="flex  gap-4 mt-4 text-xl">
              <a href="#" className="hover:scale-110">
                <FaPinterest />
              </a>
              <a href="#" className="hover:scale-110">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:scale-110">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:scale-110">
                <FaInstagram />
              </a>
            </div>
          </ul>
        </div>
      </div>

      <div>
        <hr className="text-gray-300 mt-20" />
        <p className="py-5 text-sm text-center">
          &copy; 2026 GLAMSIDE - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
