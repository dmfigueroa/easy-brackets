import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import Bracket from "./pages/Bracket";
import Home from "./pages/Home";

const App: Component = () => {
  return (
    <div class="flex flex-col h-screen">
      <main class="flex-grow">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/bracket" component={Bracket} />
        </Routes>
      </main>
      <footer class="text-center py-2">
        <a
          class="font-medium text-violet-600 dark:text-violet-500 hover:underline"
          href="https://github.com/dmfigueroa/easy-brackets"
          target="_blank"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default App;
