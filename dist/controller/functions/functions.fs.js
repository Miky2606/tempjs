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
const jsonCreate = (app, dir) => {
    const json = JSON.parse(fs_1.default.readFileSync(`./src/templates/react/package.json`).toString());
    json.name = app.name;
    if (app.css !== "Css") {
        const css = cssFramework_1.cssTemplate.find(e => e.name === app.css);
        const dependencies = css.dependencies;
        if (Object.keys(css.dependencies).length > 0)
            Object.assign(json.dependencies, dependencies);
        if (Object.keys(css.devDependencies).length > 0)
            json.devDependencies = css.devDependencies;
    }
    fs_1.default.writeFileSync(`${dir}/package.json`, JSON.stringify(json));
    return json;
};
exports.jsonCreate = jsonCreate;
