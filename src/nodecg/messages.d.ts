export type MessageMap = {

  'spreadsheet.sheets': {
    data: { spreadsheetUri: string },
    result: Array<string>,
  },

  'channels.import': {
    data: {
      spreadsheetUri: string,
      sheetName: string,
    },
  },

  'current.update': {
    data: {
      newCurrent: string,
    }
  }
};
