import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialIcon = ({ icon, link }) => {
  return (
    <a
      href={link}
      className="mx-2 text-white text-2xl bg-amber-500 py-2 px-2 rounded-md"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ text, link }) => {
  return (
    <li>
      <a className="text-sm font-bold hover:underline" href={link}>
        {text}
      </a>
    </li>
  );
};

const Footer = () => {
  const socialIcons = [
    { icon: <FaFacebook />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaYoutube />, link: "#" },
  ];

  const footerLinks = [
    { text: "Data Desa", link: "#" },
    { text: "Data Dusun", link: "#" },
    { text: "Sambutan Kepala Desa", link: "#" },
    { text: "Perangkat Desa", link: "#" },
    { text: "Keunggulan", link: "#" },
    { text: "Kesenian Khas", link: "#" },
    { text: "Galeri", link: "#" },
  ];

  return (
    <footer className="bg-white py-14">
      <div className="container lg:px-32 px-8">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <div className="flex items-center">
                <a href="#" className="mr-4">
                  <Image
                    src="/images/dummy-logo-2.png"
                    width={32}
                    height={32}
                    alt=""
                  />
                </a>
                <p className="text-amber-500 text-lg font-bold italic">
                  Desa Pendil
                </p>
              </div>
              <p className="w-60 mt-2 font-bold">
                Kecamatan Banyuanyar, Kabupaten Probolinggo, Jawa Timur,
                Indonesia.
              </p>
              <div className="flex mt-14 -mx-2">
                {socialIcons.map((icon, index) => (
                  <SocialIcon key={index} icon={icon.icon} link={icon.link} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-14 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-bold mb-4">Berita Desa Pendil</h3>
                <nav className="list-none">
                  <FooterLink text="Semua Berita" link="#" />
                </nav>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Layanan Publik</h3>
                <nav className="list-none">
                  {footerLinks.slice(0, 2).map((link, index) => (
                    <FooterLink key={index} text={link.text} link={link.link} />
                  ))}
                </nav>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Profil Desa</h3>
                <nav className="list-none">
                  {footerLinks.slice(2).map((link, index) => (
                    <FooterLink key={index} text={link.text} link={link.link} />
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-amber-500 mt-10 py-5">
        <p className="text-center text-white">
          © Brand 2020 - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
