export interface IFuck_Xemr {
    init(opt: any): void,
    loadHtml(str: string): void,
    getHtml(): string,
    execCommand(cmd: 'preview' | 'new'): void
}