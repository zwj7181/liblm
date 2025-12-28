

export const address_options = {
    MAINLAND: () => import('./MAINLAND').then(r => r.default),
    HKMOTW: () => import('./HK-MO-TW').then(r => r.default),
    OVERSEA: () => import('./OVERSEA').then(r => r.default),
    STREETS: () => import('./STREETS').then(r => r.default),
}