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
`;

const Nav = styled.nav`
  margin: 0 10vw;
  padding-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: white;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  font-weight: 700;
  text-transform: uppercase;
  color: hsl(180, 14%, 20%);
  @media (min-width: 1440px) {
    width: 7rem;
    height: 7rem;
    font-size: 1.3rem;
  }
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
