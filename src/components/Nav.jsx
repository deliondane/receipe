import React, { useContext } from "react";
import { DataContext } from "../App";
import { NavLink } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import { TbCookieManFilled } from "react-icons/tb";
import { PiCookingPotFill } from "react-icons/pi";
import { FaCookieBite } from "react-icons/fa";
import { GiFishCooked } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";

const Nav = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return <h1 className="loading">데이터 로딩 중입니다.</h1>;
  }

  const categories = [...new Set(data.map((item) => item.RCP_PAT2))];

  const activeStyle = {
    color: "#ff4e6b"
  };
  return (
    <div className="nav">
      <div className="inner">
        <ul className="menu">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
            <GiCook />
            </NavLink>
          </li>
          {categories.map((category) => (
            <li key={category.RCP_SEQ}>
              <NavLink
                to={`category/${category}`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {category === "반찬" && <TbCookieManFilled />}
                {category === "국&찌개" && <PiCookingPotFill />}
                {category === "후식" && <FaCookieBite />}
                {category === "일품" && <GiFishCooked />}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
