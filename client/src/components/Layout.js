import React from "react";
import { Link, Outlet } from "react-router-dom";
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

const Nav = styled.nav`
  margin: 3rem 10vw;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: white;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  color: hsl(180, 14%, 20%);
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
    if (bannerImage === null) {
      handelBannerImageChange();
    }

    window.addEventListener("resize", handelBannerImageChange);

    return () => {
      window.removeEventListener("resize", handelBannerImageChange);
    };
  }, []);

  return (
    <>
      <Header bgImage={bannerImage}>
        <Nav>
          <StyledLink to="/">Job List</StyledLink>
          <StyledLink to="/add">Add new job</StyledLink>
        </Nav>
      </Header>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default Layout;
