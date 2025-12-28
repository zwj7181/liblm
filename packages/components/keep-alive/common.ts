export enum LIFECYCLE { MOUNTED = 1, UPDATING = 2, UNMOUNTED = 3, }


export interface ICacheItem {
    children: React.ReactNode;
    keepAlive: boolean;
    lifecycle: LIFECYCLE;
    renderElement?: HTMLElement;
    activated?: boolean;
    ifStillActivate?: boolean;
    reactivate?: () => void;
}

export interface ICache {
    [key: string]: ICacheItem;
}



export interface IKeepAliveProviderImpl {
    storeElement: HTMLElement;
    cache: ICache;
    keys: string[];
    eventEmitter: any;
    existed: boolean;
    providerIdentification: string;
    setCache: (identification: string, value: ICacheItem) => void;
    removeCache: (name: string) => void;
    unactivate: (identification: string) => void;
    isExisted: () => boolean;
}

export interface IKeepAliveProviderProps {
    include?: string | string[] | RegExp;
    exclude?: string | string[] | RegExp;
    max?: number;
}

export interface IKeepAliveProps {
    _container?: any
    key?: string;
    name?: string;
    disabled?: boolean;
    extra?: any;
}
export interface IKeepAliveInnerProps extends IKeepAliveProps {
    _container: any;
}

export const keepAliveProviderTypeName = '$$KeepAliveProvider';
export const START_MOUNTING_DOM = 'startMountingDOM';
