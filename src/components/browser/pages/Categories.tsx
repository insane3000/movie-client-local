import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Genre from "./Genre";
const CategoriesSt = styled.div`
  width: 100%;
  height: auto;
  /* background: red; */
  .list-categories {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 10rem));
    /* grid-template-columns: 18rem 18rem 18rem 18rem; */
    grid-auto-rows: 6rem;
    justify-content: center;
    align-content: flex-start;
    /* padding: 5rem 5rem; */
    gap: 0.5rem;

    .category {
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: 0.1s;
      background: #181717;
      background: #78777c2f;

      &:hover {
        transform: scale(1.1);
        transition: 0.1s;
        background: #eeeaea;
        .text {
          color: black;
        }
      }
      .text {
        font-family: "Roboto 100";
        font-size: 1.2rem;
        color: white;
        /* text-shadow: 1px 1px 1px #47474771; */
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    background: none;
    .list-categories {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 20rem));
      /* grid-template-columns: 18rem 18rem 18rem 18rem; */
      grid-auto-rows: 12rem;
      justify-content: center;
      align-content: flex-start;
      padding: 5rem 5rem;
      gap: 1rem;

      .category {
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        transition: 0.1s;
        background: #181717;
        background: #78777c2f;

        &:hover {
          transform: scale(1.1);
          transition: 0.1s;
          background: #eeeaea;
          .text {
            color: black;
          }
        }
        .text {
          font-family: "Roboto 100";
          font-size: 1.5rem;
          color: white;
          /* text-shadow: 1px 1px 1px #47474771; */
        }
      }
    }
  }
`;
const Categories = () => {
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

  return (
    <CategoriesSt>
      <Routes>
        <Route
          path="/"
          element={
            <section className="list-categories">
              {color.map((i) => (
                <Link
                  className="category"
                  to={`/browser/category/${i.to}`}
                  key={i.name}
                  // style={{ background: `#${i.color}` }}
                >
                  <span className="text">{i.name}</span>
                </Link>
              ))}
            </section>
          }
        />
        <Route path="/:genre" element={<Genre />} />
      </Routes>
    </CategoriesSt>
  );
};

export default Categories;
