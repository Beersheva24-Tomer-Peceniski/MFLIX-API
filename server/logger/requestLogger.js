import morgan from "morgan";
import 'dotenv/config'
import fs from "fs-extra";
import config from "config";

const environment = process.env.NODE_ENV;

const streamConfig = config.get("morgan.stream");
const morganType = config.get("morgan.type");

const logsDir = "logs";
fs.ensureDirSync(logsDir);

const stream = streamConfig === "console"
    ? process.stdout
    : fs.createWriteStream(streamConfig, { flags: "a" })

const requestLogger = morgan(morganType, { stream });
export default requestLogger;