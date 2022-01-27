import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
//*Icons
import ArrowLeftIcon from "icons/ArrowLeftIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer } from "redux/actions/appAction";
import { useNavigate } from "react-router";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
// import Spinner05 from "../atoms/Spinner05";
import SeriePoster from "../molecules/SeriePoster";
const ClusterSt = styled.div`
  width: 100%;
  height: 18rem;
  /* margin-top: 2rem;
  margin-bottom: 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title-cluster {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    padding-left: 1rem;
    font-family: "Roboto 700";
    font-size: 1rem;
    text-decoration: none;
    color: #d3d3d3;
  }

  .container-postersArrow {
    width: 100%;
    height: 16rem;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 16rem;
    position: relative;
    /* padding: 0 4rem; */

    .arrow {
      width: 4rem;
      height: 100%;
      position: absolute;
      background: #000000;
      display: none;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      background: red;
      .sysIconArrow {
        color: #ffffff;
        width: 100%;
        height: 3rem;
      }
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }

    .list-posters {
      width: auto;
      height: 100%;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 9rem;
      /* grid-auto-flow: column dense; */
      grid-template-rows: 100%;
      gap: 0.5rem;
      overflow-x: scroll;
      overflow-y: hidden;
      // !Firefox
      scrollbar-color: #070707 #070707;
      scrollbar-width: thin;
      // !Chrome
      &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0rem;
        -webkit-appearance: none;
      }
      .loadMore {
        width: 9rem;
        background: transparent;
        background: #1d1d1d;

        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Roboto 300";
        font-size: 0.8rem;

        color: #b3b3b3;
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 26rem;
    /* margin-top: 2rem; */
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title-cluster {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      padding-left: 4rem;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-decoration: none;
      color: #d3d3d3;
    }

    .container-postersArrow {
      width: 100%;
      height: 23rem;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 23rem;
      position: relative;
      padding: 0 4rem;

      .arrow {
        width: 4rem;
        height: 100%;
        position: absolute;
        background: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .sysIconArrow {
          color: #ffffff;
          width: 100%;
          height: 3rem;
        }
      }
      .left {
        left: 0;
      }
      .right {
        right: 0;
      }
      .arrow-none {
        display: flex;
      }
      .list-posters {
        width: auto;
        height: 100%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 13rem;
        grid-template-rows: 100%;
        gap: 1rem;
        overflow-x: scroll;
        overflow-y: hidden;
        // !Firefox
        scrollbar-color: #070707 #070707;
        scrollbar-width: thin;
        .loadMore {
          width: 13rem;
          background: transparent;
          background: #1d1d1d;

          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Roboto 300";
          font-size: 1rem;
          color: #b3b3b3;
        }
      }
    }
  }
`;
interface Props {
  genre: string;
  subtitle: string;
}
// interface MovieIT {
//   _id: "";
//   title: "";
//   rating: 0;
//   year: "";
//   genre: "";
//   time: "";
//   actors: "";
//   synopsis: "";
//   link: "";
//   imageXL: "";
//   imageL: "";
//   imageM: "";
//   imageS: "";
// }

const MoviesGender = (props: Props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const moviesGenderRef = useRef<any>();
  const app = useSelector((store: StoreInterface) => store.app);

  const ScrollRight = () => {
    moviesGenderRef.current.scrollLeft += 1000;
  };
  const ScrollLeft = () => {
    moviesGenderRef.current.scrollLeft -= 1000;
  };
  const [state, setState] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  //   const [spinner, setSpinner] = useState(false);

  const InitialFetch = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/genre?genre=${props.genre}&page=${nextPage}&limit=15`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState((prev: any) => [...prev, ...response.data.docs]);
        setNextPage(response.data.nextPage);
        setHasMore(response.data.hasNextPage);
        // setSpinner(false);
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginServer("", "", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        localStorage.setItem("name", "");
        navigate(`/`);
      });
  };

  // !Logica para infinite scroll
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      rootMargin: "0px 400px 0px 400px",
      threshold: 0, //trigger event as soon as the element is in the viewport.
    },
    false // don't remove the observer after intersected.
  );

  useEffect(() => {
    if (isBottomVisible) {
      if (hasMore) {
        InitialFetch();
        // setSpinner(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomVisible, hasMore]);
  // console.log(state);
  return (
    <ClusterSt>
      <h2 className="title-cluster">{props.subtitle}</h2>

      {/* {spinner ? (
        <Spinner05 />
      ) : ( */}
      <div className="container-postersArrow">
        <div ref={moviesGenderRef} className="list-posters">
          {state?.map((i: any) => (
            <SeriePoster
              key={i._id}
              img={i.imageM}
              id={i._id}
              rating={i.rating}
              title={i.title}
              year={i.year}
            />
          ))}

          <section ref={ref} className="loadMore">
            {hasMore ? "Cargando..." : "Llegaste al final."}
          </section>
        </div>

        <section className="arrow  left " onClick={ScrollLeft}>
          <ArrowLeftIcon className="sysIconArrow" />
        </section>
        <section className="arrow right " onClick={ScrollRight}>
          <ArrowRightIcon className="sysIconArrow" />
        </section>
      </div>
      {/* )} */}
    </ClusterSt>
  );
};

export default MoviesGender;
