import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import bannerMobile from "../assets/bg-header-mobile.svg";
import bannerDesktop from "../assets/bg-header-desktop.svg";
import { useState } from "react";
import { useEffect } from "react";

const Header = styled.header`
  position: relative;
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

const FilterList = styled.div`
  position: absolute;
  width: 90%;
  max-width: 1200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Clear = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FilterElements = styled.div`
  display: flex;
`;

const FilterElement = styled.div`
  margin-right: 1rem;
  font-weight: 700;
  background-color: #e4e8e8;
  gap: 1rem;
  padding-left: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    background-color: hsl(180, 8%, 52%);
    color: white;
    font-weight: 700;
    padding: 0.3rem 0.4rem;
    cursor: pointer;
    &:hover {
      background-color: hsl(180, 14%, 20%);
    }
  }
`;

const Layout = ({ filter, setFilter }) => {
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

  const removeFilter = (name) => {
    const filtred = filter.filter((x) => x !== name);
    setFilter(filtred);
  };

  return (
    <>
      <Header bgImage={bannerImage}>
        <Nav>
          <StyledLink to="/">Job List</StyledLink>
          <StyledLink to="/add">Add new job</StyledLink>
        </Nav>
        <FilterList>
          <FilterElements>
            {filter.length > 0 &&
              filter.map((skill, index) => (
                <FilterElement key={index}>
                  {skill} <span onClick={() => removeFilter(skill)}>X</span>
                </FilterElement>
              ))}
          </FilterElements>
          <Clear onClick={() => setFilter([])}>Clear</Clear>
        </FilterList>
      </Header>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default Layout;
