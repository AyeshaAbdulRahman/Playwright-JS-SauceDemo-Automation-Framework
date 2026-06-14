
class Logger {
  static getTimestamp() {
    return new Date().toISOString();
  }

  static info(message) {
    console.log(`[INFO] [${this.getTimestamp()}] ${message}`);
  }

  static warn(message) {
    console.warn(`[WARN] [${this.getTimestamp()}] ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] [${this.getTimestamp()}] ${message}`);
  }
}

export default Logger;
