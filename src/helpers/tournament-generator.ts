import { isLeaf } from "./tournament";
import type { Match, PlayersPair } from "./tournament";
import bracketsStore from "../stores/bracket.store";

export type Players = [string, string, ...string[]];

const enum Action {
  Insert = "insert",
  Wrap = "wrap",
}

const pairPlayers = (players: Players) => {
  return players.reduce<PlayersPair[]>((acc, player, index) => {
    if (index % 2 === 0) {
      if (index === players.length - 1) {
        return [...acc, [player, ""]];
      }
      return acc;
    }
    return [...acc, [players[index - 1], player]];
  }, []);
};

const matchWeights = (match: Match) => {
  return match.players.map((player) => matchWeight(player)) as [number, number];
};

export const matchWeight = (match: Match | string): number => {
  if (typeof match === "string") return 1;
  const [leftValue, rightValue] = matchWeights(match);
  return leftValue + rightValue;
};

const getAction = (match: Match): Action => {
  const [leftValue, rightValue] = match.players.map((player) =>
    matchWeight(player)
  );

  if (leftValue == rightValue) return Action.Wrap;
  return Action.Insert;
};

type InsertParams = { first: Match; second: Match; players: PlayersPair };

const insertLeft = ({ first, second, players }: InsertParams): Match => ({
  players: [insertMatch(first, players), second],
});

const insertRight = ({ first, second, players }: InsertParams): Match => ({
  players: [first, insertMatch(second, players)],
});

const insertMatch = (root: Match, players: PlayersPair): Match => {
  if (isLeaf(root)) {
    return { players: [root, { players }] };
  }

  const [firstValue, secondValue] = matchWeights(root);
  const [firstMatch, secondMatch] = root.players;

  console.log("insertMatch", { firstValue, secondValue, root, players });

  if (firstValue > secondValue) {
    if (secondValue % 4 === 0 && firstValue % 4 !== 0)
      return insertLeft({ first: firstMatch, second: secondMatch, players });

    return insertRight({ first: firstMatch, second: secondMatch, players });
  }

  return insertLeft({ first: firstMatch, second: secondMatch, players });
};

const addInDirection = (
  match: Match,
  players: PlayersPair,
  action: Action
): Match => {
  console.log("addInDirection", { match, players, action });
  switch (action) {
    case Action.Insert:
      return insertMatch(match, players);
    case Action.Wrap:
      if (isLeaf(match)) {
        return { players: [match, { players }] };
      }
      const [firstMatch, secondMatch] = match.players;
      return {
        players: [{ players: [firstMatch, { players }] }, secondMatch],
      };
  }
};

export async function createMatch({
  players,
}: {
  players: Players;
}): Promise<Match> {
  // Sort players randomly
  const sortedPlayers = players.sort(() => Math.random() - 0.5);

  const { setMatches } = bracketsStore;

  const pairs = pairPlayers(sortedPlayers);
  let root: Match | null = null;

  // Create matches
  for await (const pair of pairs) {
    if (!root) {
      root = { players: pair };
      continue;
    }

    root = addInDirection(root, pair, getAction(root));
    setMatches(root);
  }
  return root as Match;
}

// Promise to wait for a given number of seconds
export const wait = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
