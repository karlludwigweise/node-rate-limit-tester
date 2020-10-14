import fetch from "node-fetch";
import chalk from "chalk";
import yargs from "yargs";

const params = yargs(process.argv.slice(2)).argv;
const length = params.n || 10;
const requests = new Array(length).fill(null);

if (params.u) {
  const numLength = `${params.n}`.length;
  console.log(chalk.bgRgb(255, 140, 105)(params.u));
  requests.map(async (x, i) => {
    const reqNo = `#${`${i}`.padStart(numLength, "0")}`;
    const resp = await fetch(params.u).catch((e) => e);
    if (resp.status === 200) {
      console.log(reqNo, chalk.green(resp.status));
    } else if (typeof resp === "number") {
      console.log(reqNo, chalk.bgRedBright(resp.status));
    } else {
      console.log(reqNo, chalk.bgRedBright("FAILED"));
    }
  });
} else {
  console.log(chalk.red("Param -u is not set"));
}
