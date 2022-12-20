import { createStore } from "solid-js/store";
import { createMatch, Match } from "../helpers/tournament-generator";

type BracketStore = {
  name: string;
  participants: string[];
  matches: Match | null;
};

export const [bracketStore, setBracketStore] = createStore<BracketStore>({
  name: "",
  participants: [],
  matches: null,
});

export const startBracket = (name: string, participants: string[]) => {
  setBracketStore({
    name,
    participants,
    matches: createMatch({ players: participants }),
  });
};
