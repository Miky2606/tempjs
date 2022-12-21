"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReactApp = void 0;
const fs_1 = __importDefault(require("fs"));
const function_css_frameworl_1 = require("./functions/function.css.frameworl");
const functions_fs_1 = require("./functions/functions.fs");
const command_1 = require("./functions/command");
const controller_prompt_1 = require("./controller.prompt");
const createReactApp = async (app, appDB) => {
    const dir = `./${app.name}`;
    let existJson = false;
    try {
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir);
        fs_1.default.readdirSync(appDB.root, { withFileTypes: true })
            .filter(e => {
            if (!e.isDirectory()) {
                const data = fs_1.default.readFileSync(`${appDB.root}/${e.name}`);
                fs_1.default.writeFileSync(`${dir}/${e.name}`, data);
                if (e.name === 'package.json') {
                    existJson = true;
                    (0, functions_fs_1.jsonCreate)(app, dir, appDB);
                }
            }
            else {
                fs_1.default.readdirSync(`${appDB.root}/${e.name}`, { withFileTypes: true })
                    .filter(type => !type.isDirectory())
                    .forEach(files => {
                    if (e.name !== "node_modules") {
                        const data = fs_1.default.readFileSync(`${appDB.root}/${e.name}/${files.name}`);
                        if (!fs_1.default.existsSync(`${dir}/${e.name}/`))
                            fs_1.default.mkdirSync(`${dir}/${e.name}/`);
                        fs_1.default.writeFileSync(`${dir}/${e.name}/${files.name}`, data);
                    }
                });
            }
        });
        if (appDB.type === 'web')
            (0, function_css_frameworl_1.cssCreateFramework)(app, dir);
        if (app.comunity !== '')
            (0, controller_prompt_1.createFileComunity)(app.comunity, dir);
        if (existJson) {
            const installDepsCommand = `cd ${app.name} && npm install`;
            (0, command_1.runCommand)(installDepsCommand);
            if (!command_1.runCommand)
                return console.log("Error in the installation");
            console.log("%c Congratulations! You are ready. Follow the following commands to start", 'color: #1c87c9; font-size: 18px');
            console.log(`cd ${app.name} && npm start`);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.createReactApp = createReactApp;
