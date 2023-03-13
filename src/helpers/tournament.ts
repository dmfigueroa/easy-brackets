export type PlayersPair = [string, string];
export type MatchPair = [Match, Match];

type PlayersMatch = { players: PlayersPair; winner?: string };
export type MatchMatch = { players: MatchPair; winner?: string };

export type Match = PlayersMatch | MatchMatch;

export const isLeaf = (match: Match): match is PlayersMatch => {
  return (
    typeof match.players[0] === "string" && typeof match.players[1] === "string"
  );
};

export const getMatchPair = (match: Match): PlayersPair => {
  if (isLeaf(match)) return match.players;

  return [match.players[0].winner || "", match.players[1].winner || ""];
};

// Get number of rounds for a tournament
export const getRounds = (matches: Match): number => {
  if (isLeaf(matches)) return 1;
  const [firstMatch, secondMatch] = matches.players as MatchPair;
  return Math.max(getRounds(firstMatch), getRounds(secondMatch)) + 1;
};

export const getFirstPlayer = (match: Match): string => {
  if (isLeaf(match)) return match.players[0];
  return match.players[0].winner || " ";
};

export const getSecondPlayer = (match: Match): string => {
  if (isLeaf(match)) return match.players[1];
  return match.players[1].winner || " ";
};
