#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const controller_1 = require("./controller/controller");
const controller_prompt_1 = require("./controller/controller.prompt");
const cssFramework_1 = require("./const/cssFramework");
const appTemplates_1 = require("./const/appTemplates");
let app = {
    name: '',
    css: '',
    comunity: ''
};
let comunity = '';
let framework = '';
(async () => {
    try {
        const choice = await inquirer_1.default.prompt({
            type: 'list',
            name: 'choice',
            message: "Select Create App or Take File",
            choices: ['Create App', 'Select File']
        });
        if (choice.choice === 'Select File')
            return (0, controller_prompt_1.selectFile)();
        const selectApp = await inquirer_1.default.prompt({
            type: 'list',
            name: 'app',
            message: 'Choice App',
            choices: appTemplates_1.appDB.map(e => e.name)
        });
        const find = appTemplates_1.appDB.find(e => selectApp.app === e.name);
        if (find.type === 'web') {
            const selectCssFramework = await inquirer_1.default.prompt({
                type: 'list',
                name: 'css',
                message: 'Select Framework',
                choices: cssFramework_1.cssTemplate.map(e => e.name)
            });
            if (selectCssFramework.css === 'CSS' || selectCssFramework.css === 'Sass') {
                const style = appTemplates_1.FileConst.find(e => e.type === selectCssFramework.css.toLowerCase());
                const choiceComunnityCss = await inquirer_1.default.prompt({
                    type: 'list',
                    message: 'Community Style',
                    name: 'style',
                    choices: [style.name, 'None']
                });
                comunity = choiceComunnityCss.style;
            }
            framework = selectCssFramework.css;
        }
        const template = await inquirer_1.default.prompt({
            type: 'input',
            name: 'nameApp',
            message: 'Name For The App',
        });
        if (template.nameApp === "")
            return console.error("Error:  I need a name for the app");
        app = {
            name: template.nameApp,
            css: framework,
            comunity
        };
        (0, controller_1.createReactApp)(app, find);
    }
    catch (error) {
        console.log(`Error:${error}`);
    }
})();
