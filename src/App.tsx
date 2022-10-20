import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import Home from "./pages/Home";

const App: Component = () => {
  return (
    <div class="flex flex-col h-screen">
      <main class="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer class="text-center py-2">
        <a href="https://github.com/dmfigueroa/easy-brackets" target="_blank">GitHub</a>
      </footer>
    </div>
  );
};

export default App;
