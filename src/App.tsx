import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import Home from "./pages/Home";

const App: Component = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
