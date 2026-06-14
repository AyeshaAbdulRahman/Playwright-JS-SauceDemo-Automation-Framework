import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Logger from './Logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class JsonReader {
  /**
   * @param {string} fileName
   * @returns {object}
   */
  static readJson(fileName) {
    const filePath = path.resolve(__dirname, '../testData', fileName);
    Logger.info(`Reading JSON file: ${filePath}`);

    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  }
}

export default JsonReader;
