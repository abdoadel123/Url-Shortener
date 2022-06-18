import React from "react";
import { render } from "@testing-library/react";
import { Encode } from "./components/encode";
import { Urls } from "./components/urls";
import "./styles/main.css";

function App() {
  return (
    <div className="main-div">
      <Encode />
      <Urls />
    </div>
  );
}

export default App;
