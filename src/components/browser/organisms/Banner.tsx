import React, { useEffect, useState } from "react";
import styled from "styled-components";
// *Images
import { useDispatch, useSelector } from "react-redux";
import { setModal, setModalSerie } from "redux/actions/appAction";
import axios from "axios";
import { StoreInterface } from "interfaces/storeTemplate";
import Spinner05 from "../atoms/Spinner05";
import { useLocation, useNavigate } from "react-router-dom";
// *Icons
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
const Banner2St = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 0;
  .image-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    filter: blur(50px) brightness(20%);
  }
  .gradient-top {
    width: 100%;
    height: 100%;
    position: absolute;

    background: rgb(7, 7, 7);
    background: linear-gradient(180deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 10%);
  }
  .gradient-bottom {
    width: 100%;
    height: 100%;
    position: absolute;
    backdrop-filter: none;
    background: rgb(7, 7, 7);
    background: linear-gradient(0deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 90%);
  }
  .data-poster {
    width: 90%;
    height: auto;
    position: absolute;
    bottom: 5vh;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    /* background: red; */
    .data {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* padding-right: 1rem; */
      .banner-title {
        width: 100%;
        height: auto;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        line-height: 2rem;
        color: white;
        text-shadow: 1px 1px 5px black;
        text-align: center;
      }
      .genre {
        width: 100%;
        font-family: "Roboto 300";
        font-size: 1rem;
        color: white;
        text-shadow: 1px 1px 3px black;
        text-align: center;
        // !Dots ...
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rating {
        font-family: "Roboto 900";
        font-size: 2rem;
        color: white;
        text-shadow: 1px 1px 3px black;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .out-of {
          font-family: "Roboto 100";
          line-height: 1rem;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: white;
          text-shadow: 1px 1px 3px black;
        }
      }
      .btn-container {
        height: 2rem;
        text-shadow: 1px 1px 3px black;
        display: flex;
        justify-content: center;
        align-items: center;
        .button-play {
          background: white;
          width: 7rem;
          height: 2rem;
          border-style: none;
          border-radius: 0.3rem;
          font-family: "Roboto 900";
          font-size: 1rem;
          color: #000000;
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          transition: 0.1s;

          &:hover {
            background: #dfdfdf;
            transition: 0.1s;
          }
        }
      }
    }
    .poster {
      width: 65vw;
      height: 90vw;
      display: flex;
      justify-content: center;
      align-items: center;
      /* background: red; */
      overflow: hidden;
      margin-bottom: 0.5rem;
      position: relative;
      border-radius: 0.3rem;
      /* overflow: hidden; */
      .img {
        width: 100%;
        height: 100%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        object-fit: cover;
      }
      .premiere-title {
        position: absolute;
        top: 0;
        right: auto;
        width: auto;
        height: 5vw;
        background: #ff0000;
        color: white;
        font-family: "Roboto 300";
        text-transform: uppercase;
        text-align: center;
        line-height: 5vw;
        font-size: 3vw;
        padding: 0 2vw;
        /* text-shadow: 1px 1px 3px black; */
        border-radius: 0 0 0.2rem 0.2rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;
      }
      .spinnerPosterThumb {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: #070707; */
      }
    }
    .btn-slider {
      background: #ffffff;
      position: absolute;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .sysIcon {
        width: 70%;
        height: 70%;
        color: black;
        /* background: red; */
      }
    }
    .left {
      left: 0rem;
    }
    .right {
      right: 0rem;
    }
  }
  .spinnerPoster {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background: #070707;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 10rem;
  }

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100vw;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 0;
    .image-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
      filter: blur(50px) brightness(20%);
    }
    .gradient-top {
      width: 100%;
      height: 100%;
      position: absolute;

      background: rgb(7, 7, 7);
      background: linear-gradient(180deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 30%);
    }
    .gradient-bottom {
      width: 100%;
      height: 100%;
      position: absolute;
      /* backdrop-filter: blur(50px) brightness(20%); */
      background: rgb(7, 7, 7);
      background: linear-gradient(0deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 80%);
    }
    .data-poster {
      width: 85%;
      height: 75%;
      position: absolute;
      bottom: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .data {
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-right: 1rem;
        .banner-title {
          width: 100%;
          height: auto;
          font-family: "Roboto 900";
          font-size: 5vw;
          line-height: 5vw;
          color: white;
          text-shadow: 5px 5px 10px black;
          text-align: start;
        }
        .genre {
          width: 100%;
          font-family: "Roboto 300";
          font-size: 2.5vw;
          color: white;
          text-shadow: 3px 3px 10px black;
          text-align: start;
          // !Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .rating {
          font-family: "Roboto 900";
          font-size: 3.5vw;
          color: white;
          text-shadow: 3px 3px 10px black;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          .out-of {
            font-family: "Roboto 100";
            line-height: 1vw;
            margin-bottom: 1.5vw;
            font-size: 1vw;
            color: white;
            text-shadow: 1px 1px 3px black;
          }
        }
        .btn-container {
          height: 5rem;
          text-shadow: 1px 1px 3px black;
          display: flex;
          justify-content: center;
          align-items: center;
          .button-play {
            background: white;
            width: 15rem;
            height: 3rem;
            border-style: none;
            border-radius: 0.3rem;
            font-family: "Roboto 900";
            font-size: 1.5rem;
            color: #000000;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: 0.1s;

            &:hover {
              background: #dfdfdf;
              transition: 0.1s;
            }
          }
        }
      }
      .poster {
        width: 25vw;
        height: 35vw;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: red; */
        overflow: hidden;
        margin-bottom: 0rem;
        position: relative;
        border-radius: 0.3rem;
        .img {
          width: 100%;
          height: 100%;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          object-fit: cover;
        }
        .premiere-title {
          position: absolute;
          top: 0;
          right: auto;
          width: auto;
          height: 2rem;
          background: #ff0000;
          color: #ffffff;
          font-family: "Roboto 300";
          text-transform: uppercase;
          text-align: center;
          line-height: 2rem;
          font-size: 1.2rem;
          padding: 0 1rem;
          /* text-shadow: 1px 1px 5px #131313; */
          border-radius: 0 0 0.3rem 0.3rem;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
        }
        .spinnerPosterThumb {
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          /* background: #070707; */
        }
      }
      .btn-slider {
        background: #ffffff;
        position: absolute;
        width: 4rem;
        height: 4rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .sysIcon {
          width: 70%;
          height: 70%;
          color: black;
          /* background: red; */
        }
      }
      .left {
        left: -2rem;
      }
      .right {
        right: -2rem;
      }
    }
    .spinnerPoster {
      width: 100%;
      height: 100%;
      top: 0;
      position: absolute;
      background: #070707;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 10rem;
    }
  }
