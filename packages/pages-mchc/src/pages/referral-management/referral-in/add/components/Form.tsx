import { get, size, set } from 'lodash';
import { FormInstance, message } from 'antd';
import { getPregnancyByOutpatientNO } from '../methods';
import { request } from '@lm_fe/utils';
import { BaseEditPanelForm } from '@lm_fe/components_m';
import { SLocal_History } from '@lm_fe/service';

export default class AdmissionForm extends BaseEditPanelForm {
  pregnancy = {};

  handleItemChange = async (changedValues: any, allValues: any) => {
    if (get(changedValues, 'outpatientNO')) {
      const outpatientNO = get(changedValues, 'outpatientNO');
      const pregnancyData = await getPregnancyByOutpatientNO(outpatientNO);
      const dataSize = size(pregnancyData);
      const tempData = {};
      if (dataSize > 0) {
        this.pregnancy = get(pregnancyData, '0');
        set(tempData, 'name', get(this.pregnancy, 'name'));
        set(tempData, 'checkupNO', get(this.pregnancy, 'checkupNO'));
        set(tempData, 'telephone', get(this.pregnancy, 'telephone'));
        set(tempData, 'currentGestationalWeek', get(this.pregnancy, 'currentGestationalWeek'));
        set(tempData, 'age', get(this.pregnancy, 'age'));
        await this.form?.setFieldsValue(tempData);
      } else {
        this.pregnancy = {};
        set(tempData, 'name', '');
        set(tempData, 'checkupNO', '');
        set(tempData, 'telephone', '');
        set(tempData, 'currentGestationalWeek', '');
        set(tempData, 'age', '');
        await this.form?.setFieldsValue(tempData);
      }
    }

    if (get(changedValues, 'referralOrganization')) {
      const referralOrganization = get(changedValues, 'referralOrganization');
      const organization = (await request.get(`/api/referral-organizations?name.equals=${referralOrganization}`)).data;
      const currentOrganization = (await request.get(`/api/getCurrReferralOrganization`)).data;
      const organizationGrade = get(organization, '0.grade');
      const currentOrganizationGrade = get(currentOrganization, 'grade');
      const direction =
        currentOrganizationGrade === organizationGrade ? 1 : currentOrganizationGrade > organizationGrade ? 2 : 3;

      this.form?.setFieldsValue({
        referralDirection: direction,
        referralOrganization: get(organization, 0),
      });
    }
  };

  handleFinish = async () => {
    const form = (this.form as unknown) as FormInstance;
    const { onFinish, data } = this.props;
    form &&
      form
        .validateFields()
        .then(() => {
          const params = {
            ...form.getFieldsValue(),
            id: get(data, 'id'),
          };

          if (!get(data, 'id')) {
            if (get(this.pregnancy, 'id')) {
              set(params, 'pregnancy.id', get(this.pregnancy, 'id'));
              set(params, 'referralType', 2);
            } else {
              message.error('请输入正确的就诊卡号！');
              return;
            }
          }

          // if (!get(params, 'referralOrganization.id')) {
          //   message.error('转诊单位不存在，请重新选择！');
          //   return;
          // }

          onFinish && onFinish(params);
          setTimeout(function () {
            SLocal_History.safe_history_push('/referral-management/referral-in/list', this.props)
            //  deleteTab(activeKey);
            form.resetFields();
          }, 100);
        })
        .catch((error: any) => {
          message.error(get(error, 'errorFields.0.errors.0'));
          form.scrollToField(get(error, 'errorFields.0.name.0'));
        });
  };
}
