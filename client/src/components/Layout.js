import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import bannerMobile from "../assets/bg-header-mobile.svg";

const Header = styled.header`
  background-color: hsl(180, 8%, 52%);
  height: 20vh;
  width: 100%;
  overflow: hidden;
`;

const Banner = styled.img`
  height: 100%;
`;
const Layout = () => {
  return (
    <>
      <Header>
        <Banner src={bannerMobile} alt="banner" />
      </Header>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default Layout;
