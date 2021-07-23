import { NodeCG } from './nodecg';
import { messageRouter } from './router';
import { initRunDataRepository } from './runDataRepository';
import { initSpreadsheet } from './spreadsheet';
import { initSurroundRunIndex } from './surroundRunIndex';
import { twitch } from './twitch';

export = (nodecg: NodeCG): void => {
  initRunDataRepository(nodecg);
  initSpreadsheet(nodecg);
  initSurroundRunIndex(nodecg);
  twitch(nodecg);
  messageRouter(nodecg);
}