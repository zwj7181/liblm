import { m } from './meta';
export default class GlobalModal<T extends { [x: string]: (...args: any) => any, }> {

    open!: <S extends keyof T>(n: S, data: Parameters<T[S]>[0]) => void;
    pop!: (status?: boolean) => void
    destroyAll!: () => void
}

export const stupidModal = new GlobalModal<typeof m>()

//@ts-ignore
window.stupidModal = stupidModal
