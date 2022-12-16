import { Templates, templatesDB } from "./interface"
import { execSync } from "child_process";
import fs from "fs"
export const createProject = (name: string): boolean => {
    if (name === "") return false
    return true
}

//get all templates
export const selectTemplate = (template: string): Templates[] => {
    console.log(template)
    return templatesDB.filter((e: Templates) => e.name === template)
}

//validate the command
export const runCommand = (command: any) => {
    try {
        execSync(`${command}`, { stdio: "inherit" });

    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};


//clone from github
export const createApp = (temp: Templates, repoName: string) => {

    const gitCheckoutCommand = `git clone --depth 1 ${temp.url} ${repoName}`;

    const installDepsCommand = `cd ${repoName} && npm install`;

    console.log(`Cloning the repository with name ${repoName}`);
    const checkedOut = runCommand(gitCheckoutCommand);
    if (!checkedOut) process.exit(-1);

    const installedDeps = runCommand(installDepsCommand);
    if (!installedDeps) process.exit(-1);

    console.log(
        `Congratulations! ${temp.description} `
    );

}

//create the file template
export const createFile = (url: string, name: string) => {
    const fileName = url.split("/")
    const run = execSync(`curl  ${url}`)
    if (run.includes("404: Not Found")) return console.log("Error 404 path doesnt found")

    return fs.writeFile(fileName[fileName.length - 1], run, function (err) {
        if (err) throw err;
        console.log('Created  successfully.');
    });


}