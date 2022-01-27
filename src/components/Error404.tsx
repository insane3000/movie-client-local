import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setModal } from "redux/actions/appAction";
import styled from "styled-components";
const ErrorSt = styled.div`
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  h1 {
    font-family: "Roboto 900", sans-serif;
    font-weight: 900;
    font-size: 4rem;
    text-align: center;
    /* margin-top: 6rem; */
  }
  h2 {
    font-family: "Roboto 500", sans-serif;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
  }
  span {
    font-family: "Roboto 100", sans-serif;
    font-weight: 900;
    font-size: 1rem;
    margin-top: 0.5rem;
    color: white;
    text-align: center;
  }

  .btnSubmit {
    width: 15rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    text-decoration: none;
    font-family: "Roboto 900";
    font-size: 2rem;
    outline: none;
    border-style: none;
    border-radius: 0.3rem;
    cursor: pointer;
    background: #5100ff;
    color: white;
    transition: 0.1s;
    margin-top: 2rem;
    &:hover {
      background: white;
      color: #000000;
      transition: 0.1s;
    }
  }
  // !Estilos para DESKTOP
  @media only screen and (min-width: 568px) {
    h1 {
      font-size: 6rem;
    }
    h2 {
      font-size: 3rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
`;
const Error404 = () => {
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(setModal("", false));
  };
  return (
    <ErrorSt>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <span>La pagina que quieres buscar, no esta disponible.</span>
      <Link className="btnSubmit" to="/" onClick={handleModal}>
        Ir a inicio
      </Link>
    </ErrorSt>
  );
};

export default Error404;
