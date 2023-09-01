#!/usr/bin/env node
// 声明解释器
import { program } from "commander";
import myhelp from "../lib/core/help.js";
import myCommander from "../lib/core/commander.js";

myhelp(program);
myCommander(program);

program.parse(process.argv);
