import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

const duration = 500;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: `translate(0px, 100px)`,
  textAlign: "center",
  height: "100%",
  border: "1px solid green"
};

const transitionStyles = {
  entering: { display: "block" },
  entered: { transform: `translate(0px, 40px)` },
  exiting: { transform: `translate(0px, -75px)` },
  exited: { transform: `translate(0px, 100px)`, display: "none" }
};

class TextScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: []
    };

    this.state.visibility = props.strings.map(() => false);

    this.renderSlides = this.renderSlides.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
  }

  componentDidMount() {
    const { strings } = this.props;

    let visibility = [];
    for (let i in strings) {
      visibility.push(parseInt(i, 10) === 0);
    }
    this.setState({ visibility: visibility });
  }

  renderSlides() {
    const { strings } = this.props;
    const { visibility } = this.state;

    return strings.map((el, i) => (
      <Transition key={`${el}${i}`} in={visibility[i]} timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {el}
          </div>
        )}
      </Transition>
    ));
  }

  renderButtons() {
    const { strings } = this.props;

    return strings.map((el, i) => (
      <button
        key={`${el}${i}`}
        onClick={() => {
          this.changeSlide(i);
        }}
        style={{
          alignSelf: "center"
        }}
      />
    ));
  }

  changeSlide(idx) {
    const { visibility } = this.state;

    visibility.forEach((el, i) => {
      if (i === idx && el) {
        return;
      }
      visibility[i] = i === idx;
      this.setState({ visibility: visibility });
    });
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid #000",
          width: "inherit",
          height: "inherit"
        }}
      >
        <div
          style={{
            width: "inherit",
            height: "80%",
            overflow: "hidden"
          }}
          key={0}
        >
          {this.renderSlides()}
        </div>
        <div
          style={{
            width: "inherit",
            height: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

const App = () => {
  return (
    <TextScroller strings={["Title 1", "Title 2", "Title 3", "Title 4"]} />
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