`;
interface MovieIT {
  actors: string;
  available: true;
  createdAt: string;
  folder: string;
  genre: string;
  imageL: string;
  imageM: string;
  imageS: string;
  imageXL: string;
  language: string;
  link: string;
  originalTitle: string;
  rating: number;
  server: string;
  synopsis: string;
  time: string;
  title: string;
  updatedAt: string;
  year: string;
  _id: string;
  type: string;
}

type MoviesIT = [MovieIT];

const Banner = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  // ! States
  let [index, setIndex] = useState(0);
  const [docs, setDocs] = useState<MoviesIT>();
  const [state, setState] = useState<MovieIT>();

  const [spinnerPoster, setSpinnerPoster] = useState(true);
  const [spinnerPosterThumb, SetSpinnerPosterThumb] = useState(true);
  // !Spinner Poster
  const handleLoadImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.complete && setSpinnerPoster(false);
  };

  //! Handle modal MOVIE
  const handleModal = (id: string) => {
    dispatch(setModal(id, true));
    !app.modal.show && navigate(pathname);
  };
  //! Handle modal SERIE
  const handleModalSerie = (id: string) => {
    dispatch(setModalSerie(id, true));
    !app.modalSerie.show && navigate(pathname);
  };
  const year = new Date().getFullYear();
  const fetchData = async () => {
    axios
      //       .get(`${process.env.REACT_APP_BACKEND_URL}/movies/${"61aa49e53cda0c8683b6d6cf"}`, {
      .get(`${process.env.REACT_APP_BACKEND_URL}/last-premiere?limit=10&year=${year}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        //TODO Por cada nuevo dato seteado, se renderiza de nuevo. fixear!!!
        setDocs(response.data.docs);
        setState(response.data.docs[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanText = state?.genre.replace("|", ".");
  // !handle set State
  const handleSetState = (value: string) => {
    if (value === "right") {
      setState(docs && docs[index + 1]);
      setIndex(index + 1);
      SetSpinnerPosterThumb(true);
    }
    if (value === "left") {
      setState(docs && docs[index - 1]);
      setIndex(index - 1);
      SetSpinnerPosterThumb(true);
    }
  };

  return (
    <Banner2St>
      <img
        className="image-bg"
        src={`${process.env.REACT_APP_BUCKET}${state?.imageL}`}
        alt=""
        onLoad={(e) => handleLoadImg(e)}
      />
      <div className="gradient-top"></div>
      <div className="gradient-bottom"></div>

      <div className="data-poster">
        <div className="data">
          <h1 className="banner-title">{state?.title}</h1>
          <section className="genre">
            {cleanText?.split(".")[0]} {cleanText?.split(".")[1] && "•"} {cleanText?.split(".")[1]}{" "}
            {cleanText?.split(".")[2] && " •"} {cleanText?.split(".")[2]}
          </section>
          <h3 className="rating">
            {state?.rating}
            <span className="out-of">/10</span>{" "}
          </h3>
          <section className="btn-container">
            {state?.type === "movie" ? (
              <button className="button-play" onClick={() => handleModal(`${state?._id}`)}>
                Ver Ahora
              </button>
            ) : (
              <button className="button-play" onClick={() => handleModalSerie(`${state?._id}`)}>
                Ver Ahora
              </button>
            )}
          </section>
        </div>

        <div className="poster">
          <img
            className="img"
            src={`${process.env.REACT_APP_BUCKET}${state?.imageL}`}
            alt=""
            onLoad={(e) => {
              e.currentTarget.complete && SetSpinnerPosterThumb(false);
            }}
            style={spinnerPosterThumb ? { opacity: 0 } : { opacity: 1 }}
          />
          <div
            className="premiere-title"
            style={spinnerPosterThumb ? { opacity: 0 } : { opacity: 1 }}
          >
            {state?.type === "movie" ? "Estreno" : "Nuevos episodios"}
          </div>
          {spinnerPosterThumb && (
            <section className="spinnerPosterThumb">
              <Spinner05 />
            </section>
          )}
        </div>
        {index > 0 && (
          <span
            className="btn-slider left"
            onClick={() => {
              handleSetState("left");
            }}
          >
            <RiArrowLeftSLine className="sysIcon" />
          </span>
        )}
        {index < 9 && (
          <span
            className="btn-slider right"
            onClick={() => {
              handleSetState("right");
            }}
          >
            <RiArrowRightSLine className="sysIcon" />
          </span>
        )}
      </div>

      {spinnerPoster && (
        <section className="spinnerPoster">
          <Spinner05 />
        </section>
      )}
    </Banner2St>
  );
};

export default Banner;
