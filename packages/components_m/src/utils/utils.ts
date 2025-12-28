import { filter, get, isEmpty, set } from 'lodash';

import { SLocal_History } from '@lm_fe/service';
import { formatDate, fubaoRequest as request, transmit_happy_pre } from '@lm_fe/utils';
/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-28 21:43:23
 * @Description: 身份证校验规则
 */

// fixedSelects 固定选项，渲染表单项，在 adapter 中有使用，勿删
export const fixedSelects = {
    // 分娩方式
    deliverWays: ['vaginalDelivery', 'cesareanSection', 'forceps', 'vacuumAssisted', 'breechMidwifery'],
    // 流产方式
    abortionWays: ['naturalAbortion', 'medicalAbortion', 'surgicalAbortion', 'currettage'],
    // 不良生育史
    badPregnancies: ['inducedLabor', 'fetusdeath', 'ectopicPregnancy', 'hydatidMole', 'multiple'],
};











/**
 * 处理转诊数据
 */
export function filterReferrals(pregnancyData: any, formData: any, type = 2) {
    if (type === 1) return filterReferrals_Out(pregnancyData, formData)
    const referrals = get(pregnancyData, 'referrals');
    const referralOut = filter(referrals, (referral) => {
        return referral.referralType !== 2;
    });
    const referralIn = get(formData, 'referralIn');
    if (!!get(formData, 'referralInReferralDate')) {
        set(referralIn, 'referralType', 2);
        set(referralIn, 'reason', get(formData, 'referralInReason'));
        set(referralIn, 'referralDate', formatDate(get(formData, 'referralInReferralDate')));
        set(referralIn, 'referralOrganization', get(formData, 'referralInReferralOrganization'));
        set(referralIn, 'referralDept', get(formData, 'referralInReferralDept'));
        set(referralIn, 'referralDirection', get(formData, 'referralInReferralDirection'));
        set(referralIn, 'referralDoctor', get(formData, 'referralInReferralDoctor'));
        set(referralIn, 'referralContactNumber', get(formData, 'referralInReferralContactNumber'));
        set(referralIn, 'recorder', get(formData, 'referralInRecorder'));
        referralOut.push(referralIn);
    }
    return referralOut;
}
function filterReferrals_Out(pregnancyData: any, formData: any) {
    const referrals = get(pregnancyData, 'referrals');
    const referralIn = filter(referrals, (referral) => {
        return referral.referralType !== 1;
    });
    const referralOut = get(formData, 'referralOut');
    if (!!get(formData, 'referralOutReferralDate')) {
        set(referralOut, 'referralType', 1);
        set(referralOut, 'reason', get(formData, 'referralOutReason'));
        set(referralOut, 'organizationName', get(formData, 'referralOutReferralOrganization.name'));
        set(referralOut, 'organizationId', get(formData, 'referralOutReferralOrganization.id'));
        set(referralOut, 'referralDate', formatDate(get(formData, 'referralOutReferralDate')));
        // set(referralOut, 'referralOrganization', get(formData, 'referralOutReferralOrganization'));
        set(referralOut, 'referralDept', get(formData, 'referralOutReferralDept'));
        set(referralOut, 'referralDirection', get(formData, 'referralOutReferralDirection'));
        set(referralOut, 'referralDoctor', get(formData, 'referralOutReferralDoctor'));
        set(referralOut, 'referralContactNumber', get(formData, 'referralOutReferralContactNumber'));
        set(referralOut, 'recorder', get(formData, 'referralOutRecorder'));
        referralIn.push(referralOut);
    }

    return referralIn;
}
/**
 * 转换体征数据
 */
export function getPhysicalExamdata(measureData: any) {
    let physicalExamMeasure = get(measureData, '0.physicalExamMeasure') || measureData || {};
    if (isEmpty(physicalExamMeasure)) {
        return {};
    }
    physicalExamMeasure = {
        ...physicalExamMeasure,
        measureId: get(measureData, '0.id'),
        bloodPressure: {
            systolic: get(physicalExamMeasure, 'systolic'),
            diastolic: get(physicalExamMeasure, 'diastolic'),
        },
        bloodPressure2: {
            systolic: get(physicalExamMeasure, 'systolic2'),
            diastolic: get(physicalExamMeasure, 'diastolic2'),
        },
        bloodPressure3: {
            systolic: get(physicalExamMeasure, 'systolic3'),
            diastolic: get(physicalExamMeasure, 'diastolic3'),
        },
    };
    return physicalExamMeasure;
}




export const getTemplateById = async (id: any) => {
    return (await request.get(`/api/document-templates/${id}`)).data
};

export const createTemplate = async (data: any) => {
    return (await request.post('/api/document-templates', data)).data
};

export const updateTemplate = async (data: any) => {
    return (await request.put('/api/document-templates', data)).data
};
// export function getBMI(weight: number, height: number) {
//     if (!weight || !height) return '';
//     return ((weight / (height * height)) * 10000).toFixed(2);
// }

/**
 * 获取报告列表
 * type, 1 为产前检查, 2位产前诊断
 */
export const getLabExamGroup = async (id: number, type: number = 1) => {
    if (type === 1) {
        return (await request.get(`/api/getLabExamGroup?pregnancyId=${id}`)).data;
    } else if (type === 2) {
        return (await request.get(`/api/getLabExamGroupByPrenatal?prenatalPatientId=${id}`)).data
    }
    return [];
}

/** 标记报告已读 */
export const saveFirstReader = async (data: any) => (await request.post(`/api/saveFirstReader`, data)).data

/** 获取外院报告pdf */
export const getOutReportFileBase64 = async (path: string) => (await request.get(`/api/getOutReportFileBase64?path=${path}`)).data


export function fubaoHistoryPush(url: string, props?: { history?: History }) {
    // historyPush(resolveFubaoPath(url), props)
    SLocal_History.historyPush(resolveFubaoPath(url))
}
export function resolveFubaoPath(url: string,) {
    return transmit_happy_pre(url, '/fubao')
}














