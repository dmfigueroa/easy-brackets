import { A, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import bracketStore from "../stores/bracket.store";
import Tournament from "../components/Tournament";

const Bracket: Component = () => {
  const navigate = useNavigate();
  const { store } = bracketStore;

  const title = store.name;

  if (!title) navigate("/");
  return (
    <div>
      <nav class="flex">
        <A
          class="mx-4 my-8 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-violet-700 sm:w-fit hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
          href="/"
        >
          New Tournament
        </A>
        <h1 class="w-auto m-auto text-5xl font-extrabold text-violet-600 dark:text-violet-500 text-center py-8">
          {title}
        </h1>
      </nav>
      <div class="flex h-full justify-center">
        <Tournament match={store.matches} />
      </div>
    </div>
  );
};

export default Bracket;
