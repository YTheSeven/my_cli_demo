import inquirer from "inquirer"; // 命令行交互
import download from "download-git-repo"; // 下载远程模板
import chalk from "chalk"; // 命令行文字颜色
import ora from "ora"; // 命令行交互的 loading
import fs from "fs"; // 文件操作
import { rimrafSync } from "rimraf"; // 删除文件夹

import config from "../../config.js";

const myAction = async () => {
  // 命令行的执行逻辑代码
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      choices: config.framework,
      message: "请选择下载的项目",
    },
    {
      type: "input",
      name: "project",
      message: "请输入项目名称(默认为仓库名称)",
    },
  ]);
  const spinner = ora().start();
  spinner.text = "正在下载项目代码...";
  const gitUrl = config.frameworkUrls[answer.framework];
  let projectName = "";
  if (!answer.project) {
    projectName = gitUrl.substring(
      gitUrl.lastIndexOf("/") + 1,
      gitUrl.lastIndexOf("."),
    );
  } else {
    projectName = answer.project;
  }
  downloadCode({
    gitUrl,
    projectName,
    spinner,
    answer,
  });
};

function downloadCode(params) {
  const { gitUrl, projectName, spinner, answer } = params;
  const hasFile = fs.existsSync(`./${projectName}`);
  if (hasFile) {
    console.log("发现同名目录，删除后进行clone");
    rimrafSync(`./${projectName}`);
  }
  download(`direct:${gitUrl}`, `./${projectName}`, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed("代码仓库下载成功");
      console.log(chalk.green.bold("Done!"), chalk.yellow("you run:"));
      console.log(chalk.blue.bold("cd ") + chalk.yellow(projectName));
      console.log(chalk.blue.bold("pnpm install"));
      if (answer.framework != "utils") {
        console.log(chalk.blue.bold("pnpm serve:dev "));
      }
    } else {
      console.log(err);
      spinner.fail("代码仓库下载失败");
    }
  });
}

export default myAction;
