import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

const duration = 500;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: `translate(0px, 100px)`
};

const transitionStyles = {
  entering: { transition: "none" },
  entered: { transform: `translate(0px, 40px)` },
  exiting: { transform: `translate(0px, -20px)` },
  exited: { transform: `translate(0px, -20px)`, display: "none" }
};

const Fade = () => {
  const [isOneVisible, setOneVisible] = useState(true);
  const [isTwoVisible, setTwoVisible] = useState(false);
  const [isThreeVisible, setThreeVisible] = useState(false);
  return [
    <div
      style={{
        border: "1px solid #000",
        width: "150px",
        height: "100px",
        margin: "50px 50px",
        overflow: "hidden"
      }}
      key={0}
    >
      <Transition in={isOneVisible} timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            Title 1
          </div>
        )}
      </Transition>
      <Transition in={isTwoVisible} timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            Title 2
          </div>
        )}
      </Transition>
      <Transition in={isThreeVisible} timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            Title 3
          </div>
        )}
      </Transition>
    </div>,
    <button
      key={1}
      onClick={() => {
        setOneVisible(!isOneVisible);
        setTwoVisible(false);
        setThreeVisible(false);
      }}
    >
      1
    </button>,
    <button
      key={2}
      onClick={() => {
        setOneVisible(false);
        setTwoVisible(!isTwoVisible);
        setThreeVisible(false);
      }}
    >
      2
    </button>,
    <button
      key={3}
      onClick={() => {
        setOneVisible(false);
        setTwoVisible(false);
        setThreeVisible(!isThreeVisible);
      }}
    >
      3
    </button>
  ];
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Fade />, rootElement);
