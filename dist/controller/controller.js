"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReactApp = exports.createAppNew = exports.fileApp = exports.createTS = exports.createApp = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const https_1 = __importDefault(require("https"));
const package_1 = require("../package/package");
const function_css_frameworl_1 = require("./functions/function.css.frameworl");
const functions_fs_1 = require("./functions/functions.fs");
const command_1 = require("./functions/command");
const createApp = (name, object) => {
    const dir = `./${name}`;
    package_1.jsonPack.name = name;
    try {
        if (object.extension === 'ts') {
            (0, exports.createTS)(dir, object);
        }
        fs_1.default.mkdirSync(`${dir}/src`);
        fs_1.default.writeFileSync(`${dir}/package.json`, JSON.stringify(package_1.jsonPack));
        fs_1.default.writeFileSync(`${dir}/src/index.${object.extension}`, "console.log('yes')");
        console.log("Project Created");
    }
    catch (error) {
        console.error(`Error: ${error}`);
    }
};
exports.createApp = createApp;
const createTS = (dir, object) => {
    package_1.jsonPack.dependencies = object.dependencies;
    package_1.jsonPack.scripts = object.scripts;
    package_1.jsonPack.devDependencies = object.devDependencies;
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir);
    if (!fs_1.default.existsSync(`${dir}/dist`))
        fs_1.default.mkdirSync(`${dir}/dist`);
    fs_1.default.writeFileSync(`${dir}/dist/index.js`, '');
    fs_1.default.writeFileSync(`${dir}/tsconfig.json`, JSON.stringify(package_1.tsconfig));
    fs_1.default.mkdirSync(`${dir}/src`);
    fs_1.default.writeFileSync(`${dir}/package.json`, JSON.stringify(package_1.jsonPack));
    fs_1.default.writeFileSync(`${dir}/src/index.ts`, "console.log('yes')");
};
exports.createTS = createTS;
const fileApp = async (object) => {
    try {
        if (!fs_1.default.existsSync(`./styles`))
            fs_1.default.mkdirSync('./styles');
        // fs.writeFileSync(`./styles/reset.${object.extension}`, object.code)
        var result = path_1.default.extname(url_1.default.parse(object.code).pathname);
        const writer = fs_1.default.createWriteStream(`./styles/reset${result}`);
        https_1.default.get(object.code, response => {
            response.pipe(writer);
        });
        console.log("✅ Created");
        console.log(`Import the style from './styles/reset${result}'`);
    }
    catch (error) {
        console.error(`❗Error: ${error}`);
    }
};
exports.fileApp = fileApp;
const createAppNew = (dependencies, find) => {
    console.log(dependencies, find);
};
exports.createAppNew = createAppNew;
const createReactApp = async (app) => {
    const dir = `./${app.name}`;
    try {
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir);
        fs_1.default.readdirSync('./src/templates/react', { withFileTypes: true })
            .filter(e => {
            if (!e.isDirectory()) {
                const data = fs_1.default.readFileSync(`./src/templates/react/${e.name}`);
                fs_1.default.writeFileSync(`${dir}/${e.name}`, data);
                if (e.name === 'package.json') {
                    (0, functions_fs_1.jsonCreate)(app, dir);
                }
            }
            else {
                fs_1.default.readdirSync(`./src/templates/react/${e.name}`, { withFileTypes: true })
                    .filter(type => !type.isDirectory())
                    .forEach(files => {
                    if (e.name !== "node_modules") {
                        const data = fs_1.default.readFileSync(`./src/templates/react/${e.name}/${files.name}`);
                        if (!fs_1.default.existsSync(`${dir}/${e.name}/`))
                            fs_1.default.mkdirSync(`${dir}/${e.name}/`);
                        fs_1.default.writeFileSync(`${dir}/${e.name}/${files.name}`, data);
                    }
                });
            }
        });
        (0, function_css_frameworl_1.cssCreateFramework)(app, dir);
        const installDepsCommand = `cd ${app.name} && npm install`;
        (0, command_1.runCommand)(installDepsCommand);
        if (!command_1.runCommand)
            return console.log("Error in the installation");
        console.log("Congratulations! You are ready. Follow the following commands to start");
        console.log(`cd ${app.name} && npm start`);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createReactApp = createReactApp;
