import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import bannerMobile from "../assets/bg-header-mobile.svg";
const Container = styled.div`
  position: relative;
`;

const Header = styled.header`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
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
    <Container>
      <Header>
        <Banner src={bannerMobile} alt="banner" />
      </Header>
      <GlobalStyles />
      <Outlet />
    </Container>
  );
};

export default Layout;
