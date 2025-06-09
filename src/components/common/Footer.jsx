import { Link } from "react-router-dom";
import { pages } from "../../constants/index.js";
import NewsLetterForm from "./NewsLetterForm.jsx";
import { useGetSocialLinksQuery } from "../../redux/api/socialApi.js";

const otherPages = [
  {
    title: "Terms of Service",
    link: "/terms-of-services",
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy",
  },
];

export default function Footer() {
  return (
    <div className="w-full">
      {/* Footer Content */}
      <footer className="pt-16 w-full -mt-1 footer">
        <div className="bg-[#141B22] pt-10 sm:pt-20">
          <div className="max-w-[1140px] mx-auto max-lg:px-4 lg:px-0">
            <div className="bg-white rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-4 max-md:p-3">
              <div className="text-primary-black ">
                <h3 className="md:text-2xl lg:text-[26px] text-primary-black leading-[125%] max-md:text-center font-medium  max-md:font-semibold max-md:p-2">
                  Register now so you don't miss updates
                </h3>
              </div>
              <div className="w-full md:w-auto p-3 max-md:p-0">
                <NewsLetterForm />
              </div>
            </div>
          </div>

          {/* Navigation and Social - Simplified layout */}
          <div className="max-w-[1140px] mx-auto max-lg:px-4 lg:px-0">
            <div className="py-8 md:py-10 flex flex-col md:flex-row justify-between items-center">
              {/* Nav Links */}
              <nav className="text-white flex gap-8">
                {pages.map((page, i) => (
                  <Link
                    key={i}
                    to={page.link}
                    className="hover:text-blue-400 transition-colors font-normal text-[14px] tracking-normal"
                  >
                    {page.title}
                  </Link>
                ))}
              </nav>

              {/* Mobile Divider */}
              <hr className="md:hidden w-full my-4 border-primary-white/20" />

              {/* Social Icons */}
              <SocialHandles />
            </div>
          </div>
          {/* Divider */}
          <div className="max-md:hidden max-w-[1140px] mx-auto max-lg:px-4 lg:px-0">
            <div className="border-t border-white max-md:border-[#FFFFFF33]"></div>
          </div>
          {/* Copyright and Legal - Simplified layout */}
          <div className="max-w-[1140px] mx-auto max-lg:px-4 lg:px-0">
            <div className="md:pt-8 pb-10 flex flex-col md:flex-row justify-between md:items-center items-start">
              {/* Desktop: Left | Mobile: Bottom */}
              <div className="order-3 md:order-1 mt-4 md:mt-0">
                <p className="text-sm text-gray-400">
                  © 2025 Pet Now. All rights reserved.
                </p>
              </div>

              {/* Desktop: Center | Mobile: Top */}
              <div className="order-1 md:order-2 mb-4 md:mb-0">
                <span className="text-[#5558FF] text-[32px] font-normal font-agbalumo">
                  Pet 11
                </span>
                {/* <Link to={"/"}>
                  <img
                    src="/Pet_11_Logo.webp"
                    alt="logo"
                    className="w-[40px] h-[47px]"
                  />
                </Link> */}
              </div>

              {/* Desktop: Right | Mobile: Middle */}
              <div className="order-2 md:order-3 flex flex-col md:flex-row mb-4 md:mb-0">
                <div className="flex gap-6 ">
                  {otherPages.map((page, i) => (
                    <Link
                      key={i}
                      to={page.link}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialHandles() {
  const { data, isLoading, isError } = useGetSocialLinksQuery();

  if (isLoading) return null;
  const socialLinks = !isError ? data.data : [];

  return (
    <div className="flex gap-10">
      {socialLinks.map((item) => (
        <a key={item._id} href={item.link}>
          <div className="w-6 h-6 bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="sr-only">{item.link}</span>
            <img src={item.logo} alt={item.link} />
          </div>
        </a>
      ))}
    </div>
  );
}
