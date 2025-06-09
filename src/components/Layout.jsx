import React, { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Loader from "./common/Loader";

const paths = new Set(["/", "/contact-us", "/about-us"]);

export default function Layout() {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);
  const isLandingPage = paths.has(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isLandingPage) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLandingPage]);

  return (
    <Suspense fallback={<Loader />} key={location.key}>
      <Header />
      <main>
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
    </Suspense>
  );
}
