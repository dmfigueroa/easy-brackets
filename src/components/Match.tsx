import { Component } from "solid-js";
import {
  getFirstPlayer,
  getSecondPlayer,
  type Match as MatchType,
} from "../helpers/tournament";

const Match: Component<{ match: MatchType }> = (props) => (
  <div class="m-0 bg-slate-700 border-purple-700/40 border grow text-purple-400 font-bold rounded-xl shadow-md backdrop-blur hover:shadow-2xl">
    <div class="flex flex-col w-48 gap-[3px] bg-purple-400 rounded-xl">
      <p class="flex items-center p-5 h-7 text-start bg-slate-700 rounded-t-xl border-t-0">
        {getFirstPlayer(props.match)}
      </p>
      <p class="flex items-center justify-end p-5 h-7 text-end bg-slate-700 rounded-b-xl border-b-0">
        {getSecondPlayer(props.match)}
      </p>
    </div>
  </div>
  //   <Switch>
  //     <SolidMatch when={!isLeafMatch(props.match)}>
  //       <p class={matchClasses}>Not played ({matchWeight(props.match)})</p>
  //     </SolidMatch>
  //     <SolidMatch when={isLeafMatch(props.match)}>
  //       {/* .item p */}
  //       <p class={matchClasses}>
  //         {props.match.players[0] as string} vs.{" "}
  //         {props.match.players[1] as string} ({matchWeight(props.match)})
  //       </p>
  //     </SolidMatch>
  //   </Switch>
);

export default Match;
