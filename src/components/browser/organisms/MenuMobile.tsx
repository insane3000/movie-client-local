import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginServer, showMenu } from "redux/actions/appAction";
import styled from "styled-components";
import { useNavigate } from "react-router";

// *images
import Logo512 from "img/logo512.png";
import { Link } from "react-router-dom";
// *Icons
import ExitIcon2 from "icons/ExitIcon2";
import HomeIcon from "icons/HomeIcon";
import PremieresIcon from "icons/PremieresIcon";
import UserIconLight from "icons/UserIconLight";
import VideoIcon from "icons/VideoIcon";
import CloseIcon from "icons/CloseIcon";
import { VscBookmark } from "react-icons/vsc";

const MenuSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000000cf;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: white;

  .gradient {
    width: 100%;
    height: 100%;
  }

  .sysClose {
    position: absolute;
    top: 2rem;
    left: 74.5%;
    font-size: 2.5rem;
    background: white;
    border-radius: 100%;
    color: black;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    animation-name: closeMenu;
    animation-duration: 0.4s;
    @keyframes closeMenu {
      from {
        top: 0;
      }
      to {
        top: 2rem;
      }
    }
    &:hover {
      background: #d6d6d6;
    }
  }

  .menuDetails {
    width: 80%;
    height: 100%;
    background: #0e0d0d;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    animation-name: example;
    animation-duration: 0.4s;
    overflow-y: scroll;
    @keyframes example {
      from {
        left: -80%;
      }
      to {
        left: 0;
      }
    }
    .logo {
      width: 80%;
      height: 10rem;
      /* overflow: hidden; */
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* border-bottom: 0.0625rem solid #1a1a1a; */
      .logo-img {
        width: 5rem;
        height: 5rem;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .logo-title {
        font-family: "Roboto 900";
        color: white;
        font-size: 1.5rem;
      }
    }
    .home {
      width: 80%;
      height: 3rem;
      line-height: 3rem;
      /* overflow: hidden; */
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      /* border-bottom: 0.0625rem solid #1a1a1a; */
      padding: 0 0.5rem;
      font-family: "Roboto 300";
      color: #d6d6d6;
      font-size: 1rem;
      text-decoration: none;
      .sysIconHome {
        /* background: red; */
        font-size: 2rem;
        padding: 0.25rem;
      }
    }
    .active {
      color: white;
      background: #0a0a0a;
      .sysIconHome {
        color: #ffffff;
      }
    }
    .series {
      font-family: "Roboto 900";
    }
    .movies-genre-container {
      width: 80%;
      height: auto;
      /* overflow: hidden; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      border-top: 0.0625rem solid #1a1a1a;

      border-bottom: 0.0625rem solid #1a1a1a;
      padding: 0rem 0.5rem;
      /* font-family: "Roboto 700";
      color: #ebebeb;
      font-size: 1rem;
      text-decoration: none; */
      /* background: red; */
      .title-grid {
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        /* overflow: hidden; */
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        /* padding: 0 0.5rem; */
        font-family: "Roboto 900";
        color: #c0c0c0;
        font-size: 1rem;
        text-decoration: none;
        .sysIconHome {
          /* background: red; */
          font-size: 2rem;
          padding: 0.25rem;
        }
      }
      .ul {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 45% 55%;
        grid-auto-rows: 2.5rem;
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        /* background: lime; */
        .li {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          text-decoration: none;
          font-family: "Roboto 300";
          font-size: 0.9rem;
          color: #c0c0c0;
          border-radius: 0.3rem;
        }
      }
    }
  }

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: none;
  }
`;
const MenuMobile = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  // !Close Menu
  const closeMenu = () => {
    dispatch(showMenu(false));
  };
  // !Exit btn
  const logout = () => {
    dispatch(loginServer("", "", "", ""));
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
    localStorage.setItem("name", "");
    localStorage.setItem("fails", "0");
    navigate(`/`);
  };
  const color = [
    { to: "accion", name: "Acción" },
    { to: "animacion", name: "Animación" },
    { to: "anime", name: "Anime" },
    { to: "aventura", name: "Aventura" },
    { to: "belico", name: "Bélico" },
    { to: "ciencia-ficcion", name: "Cienca Ficción" },
    { to: "comedia", name: "Comedia" },
    { to: "documental", name: "Documental" },
    { to: "drama", name: "Drama" },
    { to: "fantasia", name: "Fantasia" },
    { to: "intriga", name: "Intriga" },
    { to: "romance", name: "Romance" },
    { to: "terror", name: "Terror" },
    { to: "thriller", name: "Thriller" },
    { to: "western", name: "Western" },
  ];
  //   const handleClose = () => {
  //     dispatch(showMenu(false));
  //   };
  return (
    <MenuSt>
      <div className="gradient" onClick={closeMenu}></div>
      <div className="menuDetails">
        <div className="logo">
          <img className="logo-img" src={Logo512} alt="" />
          <h2 className="logo-title">Movie Store Cbba</h2>
        </div>

        <NavLink className="home" to="/browser/home" onClick={closeMenu}>
          <HomeIcon className="sysIconHome" /> Inicio
        </NavLink>
        <NavLink className="home" to="/browser/premieres" onClick={closeMenu}>
          <PremieresIcon className="sysIconHome" /> Estrenos
        </NavLink>
        <NavLink className="home" to="/browser/category/series-tv" onClick={closeMenu}>
          <PremieresIcon className="sysIconHome" /> Series TV
        </NavLink>
        {/* <NavLink className="home" to="/browser/profile" onClick={closeMenu}>
          <UserIconLight className="sysIconHome" /> Perfil
        </NavLink> */}
        <NavLink className="home" to="/browser/plans" onClick={closeMenu}>
          <VscBookmark className="sysIconHome" /> Planes
        </NavLink>
        {/* <NavLink className="home series" to="/browser/series" onClick={closeMenu}>
          Series
        </NavLink> */}
        <div className="movies-genre-container">
          <section className="title-grid">
            <VideoIcon className="sysIconHome" /> Géneros:
          </section>
          <section className="ul">
            {color.map((i) => (
              <Link
                className="li"
                to={`/browser/category/${i.to}`}
                key={i.name}
                onClick={closeMenu}
              >
                <span className="text">{i.name}</span>
              </Link>
            ))}
          </section>
        </div>

        <span className="home" onClick={logout} title="salir">
          <ExitIcon2 className="sysIconHome" /> Salir
        </span>
      </div>
      <CloseIcon className="sysClose" onClick={closeMenu} />
    </MenuSt>
  );
};

export default MenuMobile;
