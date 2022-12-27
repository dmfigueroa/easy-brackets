import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { type Match } from "../helpers/tournament";
import { createMatch, type Players } from "../helpers/tournament-generator";

type BracketStore = {
  name: string;
  participants: string[];
  matches: Match | null;
};

function createBracketStore() {
  const [store, setStore] = createStore<BracketStore>({
    name: "",
    participants: [],
    matches: null,
  });

  const startBracket = async (name: string, participants: Players) => {
    setStore({
      name,
      participants,
      matches: null,
    });
    await createMatch({ players: participants });
  };

  const setMatches = (matches: Match) =>
    setStore((store) => ({ ...store, matches }));

  return {
    store,
    setStore,
    startBracket,
    setMatches,
  };
}

export default createRoot(createBracketStore);
