import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";

export const form_config: IMchc_FormDescriptions_Field_Nullable[] = [{
    "id": 742,
    "moduleName": "family-planning-detail-tumor",
    "name": "病史情况",
    "flag": "专科病例-妇科肿瘤-病史情况",
    "sort": 0,
   
   
    
    "fields": [{
        "id": 19470,
        "key": "earlyPregnancyCheckMedicalHistory.familyHistory",
        "label": "家族史",
       
        "inputType": "checkbox_with_single_input",
        
        "rules": [{'required':false,'message':'家族史是必填项'}],
        "specialConfig": {'type':'single','options':[{'value':1,'label':'否','span':6,'withInput':false},{'value':2,'label':'是','withInput':true,'isIssue':true,'span':6,'inputSpan':12}]},
       
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19471,
        "key": "earlyPregnancyCheckMedicalHistory.chiefComplaint",
        "label": "主诉",
       
        "inputType": "gynaecology_template_textarea",
        
        "rules": [{'required':false,'message':'主诉是必填项'}],
       
       
        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':4},'wrapperCol':{'span':20}},
        
      
       
       
        
    }, {
        "id": 19472,
        "key": "earlyPregnancyCheckMedicalHistory.medicalHistoryNow",
        "label": "现病史",
       
        "inputType": "checkbox_with_single_input",
        
        "rules": [{'required':false,'message':'现病史是必填项'}],
        "specialConfig": {'type':'single','options':[{'value':1,'label':'否','span':6,'withInput':false},{'value':2,'label':'是','withInput':true,'isIssue':true,'span':6,'inputSpan':12}]},
       
        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19473,
        "key": "earlyPregnancyCheckMedicalHistory.personalHistory",
        "label": "个人史",
       
        "inputType": "checkbox_with_single_input",
        
        "rules": [{'required':false,'message':'个人史是必填项'}],
        "specialConfig": {'type':'single','options':[{'value':1,'label':'否','span':6,'withInput':false},{'value':2,'label':'是','withInput':true,'isIssue':true,'span':6,'inputSpan':12}]},
       
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }]
}, {
    "id": 743,
    "moduleName": "family-planning-detail-tumor",
    "name": "体格情况",
    "flag": "专科病例-妇科肿瘤-体格情况",
    "sort": 0,
   
   
    
    "fields": [{
        "id": 19474,
        "key": "womenHealthcarePhysicalExamination.weight",
        "label": "体重(kg)",
       
        "inputType": "input_number",
        
        "rules": [{'required':true,'message':'体重(kg)是必填项'}],
       
        "inputProps": {'placeholder': '请输入体重','style':{'width':156}},
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19475,
        "key": "womenHealthcarePhysicalExamination.systolic",
        "label": "血压(mmHg)",
       
        "inputType": "pressure",
        
        "rules": [{'required':true,'message':'血压(mmHg)是必填项'}],
       
        "inputProps": {'style':{'width':156}},
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19476,
        "key": "womenHealthcarePhysicalExamination.bodyTemperature",
        "label": "体温(°C)",
       
        "inputType": "input_number",
        
        "rules": [{'required':true,'message':'体温(°C)是必填项'}],
       
        "inputProps": {'placeholder': '请输入体温','style':{'width':156}},
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }]
}, {
    "id": 744,
    "moduleName": "family-planning-detail-tumor",
    "name": "检验检查",
    "flag": "专科病例-妇科肿瘤-检验检查",
    "sort": 0,
   
   
    
    "fields": [{
        "id": 19477,
        "key": "earlyPregnancyCheckInspection.ultrasoundDate",
        "label": "B超日期",
       
        "inputType": "DatePicker",
        
        "rules": [{'required':false,'message':'B超日期是必填项'}],
       
       
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19478,
        "key": "earlyPregnancyCheckInspection.ultrasoundDiagnosis",
        "label": "B超诊断",
       
        "inputType": "text_area",
        
        "rules": [{'required':false,'message':'B超诊断是必填项'}],
       
       
        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':4},'wrapperCol':{'span':20}},
        
      
       
       
        
    }]
}, {
    "id": 745,
    "moduleName": "family-planning-detail-tumor",
    "name": "电子画板",
    "flag": "专科病例-妇科肿瘤-电子画板",
    "sort": 0,
   
   
    
    "fields": [{
        "id": 19479,
        "key": "drawingBoard",
        "label": "",
       
        "inputType": "gynaecology_image_editor",
        
        "rules": [{'required':false,'message':'null是必填项'}],
       
       
        "span": 24,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':0},'wrapperCol':{'span':24}},
        
      
       
       
        
    }]
}, {
    "id": 746,
    "moduleName": "family-planning-detail-tumor",
    "name": "诊断及处理",
    "flag": "专科病例-妇科肿瘤-诊断及处理",
    "sort": 0,
   
   
    
    "fields": [{
        "id": 19480,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations",
        "label": "诊断",
       
        "inputType": "diagnosis_list_v2",
        
        "rules": [{'required':false,'message':'诊断是必填项'}],
        "specialConfig": {'isShow':true},
       
        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':4},'wrapperCol':{'span':20}},
        
      
       
       
        
    }, {
        "id": 19481,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.treatmentMeasures",
        "label": "处理措施",
       
        "inputType": "gynaecology_template_textarea",
        
        "rules": [{'required':false,'message':'处理措施是必填项'}],
       
        "inputProps": {'autoSize':{'minRows':7,'maxRows':7},'placeholder':'请输入处理措施.'},
        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':4},'wrapperCol':{'span':20}},
        
      
       
       
        
    }, {
        "id": 19482,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentWeeksLater",
        "label": "预约复诊",
       
        "inputType": "select_with_options",
        
        "rules": [{'required':false,'message':'预约复诊是必填项'}],
        "specialConfig": {'type':'array','mode':'single','options':[{'value':1,'label':'1周后'},{'value':2,'label':'2周后'},{'value':3,'label':'3周后'}]},
        "inputProps": {'placeholder':'请选择'},
        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19483,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentSpecificDate",
        "label": "",
       
        "inputType": "DatePicker",
        
        "rules": [{'required':false,'message':'null是必填项'}],
       
        "inputProps": {'placeholder':'请选择'},
        "span": 4,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':0},'wrapperCol':{'span':24}},
        
      
       
       
        
    }, {
        "id": 19484,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentMorningOrAfternoon",
        "label": "",
       
        "inputType": "select_with_options",
        
        "rules": [{'required':false,'message':'null是必填项'}],
        "specialConfig": {'type':'array','mode':'single','options':[{'value':'上午','label':'上午'},{'value':'下午','label':'下午'}]},
        "inputProps": {'placeholder':'请选择'},
        "span": 4,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':0},'wrapperCol':{'span':24}},
        
      
       
       
        
    }, {
        "id": 19485,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.registrationDate",
        "label": "登记日期",
       
        "inputType": "DatePicker",
        
        "rules": [{'required':false,'message':'登记日期是必填项'}],
       
       
        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }, {
        "id": 19486,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor",
        "label": "接诊医生",
       
        "inputType": "input",
        
        "rules": [{'required':false,'message':'接诊医生是必填项'}],
       
       
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": {'labelCol':{'span':8},'wrapperCol':{'span':16}},
        
      
       
       
        
    }]
}]