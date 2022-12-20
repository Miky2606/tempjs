"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDB = exports.FileConst = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.FileConst = [
    {
        id: crypto_1.default.randomUUID(),
        name: 'Reset CSS',
        creator: 'Eduardo Fierro',
        code: 'https://raw.githubusercontent.com/eduardofierropro/Reset-CSS/main/css/app.css',
        type: 'css'
    },
    {
        id: crypto_1.default.randomUUID(),
        name: 'Reset SASS',
        creator: 'Eduardo Fierro',
        code: 'https://raw.githubusercontent.com/eduardofierropro/Reset-CSS/main/scss/_reset.scss',
        type: 'sass'
    }
];
exports.appDB = [
    {
        id: crypto_1.default.randomUUID(),
        name: 'React JS',
        dependencies: {},
        devDependencies: {},
        scripts: {},
        extension: ''
    },
    {
        id: crypto_1.default.randomUUID(),
        name: 'Node App TS',
        dependencies: {
            "typescript": "*"
        },
        devDependencies: {
            "tsc-watch": "*"
        },
        scripts: {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "tsc",
            "dev": "tsc-watch --onSuccess \"node ./dist/index.js\""
        },
        extension: 'ts'
    }
];
