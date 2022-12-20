import { useNavigate } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { startBracket } from "../stores/bracket.store";

const Home: Component = () => {
  const navigate = useNavigate();

  const [bracketName, setBracketName] = createSignal("");
  const [players, setPlayers] = createSignal("");

  const onSubmit = () => {
    startBracket(bracketName(), players().split("\n"));
    navigate("/bracket");
  };

  return (
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-5xl font-extrabold text-violet-600 dark:text-violet-500 text-center py-8">
        Create Bracket
      </h1>
      <div class="w-3/4 md:w-96 lg:w-[700px] py-2">
        <label class="sr-only" for="name">
          Bracket Name (optional)
        </label>

        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500
          focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
          placeholder="Bracket Name (optional)"
          type="text"
          value={bracketName()}
          onInput={(e) => setBracketName(e.currentTarget.value)}
        />
      </div>
      <div class="w-3/4 md:w-96 lg:w-[700px] py-2">
        <label class="sr-only" for="message">
          Player Names
        </label>
        <textarea
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
          focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
          placeholder="Player Names"
          rows="8"
          required
          value={players()}
          onInput={(e) => setPlayers(e.currentTarget.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        class="my-8 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-violet-700 sm:w-fit
        hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-600
        dark:hover:bg-violet-700 dark:focus:ring-violet-800"
        onClick={onSubmit}
      >
        Start Bracket
      </button>
    </div>
  );
};

export default Home;
