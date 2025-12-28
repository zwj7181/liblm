import { AnyObject, getHappyConfig } from "@lm_fe/utils"
import { keys } from "lodash"



type TData = AnyObject



class MchcRouterContainer {

    init(base: TData, ...addon: TData[]) {
        this.mix(base, addon)
    }
    base: TData = {}
    addon: TData = {}
    routesData: TData = {}

    mix(base: TData, addon: TData[]) {
        this.base = base

        const mixinRoutes = addon.reduce((sum, a) => Object.assign({}, sum, a), {})

        this.addon = mixinRoutes

        const oldKeys = keys(base)
        const mixinKeys = keys(mixinRoutes)
        const sameKeys = oldKeys.filter(_ => mixinKeys.includes(_))

        sameKeys.forEach(_ => {
            mixinRoutes[`${_}_old`] = base[_]
        })



        this.routesData = { ...base, ...mixinRoutes }

    }
    get_real_path(pathname: string) {
        const _url = new URL(pathname, new URL(location.href))
        const _pathname = _url.pathname
        const happyPath = getHappyConfig(_pathname)



        return happyPath?.path ?? pathname
    }
    getTargetComponent(pathname: string) {
        const _url = new URL(pathname, new URL(location.href))
        const _pathname = _url.pathname
        const happyPath = getHappyConfig(_pathname)
        if (happyPath) {
            const C = this.routesData[happyPath.path]
            return C

        }
        const C = this.routesData[_pathname]

        return C
    }
    get_addon_component(pathname: string) {
        const _url = new URL(pathname, new URL(location.href))
        const _pathname = _url.pathname
        const happyPath = getHappyConfig(_pathname)
        if (happyPath) {
            const C = this.addon[happyPath.path]
            return C

        }
        const C = this.addon[_pathname]

        return C
    }
}




export const mchcRouterContainer__ = new MchcRouterContainer()


export { MchcRouterContainer }
