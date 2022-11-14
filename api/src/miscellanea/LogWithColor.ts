import chalk from "chalk";

export default class LogWithColors {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(
      chalk.green(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.greenBright(args) : args
    );
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  public static error = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.red(args) : args
    );
}

export class LoggingNC {
  public static info = (args: any) =>
    console.log(
      "\x1b[36m%s\x1b[0m",
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === "string" ? args : args
    );

  public static warn = (args: any) =>
    console.log(
      "\x1b[33m%s\x1b[0m",
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === "string" ? args : args
    );

  public static error = (args: any) =>
    console.log(
      "\x1b[31m",
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === "string" ? args : args
    );
}
