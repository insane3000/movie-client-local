import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
import styled from "styled-components";
import Spinner05 from "components/browser/atoms/Spinner05";
import Countdown from "react-countdown";
// *Images
import Banner from "img/banner.jpg";
const WelcomeSt = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .imgBackground {
    width: 100vw;
    height: 100vh;
    display: none;
    position: absolute;
    object-fit: cover;
    filter: brightness(20%);
  }
  .gradient-top {
    width: 100%;
    height: 100%;
    display: none;

    position: absolute;
    background: rgb(7, 7, 7);
    background: linear-gradient(300deg, #000000 0%, rgba(255, 0, 0, 0) 50%);
  }
  .gradient-bottom {
    width: 100%;
    height: 100%;
    display: none;

    position: absolute;
    background: rgb(7, 7, 7);
    background: linear-gradient(130deg, #000000 0%, rgba(255, 0, 0, 0) 50%);
  }

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .imgBackground {
      width: 100vw;
      height: 100vh;
      display: flex;

      position: absolute;
      object-fit: cover;
      filter: brightness(20%);
    }
    .gradient-top {
      width: 100%;
      height: 100%;
      display: flex;

      position: absolute;
      background: rgb(7, 7, 7);
      background: linear-gradient(300deg, #000000 0%, rgba(255, 0, 0, 0) 50%);
    }
    .gradient-bottom {
      width: 100%;
      height: 100%;
      display: flex;

      position: absolute;
      background: rgb(7, 7, 7);
      background: linear-gradient(130deg, #000000 0%, rgba(255, 0, 0, 0) 50%);
    }
  }
`;
const LoginSt = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .formLogin {
    width: 100%;
    height: 100%;
    /* position: absolute;
    right: 15vw; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0e0d0d;
    border-radius: 0.5rem;
    /* box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 15px; */

    .titleBrand {
      font-family: "Roboto 900";
      font-size: 2rem;
      color: #5900ff;
      margin-bottom: 1rem;
    }
    .cell-input {
      width: 80%;
      height: 3rem;
      font-family: "Roboto 300";
      font-size: 1rem;
      color: white;
      padding: 0 1rem;

      background: #000000;
      border-radius: 0.5rem;
      border-style: none;
      outline: none;
      margin-bottom: 1rem;
    }
    .checkbox-label {
      width: 80%;
      height: 1rem;
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 1rem;
      .checkbox {
        margin-right: 0.4rem;
        margin-left: 0.4rem;
      }
      .label {
        font-family: "Roboto 300";
        font-size: 1rem;
        color: #c3c3c3;
      }
    }
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }

    .btnSubmit {
      width: 80%;
      height: 3rem;
      font-family: "Roboto 900";
      font-size: 1.2rem;
      outline: none;
      border-style: none;
      border-radius: 0.5rem;
      cursor: pointer;
      background: #5100ff;
      color: white;
      transition: 0.1s;

      &:hover {
        background: white;
        color: #000000;
        transition: 0.1s;
      }
    }
  }
  .container-title {
    position: absolute;
    left: 12vw;
    display: none;
    .h1-title {
      font-family: "Roboto 900";
      font-size: 6.5vw;
      color: #5100ff;
      text-shadow: 1px 1px 5px black;
    }
    .h2-title {
      font-family: "Roboto 100";
      font-size: 4vw;
      color: white;
      text-shadow: 1px 1px 5px black;
    }
  }
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .formLogin {
      width: 25rem;
      height: 30rem;
      position: absolute;
      right: 15vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #0e0d0d;
      border-radius: 0.5rem;
      box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 15px;

      .titleBrand {
        font-family: "Roboto 900";
        font-size: 2.5rem;
        color: #5900ff;
        margin-bottom: 2rem;
      }
      .cell-input {
        width: 20rem;
        height: 3.5rem;
        font-family: "Roboto 300";
        font-size: 1.2rem;
        color: white;
        padding: 0 1rem;

        background: #050505;
        border-radius: 0.5rem;
        border-style: none;
        outline: none;
        margin-bottom: 1rem;
      }
      .checkbox-label {
        width: 20rem;
        height: 1rem;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-bottom: 1rem;
        .checkbox {
          margin-right: 0.4rem;
          margin-left: 0.4rem;
        }
        .label {
          font-family: "Roboto 300";
          font-size: 1rem;
          color: #c3c3c3;
        }
      }
      input::-ms-reveal,
      input::-ms-clear {
        display: none;
      }

      .btnSubmit {
        width: 20rem;
        height: 3.5rem;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        outline: none;
        border-style: none;
        border-radius: 0.5rem;
        cursor: pointer;
        background: #5100ff;
        color: white;
        transition: 0.1s;

        &:hover {
          background: white;
          color: #000000;
          transition: 0.1s;
        }
      }
    }
    .container-title {
      position: absolute;
      left: 12vw;
      display: flex;
      flex-direction: column;
      .h1-title {
        font-family: "Roboto 900";
        font-size: 6.5vw;
        color: #5100ff;
        text-shadow: 1px 1px 5px black;
      }
      .h2-title {
        font-family: "Roboto 100";
        font-size: 4vw;
        color: white;
        text-shadow: 1px 1px 5px black;
      }
    }
  }
`;
const LoaderSt = styled.div`
  width: 100%;
  height: 100%;
  background: #070707;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlockUserSt = styled.div`
  width: 100%;
  height: 100%;
  background: #070707;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  position: absolute;
  .title-block {
    color: #5100ff;
    font-family: "Roboto 900";
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .counter {
    width: 80%;
    height: 5rem;
    color: #ffffff;
    font-family: "Roboto 900";
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    border: 0.125rem solid #ff0040;
  }
  .try-again {
    width: 80%;
    height: 5rem;
    font-family: "Roboto 900";
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    color: #ffffff;
    background: #ff0040;
    cursor: pointer;
    :hover {
      color: #000000;
      background: #ffffff;
    }
  }
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    background: #070707;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    color: white;
    position: absolute;
    .title-block {
      color: #5100ff;
      font-family: "Roboto 900";
      font-size: 5rem;
      margin-bottom: 2rem;
    }
    .counter {
      width: 50rem;
      height: 10rem;
      color: #ffffff;
      font-family: "Roboto 900";
      font-size: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      border: 0.125rem solid #ff0040;
    }
    .try-again {
      width: 20rem;
      height: 5rem;
      font-family: "Roboto 900";
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      color: #ffffff;
      background: #ff0040;
      cursor: pointer;
      :hover {
        color: #000000;
        background: #ffffff;
      }
    }
  }
`;
const AlertSt = styled.div`
  width: 80%;
  height: auto;
  text-align: start;
  line-height: 1rem;
  font-family: "Roboto 300";
  font-size: 1rem;
  margin-bottom: 1rem;
  color: red;
  @media only screen and (min-width: 568px) {
    width: 20rem;
  }
`;
const Welcome = () => {
  const codeInput = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    user: "tester",
    password: "•••••••••••",
  });
  const [spinner, setSpinner] = useState(false);
  const [numberFails, setNumberFails] = useState<number>(0);
  const [blockUser, setblockUser] = useState(false);
  //   console.log(numberFails);
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setState({ ...state, [name]: value });
  //   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     console.log(state);
    setSpinner(true);
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/client-login`, {
        user: {
          user: "tester",
          password: "70733808",
        },
      })
      .then(function (response) {
        // if (response.data.login) {
        //   return navigate(`/asdasdasddas`);
        // }
        // console.log(response);
        dispatch(
          loginServer(
            response.data._id,
            response.data.token,
            response.data.role,
            response.data.name
          )
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data._id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("fails", "0");
        navigate(`/browser`);
        // console.log(response);
      })
      .catch(function (error) {
        setSpinner(false);

        setNumberFails(numberFails + 1);
        setState({ user: "", password: "" });
        codeInput.current.focus();
        localStorage.setItem("fails", `${numberFails + 1}`);
        numberFails >= 2 && localStorage.setItem("lastFail", `${Date.now() + 60 * 1000 * 10}`);
        numberFails >= 2 && setblockUser(true);
      });
  };
  //   console.log(numberFails);
  useEffect(() => {
    codeInput.current.focus();

    if (Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()) < 0) {
      localStorage.setItem("lastFail", "0");
    }
    if (parseInt(`${localStorage.getItem("fails")}`) >= 3) {
      localStorage.setItem("fails", "0");
    }
    setNumberFails(
      localStorage.getItem("fails") === null
        ? 0
        : // : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()) >= 0
        parseInt(`${localStorage.getItem("lastFail")}`) === 1
        ? 0
        : parseInt(`${localStorage.getItem("fails")}`)
    );
    setblockUser(
      localStorage.getItem("lastFail") === null
        ? false
        : localStorage.getItem("lastFail") === "0"
        ? false
        : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()) >= 0
        ? true
        : false
    );
  }, []);

  // ! Blockeando Usuario
  const lastFail =
    localStorage.getItem("lastFail") === null
      ? 1000
      : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now());

  //   console.log(Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()));

  // !Componente btn lanzado al terminar el conteo
  const Completionist = () => {
    const handleNavigate = () => {
      setNumberFails(0);
      setblockUser(false);
      setState({ user: "", password: "" });
      codeInput.current.focus();
    };
    return (
      <span className="try-again" onClick={handleNavigate}>
        Intentar de nuevo!
      </span>
    );
  };
  // !Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // !Render a completed state
      localStorage.setItem("fails", "0");
      localStorage.setItem("lastFail", "0");

      return <Completionist />;
    } else {
      // !Render a countdown
      return (
        <span className="counter">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  //!Show Password function
  const inputPassword = useRef<any>(null);
  //   function showPassword() {
  //     var x = inputPassword?.current;
  //     if (x.type === "password") {
  //       x.type = "text";
  //     } else {
  //       x.type = "password";
  //     }
  //   }
  return (
    <WelcomeSt>
      <img className="imgBackground" src={Banner} alt="" />
      <div className="gradient-top"></div>
      <div className="gradient-bottom"></div>
      <LoginSt>
        <form className="formLogin" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="titleBrand">Movie Store Cbba</h2>
          <input
            ref={codeInput}
            name="user"
            className="cell-input"
            type="text"
            defaultValue={state.user}
            //     onChange={handleChange}
            placeholder="Usuario"
            readOnly
          />
          <input
            ref={inputPassword}
            name="password"
            className="cell-input"
            type="password"
            defaultValue={state.password}
            //     onChange={handleChange}
            placeholder="Contraseña"
            readOnly
          />
          {/* <section className="checkbox-label">
            <input
              className="checkbox"
              type="checkbox"
              id="showPassword"
              name="scales"
              onClick={showPassword}
            />
            <label className="label" htmlFor="showPassword">
              Mostrar contraseña
            </label>
          </section> */}

          {numberFails >= 1 && (
            <AlertSt>
              Datos incorrectos o suscripción vencida. <br /> Te quedan {3 - numberFails} intentos.
            </AlertSt>
          )}

          <input className="btnSubmit" type="submit" value="Entrar" />
        </form>
        <div className="container-title">
          <h1 className="h1-title">
            Tus películas <br /> favoritas.
          </h1>
          <span className="h2-title"> Desde cualquier lugar...</span>
        </div>
      </LoginSt>
      {blockUser && (
        <BlockUserSt>
          <h1 className="title-block">Usuario Bloqueado</h1>
          <Countdown date={Date.now() + lastFail} renderer={renderer} />
        </BlockUserSt>
      )}
      {spinner && (
        <LoaderSt>
          <Spinner05 />
        </LoaderSt>
      )}
    </WelcomeSt>
  );
};

export default Welcome;
