import myAction from "./action.js";

const myCommander = function (program) {
  program
    .command("install [other...]")
    .description("安装项目")
    .alias("i")
    .action(myAction);
};

export default myCommander;
