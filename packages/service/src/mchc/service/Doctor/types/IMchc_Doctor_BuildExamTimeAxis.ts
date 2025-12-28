

export interface IMchc_Doctor_BuildExamTimeAxis {
    gestationalWeekStart: string
    gestationalWeekEnd: string
    enumName: string
    arrived: boolean
    inCurrentGestationalWeek: boolean
    lackReports: string[]
    message: string
    groups: {
        groupDate: string
        reports: {
            itemInfosAbnormal: boolean
            reportTitle: string
            itemInfos: {
                abnormal: any
                description: string

                "code": string,
                "name": string,
                "value": string,
                "unit": null,
                "isNormal": "true" | "false" | null
            }[]
        }[]
    }[]

}