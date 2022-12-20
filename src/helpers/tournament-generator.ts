export type Match = {
  players: PlayersPair | MatchPair;
  winner?: string;
};

const enum Action {
  Insert = "insert",
  Wrap = "wrap",
}

type PlayersPair = [string, string];
type MatchPair = [Match, Match];

const isLeaf = (match: Match): boolean => {
  return (
    typeof match.players[0] === "string" && typeof match.players[1] === "string"
  );
};

const pairPlayers = (players: string[]) => {
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
  return match.players.map((player) => matchWeight(player) + 1) as [
    number,
    number
  ];
};

const matchWeight = (match: Match | string): number => {
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

const insertMatch = (root: Match, players: PlayersPair): Match => {
  if (isLeaf(root)) {
    return { players: [root, { players }] };
  }

  const [firstValue, secondValue] = matchWeights(root);
  const [firstMatch, secondMatch] = root.players as MatchPair;

  if (firstValue < secondValue) {
    return {
      players: [insertMatch(firstMatch, players), secondMatch],
    };
  }

  return {
    players: [firstMatch, insertMatch(secondMatch, players)],
  };
};

const addInDirection = (
  match: Match,
  players: PlayersPair,
  action: Action
): Match => {
  const [firstMatch, secondMatch] = match.players as MatchPair;
  switch (action) {
    case Action.Insert:
      return insertMatch(match, players);
    case Action.Wrap:
      if (isLeaf(match)) {
        return { players: [match, { players }] };
      }
      return {
        players: [{ players: [firstMatch, { players }] }, secondMatch],
      };
  }
};

export function createMatch({ players }: { players: string[] }): Match {
  // Sort players randomly
  const sortedPlayers = players.sort(() => Math.random() - 0.5);

  const pairs = pairPlayers(sortedPlayers);
  let root: Match | null = null;

  // Create matches
  for (const pair of pairs) {
    if (!root) {
      root = { players: pair };
      continue;
    }

    root = addInDirection(root, pair, getAction(root));
  }
  return root as Match;
}
