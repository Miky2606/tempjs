



export type typeApp = 'web' | 'api' | 'mobile'


export interface AppTemplate {
    id: string,
    name: string,
    dependencies: object,
    devDependencies: object,
    scripts: object,
    extension: string,
    type: typeApp,
    root: string

}

export interface Dependencies {
    id: string,
    name: string,
    dependencies: object,
    devDependencies: object
}

export interface FileTemplate {
    id: string,
    name: string,
    creator: string,
    code: string,
    type: string

}





