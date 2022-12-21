"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonCreate = exports.writeFile = exports.replace = void 0;
const fs_1 = __importDefault(require("fs"));
const cssFramework_1 = require("../../const/cssFramework");
const replace = (text, dir, textreplace) => {
    const index = fs_1.default.readFileSync(dir, 'utf-8');
    const replace = index.replace(text, textreplace);
    fs_1.default.writeFileSync(dir, replace);
};
exports.replace = replace;
const writeFile = (dir, data) => {
    try {
        fs_1.default.writeFileSync(`${dir}/src/index.scss`, data);
    }
    catch (error) {
        console.log(error);
    }
};
exports.writeFile = writeFile;
const jsonCreate = (app, dir, appDB) => {
    const json = JSON.parse(fs_1.default.readFileSync(`${dir}/package.json`).toString());
    json.name = app.name;
    if (app.css !== '' || app.css !== 'CSS') {
        Object.assign(json, addCSSDepencies(app, json));
    }
    else {
        Object.assign(json, addDepencies(appDB, json));
    }
    fs_1.default.writeFileSync(`${dir}/package.json`, JSON.stringify(json));
};
exports.jsonCreate = jsonCreate;
const addCSSDepencies = (app, json) => {
    const css = cssFramework_1.cssTemplate.find(e => e.name === app.css);
    if (Object.keys(css.dependencies).length > 0)
        Object.assign(json.dependencies, css.dependencies);
    if (Object.keys(css.devDependencies).length > 0)
        Object.assign(json.devDependencies, css.devDependencies);
    return json;
};
const addDepencies = (appDB, json) => {
    if (Object.keys(appDB.dependencies).length > 0)
        Object.assign(json, appDB.dependencies);
    if (Object.keys(appDB.scripts).length > 0)
        Object.assign(json, appDB.scripts);
    if (Object.keys(appDB.devDependencies).length > 0)
        Object.assign(json, appDB.devDependencies);
    return json;
};
