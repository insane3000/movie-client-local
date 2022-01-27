import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SeriePoster from "../molecules/SeriePoster";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer } from "redux/actions/appAction";
import { useNavigate } from "react-router";
// import Navigation from "components/browser/organisms/Navigation";
import { useLocation } from "react-router";
// *images
import Spinner03 from "../atoms/Spinner03";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import MoviePoster from "../molecules/MoviePoster";
const AllMoviesSt = styled.div`
  // !Estilos para Desktop
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
      /* background: #002700; */
      min-height: 100vh;
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
      position: relative;
      .no-data {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: absolute;
        text-align: center;
        top: 1rem;

        .notice {
          font-family: "Roboto 300";
          font-size: 1rem;
          color: #d3d3d3;
          margin-top: 10rem;
        }
      }
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
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const app = useSelector((store: StoreInterface) => store.app);
  const [state, setState] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [spinner, setSpinner] = useState(false);

  //   console.log(process.env.REACT_APP_BACKEND_URL);
  // ! first fetch
  const firstFetch = async (text1: string) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/movie-search?title=${text1}&page=1&limit=20`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState(response.data.docs);
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
        // navigate(`/browser/home`);
      });
  };
  //! FETCH for infinity scroll
  const fetchForInfinityScroll = async (text: string) => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/movie-search?title=${text}&page=${nextPage}&limit=20`,
        {
          headers: {
            authorization: `Bearer ${app.login.token}`,
            id: `${app.login.user}`,
            role: `${app.login.role}`,
          },
        }
      )
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

  const timerRef = useRef<any>(null);
  // !First Use Effect
  const params = new URLSearchParams(location.search);
  const queryParams: any = params.get("query");
  useEffect(() => {
    //     setQuery(queryParams);
//     console.log(queryParams);
    clearTimeout(timerRef.current);
    //     if (queryParams.length > 1) {
    timerRef.current = setTimeout(() => firstFetch(queryParams.toLowerCase()), 500);
    //     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    //     if (queryParams.length > 1) {
    if (isBottomVisible) {
      if (hasMore) {
        setSpinner(true);
        fetchForInfinityScroll(queryParams.toLowerCase());
        // console.log("fething");
      }
    }
    //     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomVisible, hasMore]);

  return (
    <AllMoviesSt>
      <h2 className="title-component">Resultados de busqueda:</h2>
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
        {state.length === 0 && (
          <section className="no-data">
            <span className="notice">No se encontraron resultados.</span>
          </section>
        )}
      </div>
      <section ref={ref} className="loadMore">
        {!hasMore && "LLegaste al final."}
        {spinner && <Spinner03 />}
      </section>
    </AllMoviesSt>
  );
};

export default AllMovies;
