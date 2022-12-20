"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCssFramework = exports.cssTemplate = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
exports.cssTemplate = [{
        id: crypto.randomUUID(),
        name: 'Tailwind',
        dependencies: {}
    },
    {
        id: crypto.randomUUID(),
        name: 'Bootstrap',
        dependencies: {}
    },
    {
        id: crypto.randomUUID(),
        name: 'Sass',
        dependencies: {}
    },
    {
        id: crypto.randomUUID(),
        name: 'CSS',
        dependencies: {}
    }];
exports.selectCssFramework = await inquirer_1.default.prompt({
    type: 'list',
    name: 'css',
    message: 'Select Framework',
    choices: exports.cssTemplate.map(e => e.name)
});
