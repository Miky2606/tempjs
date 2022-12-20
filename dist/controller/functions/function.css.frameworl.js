"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssCreateFramework = void 0;
const cssFramework_1 = require("../../const/cssFramework");
const package_1 = require("../../package/package");
const functions_fs_1 = require("./functions.fs");
const fs_1 = __importDefault(require("fs"));
const cssCreateFramework = (app, dir) => {
    if (app.css !== '') {
        const css = cssFramework_1.cssTemplate.find(e => e.name === app.css);
        if (css.name === 'Tailwind') {
            fs_1.default.writeFileSync(`${dir}/tailwind.config.js`, package_1.tailwindconfig);
            fs_1.default.appendFileSync(`${dir}/src/index.css`, package_1.tailwindCss);
        }
        if (css.name === 'Sass') {
            const style = fs_1.default.readFileSync(`${dir}/src/index.css`);
            (0, functions_fs_1.replace)('import "./index.css";', `${dir}/src/index.jsx`, 'import "./index.scss";');
            (0, functions_fs_1.replace)('import "./App.css";', `${dir}/src/App.jsx`, 'import "./App.scss";');
            (0, functions_fs_1.writeFile)(`${dir}/src/index.scss`, style);
            fs_1.default.unlinkSync(`${dir}/src/index.css`);
        }
    }
};
exports.cssCreateFramework = cssCreateFramework;
