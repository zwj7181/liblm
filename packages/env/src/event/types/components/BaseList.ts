import { IBaseType } from "../common"


interface I_Search extends IBaseType<'search'> {
    name?: string,
    data: any[]
}




export type IBaseList_Event = [I_Search]