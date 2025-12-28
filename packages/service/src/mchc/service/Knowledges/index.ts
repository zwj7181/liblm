import { ICommonOption } from "@lm_fe/env"
import { ModelService } from "../../../ModelService"
import { cache_fetch, expect_array } from "@lm_fe/utils"
import { size } from "lodash"

export interface IMchc_Knowledges {
    "id": 54,
    "content": "<p></p>",
    "title": "胎心监护前的准备",
    "description": "课题五-远程监护预警管理平台",
    "type": 3,
    "thumbnail": null,
    "hits": 350,
    "favorite": 0,
    "collect": 0,
    "sticky": true,
    "releaseType": null,
    "release": true,
    "releaseTime": "2021-05-20",
    "createDate": "2021-05-20",
    "createUser": null,
    "releaseUser": null,
    "commonLabels": any[]
}



export const SMchc_Knowledges = new
    (class extends ModelService<IMchc_Knowledges> {

        async to_options() {
            const res = await cache_fetch('knowledges', () => this.page({ params: { size: 9999 }, ignore_usr: true }));


            return expect_array(res.data).map(q => ({ label: q.title, value: q.id }) as ICommonOption)
        }

    })
    ({
        n: '/knowledges',
    })
