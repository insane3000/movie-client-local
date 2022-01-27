import React from "react";
import styled from "styled-components";

const Spinner03St = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  background: #2c2c2c24;
  background: #060606;
  background: none;

  /* position: absolute; */
  .html-spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 0.25rem solid #817f7c;
    border-top: 0.25rem solid white;
    border-radius: 50%;
  }

  .html-spinner {
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 0.5;
    transition-duration: 0.5;
    -webkit-animation-name: rotate;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;

    -moz-transition-property: -moz-transform;
    -moz-animation-name: rotate;
    -moz-animation-duration: 0.5s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;

    transition-property: transform;
    animation-name: rotate;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const Spinner03 = () => {
  return (
    <Spinner03St>
      <div className="html-spinner"></div>

      {/* <svg
        id="svg-spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="4" r="4" fill="#fff" />
        <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2" />
        <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4" />
        <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7" />
        <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9" />
        <circle cx="24" cy="44" r="2.5" fill="#feebbc" />
        <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af" />
        <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1" />
        <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94" />
        <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86" />
      </svg> */}
      {/* <p id="svg-para">Spinner created with custom SVG and CSS Animation</p> */}
    </Spinner03St>
  );
};

export default Spinner03;
