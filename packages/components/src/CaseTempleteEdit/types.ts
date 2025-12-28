// mode
// 1. DESIGN 设计模式；
// 2. EDITOR 编辑模式；
// 3. STRICT 严格模式（表单模式）；
// 4. READONLY 只读模式；可以把整个表格的内容修改了
export interface ICaseEditProps {
    onChange?(str?: string): void;
    value?: string;
    containerProps?: { width?: number, height?: number };
    toolbars?: any;
    mode?: 'DESIGN' | 'EDITOR' | 'STRICT' | 'READONLY';
    emr_mode?: 'design' | 'form';

    hiddenButton?: boolean;
    sdeKey?: any;
    hidentoolbars?: boolean;
}

export interface IFuck_Xsde {
    execCommand(cmd: string): void,
    html(str?: string): string,
    addListener(e: string, cb: () => void): void
}