import { ICommonOption } from "@lm_fe/env"

export interface IMchc_HusbandBaseInfoOfOutpatient {
    "partnerName": null,
    "partnerTelephone": "13567545645",
    "partnerPatientNO": null,
    "partnerIdType": null,
    "partnerIdNO": null,
    "partnerDob": null,
    "partnerAge": null,
    "partnerNationality": null,
    "partnerNativeplace": null,
    "partnerEthnic": null,
    "partnerOccupation": null,
    smoke__: ICommonOption[]
    "smoke": number,
    "smokeNote": string,
    alcohol__: ICommonOption[]
    "alcohol": number,
    "alcoholNote": string,
    disease__: ICommonOption[]

    "disease": number,
    "diseaseNote": string,
    "partnerResidenceAddress": null,
    "partnerPermanentResidenceAddress": null

    "id": number
}


export interface IMchc_PregnancyBaseInfoOfOutpatient {
    "outpatientNO": string
    "name": string
    "telephone": string
    "workPhone": null,
    "idType": number
    "idNO": string
    "dob": string
    "age": number
    "nativeplace": string
    "ethnic": null,
    "nationality": string
    "occupation": null,
    "birthPermit": null,
    "maritalStatus": null,
    "maritalAge": null,
    "residenceAddress": null,
    "permanentResidenceAddress": null,
    "postpartumAddress": null,
    "payment": null,
    "paymentDate": null,
    "firstRecord": null,
    "checkIdNO": null,
    "birthInsurance": boolean
    "spinsterhoodName": null,
    "spinsterhoodTelephone": null,
    "spinsterhoodRelation": null,
    "education": string
    "gravidity": number
    "parity": number


    "id": number
    "validateDate": string
    "checkupNO": string
}

export interface IMchc_OutpatientDocumentStatus {
    "id": 2922,
    "recordstate": "1" | "0" | "6",
    "periodState": "1" | "2" | "3" | '4' | '5',
    "deliveryDate": null,
    "deliveryGestationalWeek": null,
    "deliveryMode": null,
    "closingDate": null,
    "closingGestationalWeek": null,
    "closingNote": null,
    "referralOutInfo": {
        "id": 212,
        "reason": "2222分QQ",
        "referralDate": "2023-12-04",
        "referralDirection": 1,
        "referralDept": "2234",
        "referralDoctor": "1w",
        "referralContactNumber": "13248904436",
        "recorder": string,
        "organizationId": 4,
        "organizationName": "广东省口腔医院"
    }
}
export interface IMchc_LabExamReport_Detail {
    id: number
    "examNo": null,
    "requestDoctor": null,
    "patientName": "8520",
    "patientGender": null,
    "patientAge": null,
    "samplePart": null,
    "reportDate": "2024-08-16T08:00:00+08:00",
    "requestDate": null,
    "firstReadDoctor": null,
    imgBase64: string[],
    examItems: {
        "itemNO": "436",
        "itemName": "尿妊娠试验",
        "result": "阴性(无反应性)",
        "unit": null,
        "limit": "阴性(-)",
        "state": "0" | "1" | "2",
        stateStr: "正常" | "异常" | "偏低" | "偏高";

    }[]
}