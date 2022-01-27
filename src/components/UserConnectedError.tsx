// import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModal } from "redux/actions/appAction";
import styled from "styled-components";
// // *Socket.io
// import socket from "config/Socket";
// import { StoreInterface } from "interfaces/storeTemplate";
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
    width: auto;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    text-decoration: none;
    font-family: "Roboto 900";
    font-size: 2rem;
    padding: 0 1rem;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const app = useSelector((store: StoreInterface) => store.app);
  //   const [online, setOnline] = useState(0);
  const handleModal = () => {
    dispatch(setModal("", false));
    navigate("/");
  };
  //   useEffect(() => {
  //     socket.emit("userID", app.login.user);
  //     socket.on("users", (data) => {
  //       let userID = data.filter((i: any) => i.userID === app.login.user);
  //       //       console.log(userID.length);
  //       if (userID.length < 2) {
  //         navigate("/");
  //       }
  //     });
  //   }, []);
  return (
    <ErrorSt>
      <h1>Error</h1>
      <h2>Cierra todo e intenta de nuevo.</h2>
      {/* <span>Conectados: {online} </span> */}

      <button className="btnSubmit" onClick={handleModal}>
        Intentar de nuevo
      </button>
    </ErrorSt>
  );
};

export default Error404;
