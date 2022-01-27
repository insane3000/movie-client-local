import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { setModalReport } from "redux/actions/appAction";
import toast from "react-hot-toast";
//*Icons
import { BsFillImageFill } from "react-icons/bs";
const ReportSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #080808;

  .form-report {
    width: 100vw;
    height: 100vh;
    background: #050505;
    display: grid;
    grid-template-columns: 90%;
    grid-template-rows: 6rem 2.5rem calc(100% - 18rem) 3rem;
    gap: 1rem;
    justify-content: center;
    align-content: flex-start;
    overflow: scroll;
    padding: 1rem 0;

    .poster-title-report {
      display: flex;
      justify-content: center;
      align-items: center;
      .poster-report {
        width: 4rem;
        height: 100%;
        border-radius: 0.3rem;
        overflow: hidden;
        /* background: red; */
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
        .image-report {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .spinnerPosterThumb {
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #050505;
          .sysIconThumb {
            width: 2.5rem;
            height: 2.5rem;
            color: #ffffff;
          }
        }
      }
      .title-user-date {
        width: calc(100% - 4rem);
        padding-left: 1rem;
        .title-report {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          color: white;
          font-family: "Roboto 900";
          font-size: 8vw;
          /* padding: 0 1rem; */
          user-select: text;
          /* background: lime; */
          // !Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user-date {
          width: 100%;
          height: 2.5rem;
          /* background: red; */
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 100%;
          .user-date-inside {
            /* background: orange; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .label-span {
              /* background: red; */
              font-family: "Roboto 300";
              font-size: 0.8rem;
              color: #9e9e9e;
            }
            section {
              width: 100%;
              /* background: blue; */
              font-family: "Roboto 900";
              font-size: 1rem;
              color: #ffffff;
              // !Dots ...
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }

    .info {
      color: #b4b4b4;
      font-family: "Roboto 300";
      font-size: 0.9rem;
    }
    .text-area {
      resize: none;
      background: #131212;
      border-style: none;
      outline: none;
      color: white;
      font-family: "Roboto 300";
      font-size: 0.9rem;
      padding: 1rem 1rem;
      border-radius: 0.3rem;
    }
    .buttons-cancel-submit {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .buttonsReport {
        background: #4400ff;
        width: 8rem;
        height: 3rem;
        border-radius: 0.3rem;
        outline: none;
        border-style: none;
        color: white;
        font-family: "Roboto 900";
        font-size: 1.2rem;
        cursor: pointer;
        &:hover {
          background: white;
          color: black;
        }
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #080808;

    .form-report {
      width: 30rem;
      height: 40rem;
      background: #050505;
      display: grid;
      grid-template-columns: 85%;
      grid-template-rows: 6rem 2.5rem calc(100% - 16rem) 3rem;
      gap: 1rem;
      justify-content: center;
      align-content: flex-start;
      overflow: auto;
      padding: 2rem 0;
      border-radius: 0.4rem;

      .poster-title-report {
        display: flex;
        justify-content: center;
        align-items: center;
        .poster-report {
          width: 4rem;
          height: 100%;
          border-radius: 0.3rem;
          overflow: hidden;
          /* background: red; */
          display: flex;
          justify-content: center;
          align-content: center;
          position: relative;
          .image-report {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .spinnerPosterThumb {
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #050505;
            .sysIconThumb {
              width: 2.5rem;
              height: 2.5rem;
              color: #ffffff;
            }
          }
        }
        .title-user-date {
          width: calc(100% - 4rem);
          padding-left: 1rem;
          .title-report {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            color: white;
            font-family: "Roboto 900";
            font-size: 2rem;
            /* padding: 0 1rem; */
            user-select: text;
            /* background: lime; */
            // !Dots ...
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .user-date {
            width: 100%;
            height: 2.5rem;
            /* background: red; */
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 100%;
            .user-date-inside {
              /* background: orange; */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              .label-span {
                /* background: red; */
                font-family: "Roboto 300";
                font-size: 0.8rem;
                color: #9e9e9e;
              }
              section {
                width: 100%;
                /* background: blue; */
                font-family: "Roboto 900";
                font-size: 1rem;
                color: #ffffff;
                // !Dots ...
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .info {
        color: #b4b4b4;
        font-family: "Roboto 300";
        font-size: 0.9rem;
      }
      .text-area {
        resize: none;
        background: #131212;
        border-style: none;
        outline: none;
        color: white;
        font-family: "Roboto 300";
        font-size: 0.9rem;
        padding: 1rem 1rem;
        border-radius: 0.3rem;
      }
      .buttons-cancel-submit {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .buttonsReport {
          background: #4400ff;
          width: 8rem;
          height: 3rem;
          border-radius: 0.3rem;
          outline: none;
          border-style: none;
          color: white;
          font-family: "Roboto 900";
          font-size: 1.2rem;
          cursor: pointer;
          &:hover {
            background: white;
            color: black;
          }
        }
      }
    }
  }
`;

const Report = () => {
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState({
    idMovie: "",
    title: "",
    imageS: "",
    imageL: "",
    message: "",
  });
  const [spinnerPosterThumb, SetSpinnerPosterThumb] = useState(true);
  const handleCloseModal = () => {
    dispatch(setModalReport(false, "", "", "", "", ""));
    //     navigate(-1);
  };
  useEffect(() => {
    setState({
      idMovie: app.report.idMovie,
      title: app.report.title,
      imageS: app.report.imageS,
      imageL: app.report.imageL,
      message: app.report.message,
    });
  }, [
    app.report.idMovie,
    app.report.title,
    app.report.imageS,
    app.report.imageL,
    app.report.message,
  ]);
  //   console.log(state);
  //!Handle message
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, message: e.target.value });
  };
  //!Handle SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = { ...state, user: app.login.name === "" ? app.login.user : app.login.name };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/reports`, data, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function () {
        toast.success("Enviado.");
        handleCloseModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const options: Intl.DateTimeFormatOptions = {
    //     weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    //     second: "2-digit",
  };
  return (
    <ReportSt>
      <form className="form-report" onSubmit={(e) => handleSubmit(e)}>
        <div className="poster-title-report ">
          <div className="poster-report">
            <img
              className="image-report"
              src={state.imageS && `${process.env.REACT_APP_BUCKET}${state.imageS}`}
              alt=""
              onLoad={(e) => {
                e.currentTarget.complete && SetSpinnerPosterThumb(false);
              }}
            />
            {spinnerPosterThumb && (
              <section className="spinnerPosterThumb">
                <BsFillImageFill className="sysIconThumb" />
              </section>
            )}
          </div>
          <div className="title-user-date">
            <h2 className="title-report">{state.title}</h2>

            <div className="user-date">
              <section className="user-date-inside">
                <span className="label-span">Usuario:</span>
                <section>
                  {`${app.login.name}` === "" ? `${app.login.user}` : `${app.login.name}`}
                </section>
              </section>
              <section className="user-date-inside">
                <span className="label-span">Fecha:</span>
                <section> {new Date().toLocaleDateString("es-ES", options)}</section>
              </section>
            </div>
          </div>
        </div>

        <span className="info">
          A continuación explica que esta mal con la película o serie. Se lo mas preciso/a posible.
          {/* Los errores los corregiremos lo mas antes posible. <br />
          Recuerda que, esto solo sirve para notificar errores con el contenido, si quieres hacer un
          pedido, escribe directamente a la sucursal. */}
        </span>

        <textarea
          className="text-area"
          name="message"
          onChange={handleMessage}
          value={state.message}
          required
        >
          {state.message}
        </textarea>
        <div className="buttons-cancel-submit">
          <button className="buttonsReport" type="button" onClick={handleCloseModal}>
            Cancelar
          </button>
          <button className="buttonsReport" type="submit">
            Enviar
          </button>
        </div>
      </form>
      {/* <div className="close-btn" onClick={handleCloseModal}>
        <IoCloseOutline className="sysIconClose" />
      </div> */}
    </ReportSt>
  );
};

export default Report;
