import { Logger } from 'ts-nodecg/helper/logger';
import { googleSpreadsheetUrlToId } from './lib/helper';
import { NodeCG } from './nodecg';
import { google, sheets_v4 as sheets } from 'googleapis';

let logger: Logger;
let googleSpreadsheet: sheets.Sheets;

export const initSpreadsheet = (nodecg: NodeCG) => {
  logger = new nodecg.Logger('spreadsheet');
  const googleApiKey = nodecg.bundleConfig.googleApiKey;
  if (!googleApiKey) {
      logger.warn('Google API Key is undefined.');
  }
  googleSpreadsheet = google.sheets({
      version: 'v4',
      auth: googleApiKey
  });
}

export const spreadsheet = {

  readSheetTitles: async (uri: string): Promise<Array<string>> => {
    const spreadsheetId = googleSpreadsheetUrlToId(uri);
    
    if (spreadsheetId === '') {
      throw new Error('Spreadsheet URL is invalid.');
    }
    // Get spreadsheet basis
    const spreadsheetBasis = await googleSpreadsheet.spreadsheets.get({
        spreadsheetId: spreadsheetId
    });

    return spreadsheetBasis.data.sheets?.map((sheet) => {
        return sheet.properties ? sheet.properties.title || '' : '';
    }).filter((title) => {
        return title !== '';
    }) || [];
  },

  readSpreadsheet: async (uri: string, sheetName: string): Promise<Array<{[k: string]: any}>> => {
    const spreadsheetId = googleSpreadsheetUrlToId(uri);

    if (spreadsheetId === '') {
      throw new Error('Spreadsheet URL is invalid.');
    }

    const valueResponse = await googleSpreadsheet.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });
    if (!valueResponse.data.values) {
      return [];
    }
    
    const values = valueResponse.data.values;
    const columns = values[0];
    const dataRows = values.slice(1);

    return dataRows.map((row) => {
      return Object.fromEntries(columns.map((col, index) => {
        return [col, row[index]];
      }))
    });
  }
}