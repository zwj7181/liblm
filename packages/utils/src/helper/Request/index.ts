
import { Request, createInstance, request } from '@noah-libjs/request';
export * from '@noah-libjs/request';





export const rawRequest = createInstance({})

export const asRequest = new Request({ config: { baseURL: '/as' } })
// export const fubaoRequest = new Request({ config: { baseURL: '/' } })
export const fubaoRequest = request



