import { ModelService } from '../ModelService';
import { Dayjs } from 'dayjs';

export interface IModel_FamilyPlaningSchedulingDetails {
  afternoonReservationNum: number;
  morningReservationNum: number;
  attendanceSet: number;
  cervicalSurgery: 1;
  cervicalSurgeryNum: 0;
  cervicalSurgeryReservationNum: 0;
  cervicalSurgeryResidueNum: 0;
  deleteFlag: 0;
  dilatationAndCurettage: 1;
  dilatationAndCurettageNum: 3;
  dilatationAndCurettageReservationNum: 0;
  dilatationAndCurettageResidueNum: 3;
  hysteroscopicSurgery: 1;
  hysteroscopicSurgeryNum: 0;
  hysteroscopicSurgeryReservationNum: 0;
  hysteroscopicSurgeryResidueNum: 0;
  id: 435;
  inducedAbortion: 1;
  inducedAbortionNum: 5;
  inducedAbortionReservationNum: 0;
  inducedAbortionResidueNum: 5;
  openReservation: 1;
  putInIntrauterineDevice: 1;
  putInIntrauterineDeviceNum: 30;
  putInIntrauterineDeviceReservationNum: 0;
  putInIntrauterineDeviceResidueNum: 30;
  schedulingDate: Dayjs;
  takeOutIntrauterineDevice: 0;
  takeOutIntrauterineDeviceNum: 0;
  takeOutIntrauterineDeviceReservationNum: 0;
  takeOutIntrauterineDeviceResidueNum: 0;
  totalNumOfDay: 40;
  totalReservationNumOfDay: 0;
  uterineFallopianTubeFluid: 1;
  uterineFallopianTubeFluidNum: 2;
  uterineFallopianTubeFluidReservationNum: 0;
  uterineFallopianTubeFluidResidueNum: 2;
  uterosalpingography: 1;
  uterosalpingographyNum: 0;
  uterosalpingographyReservationNum: 0;
  uterosalpingographyResidueNum: 0;
  vaginoscopy: 1;
  vaginoscopyNum: 0;
  vaginoscopyReservationNum: 0;
  vaginoscopyResidueNum: 0;
  vulvarCystStoma: 1;
  vulvarCystStomaNum: 0;
  vulvarCystStomaReservationNum: 0;
  vulvarCystStomaResidueNum: 0;
}
class MY_ModelService extends ModelService<IModel_FamilyPlaningSchedulingDetails> {
  getOpenSurgicalBySchedulingDate(schedulingDate?: Dayjs | null) {
    return this._request<string[]>({
      url: '/api/family/planning/getOpenSurgicalBySchedulingDate',
      method: 'GET',
      params: this.transferParams({
        schedulingDate,
      }),
    }).then((res) => res.data);
  }
  getBetweenList(start: Dayjs, end?: Dayjs) {
    end = end || start;
    return this.getList({
      params: {
        'schedulingDate.greaterOrEqualThan': start.format('YYYY-MM-DD'),
        'schedulingDate.lessOrEqualThan': end.format('YYYY-MM-DD'),
      },
    });
  }
}
export const SModel_FamilyPlaningSchedulingDetails = new MY_ModelService({
  n: 'SchedulingInformation',
  prePath: '/family/planning',
  addictionalParams: {
    deleteFlag: 0,
  }
});
SModel_FamilyPlaningSchedulingDetails.DateKeys.push('schedulingDate', 'schedulingDate');
SModel_FamilyPlaningSchedulingDetails.equalsKeys.push('schedulingDate', 'schedulingDate');
// getOpenSurgicalBySchedulingDate
