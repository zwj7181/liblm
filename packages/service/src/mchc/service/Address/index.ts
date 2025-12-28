import { cache_fetch, expect_array, request, sleep } from "@lm_fe/utils"


export interface IMchc_AddressItemType {
    "fatherCode": 310000000000,
    "fatherName": "上海市",
    "code": 310000000000,
    "name": "上海市",
    "downFlag": number,
    "downAddress": null

    label: string
    value: string
    isLeaf: boolean
    loading: boolean
    children: IMchc_AddressItemType[]
}
// let firstAddrCache: IMchc_AddressItemType[]
// let firstAddrCachePromise: Promise<IMchc_AddressItemType[]>
// let firstPcdAddrCache: IMchc_AddressItemType[]
// let firstPcdAddrCachePromise: Promise<IMchc_AddressItemType[]>

export const SMchc_Address = {


    async getAddressList(item?: IMchc_AddressItemType) {
        const res = await request.get<IMchc_AddressItemType[]>('/api/address/getAddressByCode', { params: { code: item?.code, downFlag: item?.downFlag }, unboxing: true })
        return expect_array(res.data)
    },
    async getAddressByDetail(addressDetail?: string) {
        try {
            await sleep(1 * 1000)
            const res = await request.get<IMchc_AddressItemType[]>('/api/address/getAddressByDetail', { params: { addressDetail }, unboxing: true })
            return expect_array(res.data)
        } catch (error) {
            return []
        }
    },
    async _addr_front() {
        return request.get<IMchc_AddressItemType[]>(`/api/address/front/getAddress`, { params: {}, unboxing: true })
            .then(res => expect_array(res.data))
    },
    async getAddressBack(item?: IMchc_AddressItemType, addressDetail?: string) {
        return request.get<IMchc_AddressItemType[]>(`/api/address/back/getAddress`, { params: { code: item?.code, addressDetail }, unboxing: true })
            .then(res => expect_array(res.data))
    },
    async tc<T>(p: Promise<T[]>) {
        try {
            const res = await p
            return expect_array(res)
        } catch (error) {
            return []
        }
    },
    getAddressFirst() {
        return this.tc(cache_fetch(this._addr_front.name, this._addr_front, true))
        // try {
        //     const res = await cache_fetch('getAddressFirst', SMchc_Address.getAddressFront, true);
        //     return expect_array(res)
        // } catch (error) {
        //     return []
        // }
    },
    getAddressListFirst() {
        return this.tc(cache_fetch(this.getAddressList.name, this.getAddressList))
    }


}

