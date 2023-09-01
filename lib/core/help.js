import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const packageJsonPath = resolve(__dirname, "../../package.json");
const packageJsonData = JSON.parse(readFileSync(packageJsonPath, "utf8"));

const myhelp = function (program) {
  program.version(packageJsonData.version, "-v, --version");
  program.option("-f --framework <framework>", "设置框架");
};

export default myhelp;
