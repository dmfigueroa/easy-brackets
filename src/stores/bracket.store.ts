import { createStore } from "solid-js/store";

interface BracketStore {
  name: string;
  participants: string[];
}

export const [bracketStore, setBracketStore] = createStore<BracketStore>({
  name: "",
  participants: [],
});

export const startBracket = (name: string, participants: string[]) => {
  setBracketStore({ name, participants });
};
