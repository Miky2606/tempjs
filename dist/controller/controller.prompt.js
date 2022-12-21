"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileComunity = exports.selectFile = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const appTemplates_1 = require("../const/appTemplates");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const https_1 = __importDefault(require("https"));
const selectFile = async () => {
    const file = await inquirer_1.default.prompt({
        type: 'list',
        name: 'file',
        message: 'Select Template',
        suffix: 'hola',
        choices: appTemplates_1.FileConst.map(e => e.name + ` (${e.creator})`),
    });
    const find = appTemplates_1.FileConst.find(e => e.name + ` (${e.creator})` === file.file);
    fileApp(find, './styles');
};
exports.selectFile = selectFile;
const fileApp = async (object, dir) => {
    try {
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir);
        var result = path_1.default.extname(url_1.default.parse(object.code).pathname);
        const writer = fs_1.default.createWriteStream(`${dir}/reset${result}`);
        https_1.default.get(object.code, response => {
            response.pipe(writer);
        });
        console.log("✅ Created");
        console.log(`Import the style from '${dir}/styles/reset${result}'`);
    }
    catch (error) {
        console.error(`❗Error: ${error}`);
    }
};
const createFileComunity = (name, dir) => {
    const root = `${dir}/styles/`;
    if (!fs_1.default.existsSync(root))
        fs_1.default.mkdirSync(root);
    const find = appTemplates_1.FileConst.find(e => e.name === name);
    var result = path_1.default.extname(url_1.default.parse(find.code).pathname);
    fileApp(find, root);
    const text = `import  './styles/reset${result}' \n`;
    const code = fs_1.default.readFileSync(`${dir}/src/index.jsx`);
    fs_1.default.writeFileSync(`${dir}/src/index.jsx`, text);
    fs_1.default.appendFileSync(`${dir}/src/index.jsx`, code);
};
exports.createFileComunity = createFileComunity;
