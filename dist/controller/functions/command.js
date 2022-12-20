"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const child_process_1 = require("child_process");
const runCommand = (command) => {
    try {
        (0, child_process_1.execSync)(`${command}`, { stdio: "inherit" });
    }
    catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};
exports.runCommand = runCommand;
