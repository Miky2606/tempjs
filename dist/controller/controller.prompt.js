"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFile = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const appTemplates_1 = require("../const/appTemplates");
const controller_1 = require("./controller");
const selectFile = async () => {
    const file = await inquirer_1.default.prompt({
        type: 'list',
        name: 'file',
        message: 'Select Template',
        suffix: 'hola',
        choices: appTemplates_1.FileConst.map(e => e.name + ` (${e.creator})`),
    });
    const find = appTemplates_1.FileConst.find(e => e.name + ` (${e.creator})` === file.file);
    (0, controller_1.fileApp)(find);
};
exports.selectFile = selectFile;
