import * as FM from "./fm.js";


const logFilePath = "./log.txt";

export async function log(content) {
  const timestamp = new Date().toLocaleString("en-GB", { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const success = await FM.append(logFilePath, `[ ${timestamp} ]: ${content}\n`);

  if (!success) {
    console.error(`Failed to log content: ${content}`);
  }
}