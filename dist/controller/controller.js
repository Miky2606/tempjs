"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.createApp = exports.runCommand = exports.selectTemplate = exports.createProject = void 0;
const interface_1 = require("./interface");
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const createProject = (name) => {
    if (name === "")
        return false;
    return true;
};
exports.createProject = createProject;
//get all templates
const selectTemplate = (template) => {
    console.log(template);
    return interface_1.templatesDB.filter((e) => e.name === template);
};
exports.selectTemplate = selectTemplate;
//validate the command
const runCommand = (command) => {
    try {
        (0, child_process_1.execSync)(`${command}`, { stdio: "inherit" });
    }
    catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};
exports.runCommand = runCommand;
//clone from github
const createApp = (temp, repoName) => {
    const gitCheckoutCommand = `git clone --depth 1 ${temp.url} ${repoName}`;
    const installDepsCommand = `cd ${repoName} && npm install`;
    console.log(`Cloning the repository with name ${repoName}`);
    const checkedOut = (0, exports.runCommand)(gitCheckoutCommand);
    if (!checkedOut)
        process.exit(-1);
    const installedDeps = (0, exports.runCommand)(installDepsCommand);
    if (!installedDeps)
        process.exit(-1);
    console.log(`Congratulations! ${temp.description} `);
};
exports.createApp = createApp;
//create the file template
const createFile = (url, name) => {
    const fileName = url.split("/");
    const run = (0, child_process_1.execSync)(`curl  ${url}`);
    if (run.includes("404: Not Found"))
        return console.log("Error 404 path doesnt found");
    return fs_1.default.writeFile(fileName[fileName.length - 1], run, function (err) {
        if (err)
            throw err;
        console.log('Created  successfully.');
    });
};
exports.createFile = createFile;
