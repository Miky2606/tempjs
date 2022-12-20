"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssTemplate = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.cssTemplate = [{
        id: crypto_1.default.randomUUID(),
        name: 'Tailwind',
        dependencies: {},
        devDependencies: {
            "autoprefixer": "^10.4.13",
            "postcss": "^8.4.20",
            "tailwindcss": "^3.2.4"
        }
    },
    {
        id: crypto_1.default.randomUUID(),
        name: 'Sass',
        dependencies: {
            'sass': '*'
        },
        devDependencies: {}
    },
    {
        id: crypto_1.default.randomUUID(),
        name: 'CSS',
        dependencies: {},
        devDependencies: {}
    }];
