import styled from "styled-components";
import ReactJWPlayer from "react-jw-player";
import Cluster from "../organisms/Cluster";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer, setModalReport } from "redux/actions/appAction";
import { useLocation } from "react-router";
// *Icons
// import CloseIcon from "icons/CloseIcon";
import Spinner05 from "../atoms/Spinner05";
import Error404 from "components/Error404";
import { MdSdCardAlert } from "react-icons/md";
const MovieSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* overflow: hidden; */

  .loader {
    width: 100vw;
    height: 1000vh;
    background: #1a1720;
    background: #080808;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    position: absolute;
    z-index: 2;
    /* background: red; */
  }
  .errorWindow {
    width: 100vw;
    height: 100vh;
    background: #1a1720;
    background: #080808;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    position: absolute;
    z-index: 2;
  }
  .movie-container {
    width: 100vw;
    height: 100vh;
    background: #1a1720;
    background: #080808;
    padding-top: 4rem;
    padding-bottom: 2rem;
    overflow-y: scroll;
    z-index: 1;
    position: relative;

    .container-poster-data {
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto auto 2rem auto;

      .container-poster {
        width: 70vw;
        height: 100vw;
        position: relative;
        /* background: red; */
        margin-bottom: 1rem;

        .img-movie {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.3rem;
        }
        .spinnerPoster {
          width: 100%;
          height: 100%;
          top: 0;
          position: absolute;
          background: #0f0f0f;
        }
      }
      .container-data {
        width: 100%;
        height: auto;
        .title-movie {
          font-family: "Roboto 900";
          font-size: 2rem;
          line-height: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
          color: #5900ff;
        }
        .year-genre-time {
          font-family: "Roboto 100";
          font-size: 0.8rem;
          text-align: center;
          color: white;
          margin-bottom: 0.5rem;
        }

        .rate {
          font-family: "Roboto 900";
          font-size: 1rem;
          color: white;
          margin-bottom: 0.5rem;
          /* background: #772121; */
          display: flex;
          justify-content: center;
          align-items: center;

          .span {
            color: #6200ff;
            font-family: "Roboto 900";
            font-size: 1rem;
            margin-right: 0.5rem;
          }
        }
        .actors {
          width: 100%;
          height: auto;
          font-family: "Roboto 100";
          font-size: 1rem;
          color: white;
          margin-bottom: 0.5rem;

          // !Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .span {
            color: #6200ff;
            font-family: "Roboto 900";
            font-size: 1rem;
            /* margin-right: 0.5rem; */
          }
        }
        .synopsis {
          width: 100%;
          height: auto;
          font-family: "Roboto 300";
          font-size: 1rem;
          color: white;
          /* background: red; */
          /* margin-top: 1rem; */
        }
      }
    }
    .seasons {
      /* background: blue; */
      width: 90%;
      height: auto;
      margin: auto;
      margin-bottom: 0.5rem;
      position: relative;
      .select-arrow {
        background: #5900ff;
        width: 7.7rem;
        height: 2rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3rem;
        .selectSeason {
          position: absolute;
          padding-left: 0.5rem;
          width: 100%;
          height: 2rem;
          outline: none;
          border-style: none;
          border-radius: 0.2rem;
          background: none;
          color: white;
          font-family: "Roboto 900";
          font-size: 0.8rem;
          cursor: pointer;

          // !hide arrow
          appearance: none;
          option {
            background: white;
            color: black;
            font-family: "Roboto 300";
          }
        }
        .sysIconArrow {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          right: 0.2rem;
          color: white;
        }
      }
      .report {
        background: #ffd000;
        width: 9rem;
        height: 2rem;
        position: absolute;
        right: 0;
        top: 0;
        font-family: "Roboto 900";
        color: #000000;
        font-size: 0.8rem;
        text-align: center;
        border-radius: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .sysIconReport {
          width: 1.2rem;
          height: 1.2rem;
          margin-left: 0.2rem;
          color: black;
          /* background: red; */
        }
      }
    }
    .player-container {
      width: 90%;
      min-height: 10rem;
      height: fit-content;
      margin: auto;
      /* margin-bottom: 2rem; */
      /* overflow: hidden; */
      background: black;
      .player {
        width: 100%;
        height: 100%;
        margin: 0;
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
    /* position: relative; */

    .gradient-movie {
      width: 100%;
      height: 100%;
      background: #080808;
      position: absolute;
      backdrop-filter: blur(10px);
    }

    .loader {
      width: 100vw;
      height: 100vh;
      background: #1a1720;
      background: #080808;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 2rem;
      position: absolute;
      z-index: 2;
    }
    .errorWindow {
      width: 100vw;
      height: 100vh;
      background: #1a1720;
      background: #080808;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 2rem;
      position: absolute;
      z-index: 2;
    }
    .movie-container {
      width: 100vw;
      height: 100vh;
      background: #1a1720;
      background: #080808;
      /* padding-top: 4rem; */
      overflow-y: scroll;
      z-index: 1;
      position: relative;

      .container-poster-data {
        width: 80%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        /* margin: auto auto 2rem auto; */

        .container-poster {
          width: 18rem;
          height: auto;
          position: relative;
          .img-movie {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 0.3rem;
          }
          .spinnerPoster {
            width: 100%;
            height: 100%;
            top: 0;
            position: absolute;
            background: #0f0f0f;
          }
        }
        .container-data {
          width: calc(100% - 18rem);
          height: auto;
          padding: 1rem 1rem;
          .title-movie {
            font-family: "Roboto 900";
            font-size: 3rem;
            line-height: 3rem;
            margin-bottom: 0.5rem;
            text-align: left;
            color: #5900ff;
          }
          .year-genre-time {
            font-family: "Roboto 100";
            font-size: 1.5rem;
            text-align: left;
            color: white;
            margin-bottom: 0.5rem;
          }

          .rate {
            font-family: "Roboto 900";
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;
            /* background: #772121; */
            display: flex;
            justify-content: start;
            align-items: center;

            .span {
              color: #6200ff;
              font-family: "Roboto 900";
              font-size: 1.5rem;
              margin-right: 0.5rem;
            }
          }
          .actors {
            width: 100%;
            height: 2rem;
            font-family: "Roboto 100";
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;

            // !Dots ...
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .span {
              color: #6200ff;
              font-family: "Roboto 900";
              font-size: 1.5rem;
              margin-right: 0.5rem;
            }
          }
          .synopsis {
            width: 100%;
            height: auto;
            font-family: "Roboto 300";
            font-size: 1.2rem;
            color: white;
            /* background: red; */
            margin-top: 1rem;
          }
        }
      }
      .seasons {
        /* background: blue; */
        width: 80%;
        height: auto;
        margin: auto;
        margin-bottom: 1rem;

        .select-arrow {
          background: #5900ff;
          width: 12rem;
          height: 3rem;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.3rem;

          .selectSeason {
            position: absolute;
            padding-left: 1rem;
            width: 100%;
            height: 3rem;
            outline: none;
            border-style: none;
            border-radius: 0.2rem;
            background: none;
            color: white;
            font-family: "Roboto 900";
            font-size: 1.2rem;
            cursor: pointer;
            // !hide arrow
            appearance: none;
            option {
              background: white;
              color: black;
              font-family: "Roboto 300";
            }
          }
          .sysIconArrow {
            width: 2rem;
            height: 2rem;
            position: absolute;
            right: 0.5rem;
            color: white;
          }
        }
        .report {
          background: #ffd000;
          width: 14rem;
          height: 3rem;
          position: absolute;
          right: 0;
          top: 0;
          font-family: "Roboto 900";
          color: #000000;
          font-size: 1.2rem;
          line-height: 3rem;
          text-align: center;
          border-radius: 0.2rem;
          cursor: pointer;
          .sysIconReport {
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 0.5rem;
            color: black;
            /* background: red; */
          }
        }
      }
      .player-container {
        width: 80%;
        min-height: 30rem;
        height: fit-content;
        margin: auto;
        margin-bottom: 2rem;
        /* overflow: hidden; */
        background: black;
        .player {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      }
    }
  }
`;

const movieTemplate = {
  _id: "",
  title: "",
  rating: 0,
  year: "",
  genre: "",
  time: "",
  actors: "",
  folder: "",
  synopsis: "",
  link: "",
  imageXL: "",
  imageL: "",
  imageM: "",
  imageS: "",
};
const Movie = () => {
  // const params = useParams();
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);

  const [state, setState] = useState(movieTemplate);
  const [spinner, setSpinner] = useState(false);
  const [spinnerPoster, setSpinnerPoster] = useState(true);
  const [errorWindow, setErrorWindow] = useState(false);

  console.log(document.domain);
  const hostMovies = document.domain === "192.168.2.249" ? "192.168.2.249" : "192.168.0.248";
  //   const modifyLink = state.link?.split(".mp4")[0];
  // ! Scroll to TOP
  const movieRef = useRef();
  const scrollToTop = () => {
    movieRef.current.scrollTop = 0;
  };
  //   const handleModal = () => {
  //     dispatch(setModal("", false));
  //     navigate(-1);
  //   };

  //   console.log(state);

  const fetchData = async () => {
    setSpinner(true);

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/movie-client/${app.modal.id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        setSpinner(false);
        response.status === 204 ? setErrorWindow(true) : setState(response.data);
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    setSpinnerPoster(true);
    fetchData();
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.modal.id]);
  //!para validar query
  //   let genero = state.genre.slice(0, 4).toLowerCase();

  const cleanText = state.genre?.replace("|", ".");
  const cleanSynopsis = state.synopsis.replace("(FILMAFFINITY)", "");
  // !Spinner Poster
  const handleLoadImg = (e) => {
    e.currentTarget.complete && setSpinnerPoster(false);
  };
  // !Blob
  //   const fethingVideo = async () => {
  //     //       url: "https://f002.backblazeb2.com/file/msc-terror/Los+Muchachos+Perdidos.mp4",
  //     axios({
  //       url: "https://f002.backblazeb2.com/file/msc-terror/Los+Muchachos+Perdidos.mp4", //your url
  //       method: "GET",
  //       responseType: "blob", // important
  //     }).then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "file.pdf"); //or any other extension
  //       document.body.appendChild(link);
  //       link.click();
  //       console.log(response);
  //     });
  //   };
  //   useEffect(() => {
  //     fethingVideo();
  //   }, []);
  //f002.backblazeb2.com/file/
  //   console.log(
  //     `http://localhost:4000/local/${state.link?.split("https://f002.backblazeb2.com/file/")[1]}`
  //   );
  //! handle REPORT MODAL
  //   const handlerReportModal = (id) => {
  //     //     console.log(location);
  //     dispatch(setModalReport(true, state._id, state.title, state.imageS, state.imageL, ""));
  //     !app.report.show && navigate(`${location.pathname}${location.search}`);
  //   };
  return (
    <MovieSt>
      <div className="movie-container" ref={movieRef}>
        <div className="container-poster-data">
          <div className="container-poster">
            <img
              className="img-movie"
              src={state.imageL && `${process.env.REACT_APP_BUCKET}${state.imageL}`}
              alt=""
              onLoad={(e) => handleLoadImg(e)}
            />
            {spinnerPoster && (
              <section className="spinnerPoster">
                <Spinner05 />
              </section>
            )}
          </div>
          <div className="container-data">
            <h2 className="title-movie">{state.title}</h2>
            <h3 className="year-genre-time">
              {state.year} • {cleanText.split(".")[0]}. {cleanText.split(".")[1]}.{" "}
              {cleanText.split(".")[2]} • {state.time}
            </h3>
            <h3 className="rate">
              <span className="span">Calificación: </span>{" "}
              {state.rating === 0 ? "Sin calificación" : state.rating}
              {/* <img className="span" src={star} alt="" /> {state.rating} */}
            </h3>
            <p className="actors">
              <span className="span">Actores:</span> {state.actors}
            </p>
            <p className="actors">
              <span className="span">Idioma disponible:</span> {state.language}
            </p>
            <p className="synopsis">{cleanSynopsis}</p>
          </div>
        </div>

        {/* <div className="seasons">
          <section className="select-arrow" style={{ background: "none" }}>
           
          </section>
          <section className="report" title="Reportar un problema." onClick={handlerReportModal}>
            Reportar problema <MdSdCardAlert className="sysIconReport" />
          </section>
        </div> */}

        <div className="player-container">
          {state.link !== "" && (
            <ReactJWPlayer
              className="player"
              playerId="my-unique-id"
              playerScript="https://api.moviestorecbba.com/static/KB5zFt7A.js"
              file={state.link.replace(
                "https://f002.backblazeb2.com/file/",
                `http://${hostMovies}:8080/NewHDD/`
              )}
              //       file="http://192.168.0.248:8080/movies/300.mp4"
              //       file={`http://localhost:4000/local/${
              //         state.link?.split("https://f002.backblazeb2.com/file/")[1]
              //       }`}
              //       onBeforePlay={() => console.log("onBeforePlay fired!")}
              //       onLoad={() => console.log("allaaallala")}
              type="mp4"
              //       preload="metadata"
              customProps={{
                // playbackRateControls: [1, 1.25, 1.5],
                // preload: "auto",
                // defaultBandwidthEstimate: 200000000,
                autostart: false,
                cast: {},
                // hlsjsdefault: true,
              }}
            />
          )}
        </div>
        {state.genre !== "" && <Cluster genre={state.folder} subtitle="Relacionados" text="" />}
      </div>
      {errorWindow && (
        <div className="errorWindow">
          <Error404 />
        </div>
      )}
      {spinner === true && (
        <div className="loader">
          <Spinner05 />
        </div>
      )}
    </MovieSt>
  );
};

export default Movie;
