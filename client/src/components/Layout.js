import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import bannerMobile from "../assets/bg-header-mobile.svg";
import bannerDesktop from "../assets/bg-header-desktop.svg";
import { useState } from "react";
import { useEffect } from "react";

const Header = styled.header`
  background-color: hsl(180, 8%, 52%);
  background-image: ${(props) => `url(${props.bgImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  height: 20vh;
  width: 100%;
  overflow: hidden;
`;

const Layout = () => {
  const [bannerImage, setBannerImage] = useState(null);

  const handelBannerImageChange = () => {
    if (window.innerWidth > 1440) {
      setBannerImage(bannerDesktop);
    } else {
      setBannerImage(bannerMobile);
    }
  };
  useEffect(() => {
    if (bannerImage) {
      handelBannerImageChange();
    }

    window.addEventListener("resize", handelBannerImageChange);

    return () => {
      window.removeEventListener("resize", handelBannerImageChange);
    };
  }, []);

  return (
    <>
      <Header bgImage={bannerImage}></Header>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default Layout;
