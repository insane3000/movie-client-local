import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
import SeriePoster from "../molecules/SeriePoster";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer } from "redux/actions/appAction";
import { useNavigate } from "react-router";
// import Navigation from "components/browser/organisms/Navigation";
// *images
import Spinner03 from "../atoms/Spinner03";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
const AllMoviesSt = styled.div`
  width: 100%;
  height: auto;
  /* overflow-y: scroll;
    position: relative; */
  .title-component {
    width: 100%;
    height: auto;
    /* line-height: 3rem; */
    font-family: "Roboto 700";
    font-size: 1rem;
    text-align: start;
    /* margin-top: 6rem; */
    color: #d3d3d3;
    padding: 0 1rem;
    /* background: lime; */
  }
  .container-movies {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 9rem));
    grid-auto-rows: 16rem;
    justify-content: center;
    align-content: flex-start;
    gap: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    /* padding: 0 10rem; */
  }
  .loadMore {
    width: 100%;
    height: 3rem;
    /* background: red; */
    color: #666666;

    text-align: center;
    line-height: 3rem;
    font-family: "Roboto 300";
    font-size: 1rem;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    /* overflow-y: scroll;
    position: relative; */
    .title-component {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-align: start;
      /* margin-top: 6rem; */
      color: #d3d3d3;
      padding: 0 10rem;
    }
    .container-movies {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 13rem));
      grid-auto-rows: 23rem;
      justify-content: center;
      align-content: flex-start;
      gap: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 0 10rem;
    }
    .loadMore {
      width: 100%;
      height: 3rem;
      /* background: red; */
      color: #666666;

      text-align: center;
      line-height: 3rem;
      font-family: "Roboto 300";
      font-size: 1rem;
    }
  }
`;

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

const AllMovies = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const app = useSelector((store: StoreInterface) => store.app);
  const [state, setState] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [spinner, setSpinner] = useState(false);

  //   console.log(process.env.REACT_APP_BACKEND_URL);

  const InitialFetch = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/year?year=${year}&page=${nextPage}&limit=20`, {
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
        setSpinner(false);
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
        setSpinner(true);
        InitialFetch();
        // console.log("fething");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomVisible, hasMore]);
  const year = new Date().getFullYear();

  return (
    <AllMoviesSt>
      <h2 className="title-component">Estrenos</h2>
      <div className="container-movies">
        {state?.map((i: any) => {
          return i.type === "movie" ? (
            <MoviePoster
              key={i._id}
              id={i._id}
              img={i.imageM}
              rating={i.rating}
              title={i.title}
              year={i.year}
            />
          ) : (
            <SeriePoster
              key={i._id}
              id={i._id}
              img={i.imageM}
              rating={i.rating}
              title={i.title}
              year={i.year}
            />
          );
        })}
      </div>
      <section ref={ref} className="loadMore">
        {!hasMore && "Llegaste al final."}
        {spinner && <Spinner03 />}
      </section>
    </AllMoviesSt>
  );
};

export default AllMovies;
