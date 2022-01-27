import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// *Icons
import SearchIcon from "icons/SearchIcon";
import MenuIcon from "icons/MenuIcon";
import { useDispatch } from "react-redux";
import { restartScroll, search, showMenu } from "redux/actions/appAction";
import toast from "react-hot-toast";

const NavigationMobileSt = styled.nav`
  width: 100%;
  height: 3.125rem;
  /* background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%); */
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: start;
  align-items: center;
  /* padding: 0 4rem; */
  /* background: #0c0c0c; */
  .hamburgerBtn {
    width: 2rem;
    height: 2rem;
    /* background: red; */
    margin-left: 1rem;
    border-style: none;
    outline: none;
    background: none;
    .sysIconMenu {
      font-size: 2rem;
      color: white;
    }
  }
  .title {
    /* position: absolute; */
    margin-left: 0.5rem;
    font-family: "Roboto 700";
    font-size: 1.2rem;
    text-decoration: none;
    color: #ffffff;
    text-shadow: 1px 1px 3px black;
    /* background: lime; */
  }

  .showSearchBtn {
    position: absolute;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    border-style: none;
    background: none;

    .icon-submit {
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      background: none;
      transition: 0.1s;
      color: #ffffff;
    }
  }

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: none;
  }
`;
const SearchMobileSt = styled.form`
  position: absolute;
  right: 0.8rem;
  width: 18rem;
  height: 2.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 0.3rem;
  background: #1f1d1d;
  background: #ebebeb;

  .search-input {
    height: 100%;
    width: calc(100% - 3rem);
    padding: 0 1rem;
    font-family: "Roboto 300";
    color: black;
    font-size: 1rem;
    outline: none;
    border-style: none;
    background: none;
    background: none;
    color: #000000;
    border-radius: 0.3rem;
  }
  .btn-submit {
    width: 3rem;
    height: 100%;
    cursor: pointer;
    border-style: none;
    background: none;

    .icon-submit {
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      background: none;
      transition: 0.1s;
      color: #161616;
      background: none;
      &:hover {
        /* transform: scale(1.1); */
        transition: 0.1s;
        color: #000000;
      }
    }
  }
  animation-name: exampleMobile;
  animation-duration: 0.3s;
  @keyframes exampleMobile {
    from {
      width: 2.5rem;
    }
    to {
      width: 18rem;
    }
  }
  @media only screen and (min-width: 568px) {
    display: none;
  }
`;
const NavigationMobile = (props: any) => {
  const searchRefMobile = useRef<any>();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const notify = () => toast.error("El buscador esta vacio!");
  const timerRef = useRef<any>(null);

  // !Handle change con busqueda automarica cada .5seg
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    //     console.log(value.length);
    clearTimeout(timerRef.current);
    if (value.length >= 1) {
      navigate(`/browser/search?query=${value}`);
      dispatch(search(value));
    }
    setState(value);
  };
  // ! handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.trim() === "") return notify();
    navigate(`/browser/search?query=${state}`);
  };

  const [showSearch, setShowSearch] = useState(false);
  // !Test Icons Search***************************************
  let refMobile = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    setShowSearch(true);
    if (refMobile.current && !refMobile.current.contains(event.target)) {
      props.onClickOutside && props.onClickOutside();
      //       console.log("click");
      setShowSearch(false);
    }
  };
  //   useEffect(() => {
  //     document.addEventListener("click", handleClickOutside, true);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside, true);
  //     };
  //   });
  // !Open Menu
  const closeMenu = () => {
    dispatch(showMenu(true));
  };
  return (
    <NavigationMobileSt style={{ background: props.bg }}>
      <button className="hamburgerBtn" onClick={closeMenu}>
        <MenuIcon className="sysIconMenu" />
      </button>
      {!showSearch && (
        <Link
          className="title"
          to="/browser/home"
          onClick={() => dispatch(restartScroll("home", 0))}
        >
          Movie Store Cbba
        </Link>
      )}

      <button
        className="showSearchBtn"
        type="submit"
        onClick={() => setShowSearch(true)}
        style={showSearch ? { display: "none" } : { display: "flex" }}
      >
        <SearchIcon className="icon-submit" />
      </button>

      {showSearch && (
        <SearchMobileSt onSubmit={handleSubmit} ref={refMobile}>
          <input
            ref={searchRefMobile}
            className="search-input"
            type="text"
            name="search"
            placeholder="Buscar..."
            onChange={(e) => handleChangeSearch(e)}
            autoFocus
          />
          <button className="btn-submit" type="submit">
            <SearchIcon className="icon-submit" />
          </button>
        </SearchMobileSt>
      )}

      {/* <span className="exit" onClick={logout} title="salir">
        <ExitIcon className="sysIconExit" />
      </span> */}
    </NavigationMobileSt>
  );
};

export default NavigationMobile;
