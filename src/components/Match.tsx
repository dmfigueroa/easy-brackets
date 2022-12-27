import { Component, Match as SolidMatch, Switch } from "solid-js";
import {
  isLeaf as isLeafMatch,
  type Match as MatchType,
} from "../helpers/tournament";
import { matchWeight } from "../helpers/tournament-generator";

const Match: Component<{ match: MatchType }> = (props) => (
  <Switch>
    <SolidMatch when={!isLeafMatch(props.match)}>
      <p class="p-5 m-0 bg-white text-purple-700">
        Not played ({matchWeight(props.match)})
      </p>
    </SolidMatch>
    <SolidMatch when={isLeafMatch(props.match)}>
      {/* .item p */}
      <p class="p-5 m-0 bg-white text-purple-700">
        {props.match.players[0] as string} vs.{" "}
        {props.match.players[1] as string} ({matchWeight(props.match)})
      </p>
    </SolidMatch>
  </Switch>
);

export default Match;
