import { Logger } from "tslog";

export const mainLogger = new Logger({
  minLevel: 1,
  name: "MainLogger",
  prettyLogTemplate: "{{hh}}:{{MM}}:{{ss}} {{logLevelName}} ",
  stylePrettyLogs: true,
  prettyLogStyles: {
    logLevelName: {
      DEBUG: ["bold", "green"],
      INFO: ["bold", "blue"],
      WARN: ["bold", "yellow"],
      ERROR: ["bold", "red"],
      FATAL: ["bold", "redBright"],
    },
  },
});
