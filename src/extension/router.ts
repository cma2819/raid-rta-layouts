import { NodeCG } from './nodecg';
import { runDataRepository } from './runDataRepository';
import { spreadsheet } from './spreadsheet';
import { getTwitchDataByNames } from './twitch';
import { v4 as uuidV4 } from 'uuid';
import { RunData } from '../nodecg/generated/lib';
import { timeStringToSeconds, twitchUrlToName } from './lib/helper';
import { surroundRunIndex } from './surroundRunIndex';

export const messageRouter = (nodecg: NodeCG): void => {

  const logger = new nodecg.Logger('router');

  nodecg.listenFor('spreadsheet.sheets', async ({spreadsheetUri}, cb) => {

    if (cb && cb.handled) {
      return;
    }

    try {
      const titles = await spreadsheet.readSheetTitles(spreadsheetUri)
      cb && cb(null, titles);
    } catch (e) {
      logger.error('Failed to read spreadsheet names.');
      logger.error(e);
      cb && cb(e);
    }

  });

  nodecg.listenFor('channels.import', async ({ spreadsheetUri, sheetName }, cb) => {

    if (cb && cb.handled) {
      return;
    }

    try {
      const sheetData = await spreadsheet.readSpreadsheet(spreadsheetUri, sheetName);
      logger.debug('Import data:');
      logger.debug(sheetData);

      const twitchNames = sheetData.map((data) => {
        return twitchUrlToName(data['twitch']);
      }).filter((name): name is string => {return name !== null});
      
      logger.debug(`Load twitch data with ${JSON.stringify(twitchNames)}`);
      const twitchArray = await getTwitchDataByNames(twitchNames);

      // Make RunData
      const runDataArray: Array<RunData> = sheetData.map((data) => {
        const uuid = uuidV4();
        const twitchName = twitchUrlToName(data['twitch']);
        return {
          uuid,
          game: data['game'],
          category: data['category'],
          estimate: data['estimate'],
          estimateInSeconds: timeStringToSeconds(data['estimate']),
          player: {
            name: data['player'],
            twitch: twitchArray.find((twitch) => {
              return twitch.login === twitchName;
            }),
          }
        }
      });

      runDataRepository.setRunData(runDataArray);

    } catch (e) {
      logger.error('[channels.import]');
      logger.error(e);
    }
  });

  nodecg.listenFor('current.update', ({newCurrent}, cb) => {

    if (cb && cb.handled) {
      return;
    }

    try {
      surroundRunIndex.updateCurrentTo(newCurrent, runDataRepository.all())
    } catch (e) {
      logger.error('[current.update]');
      logger.error(e);
      cb && cb(e);
    }
  });
}