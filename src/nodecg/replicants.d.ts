import { Assets } from "./asset";
import { RunArray, TwitchTokens } from './generated';
import { SurroundRunIndex } from './generated/surroundRunIndex';

type ReplicantMap = {
  runArray: RunArray;
  twitchTokens: TwitchTokens;
  surroundRunIndex: SurroundRunIndex;
};

export {
  RunArray,
  TwitchTokens,
  SurroundRunIndex,
  ReplicantMap,
};
