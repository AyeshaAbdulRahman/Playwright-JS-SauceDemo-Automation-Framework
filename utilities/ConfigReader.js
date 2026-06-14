import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Config reader for framework configuration values.
 */
class ConfigReader {
  static config = null;

  static getConfig() {
    if (!this.config) {
      const configPath = path.resolve(__dirname, '../config/config.json');
      const rawData = fs.readFileSync(configPath, 'utf-8');
      this.config = JSON.parse(rawData);
    }
    return this.config;
  }

  static getBaseURL() {
    return this.getConfig().baseURL;
  }

  static getTimeout() {
    return this.getConfig().timeout;
  }

  static getNavigationTimeout() {
    return this.getConfig().navigationTimeout;
  }

  static getActionTimeout() {
    return this.getConfig().actionTimeout;
  }
}

export default ConfigReader;
