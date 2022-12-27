import { Component, For, Match as SolidMatch, Switch } from "solid-js";
import {
  isLeaf as isLeafMatch,
  MatchPair,
  type Match as MatchType,
} from "../helpers/tournament";
import Match from "./Match";

const Tournament: Component<{ match: MatchType | null }> = (props) => {
  return (
    <Switch>
      <SolidMatch when={props.match === null}>
        <p>Loading...</p>
      </SolidMatch>
      <SolidMatch when={isLeafMatch(props.match!)}>
        <Match match={props.match!} />
      </SolidMatch>
      <SolidMatch when={!isLeafMatch(props.match!)}>
        {/* .item */}
        <div class="flex flex-row-reverse">
          {/* .item-parent */}
          <div class="relative ml-12 flex items-center after:absolute after:content-[''] after:w-6 after:h-[2px] after:left-0 after:top-1/2 after:bg-white after:-translate-x-full">
            <Match match={props.match!} />
          </div>
          {/* .item-childrens */}
          <div class="flex flex-col justify-center">
            <For each={props.match!.players as MatchPair}>
              {(match) => (
                // .item-child
                <div class="flex items-start justify-end my-1 relative before:content-[''] before:absolute before:bg-white before:right-0 before:top-1/2 before:translate-x-full before:w-6 before:h-[2px] after:content-[''] after:absolute after:bg-white after:-right-[24px] after:h-[calc(50%+24px)] after:w-[2px] after:top-1/2 last:after:-translate-y-full only:after:hidden">
                  <Tournament match={match} />
                </div>
              )}
            </For>
          </div>
        </div>
      </SolidMatch>
    </Switch>
  );
};

export default Tournament;
