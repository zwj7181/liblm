import { rt_ctx } from "@lm_fe/env";
import { MyBaseList } from "@lm_fe/pages";

const ctx = rt_ctx
const React = ctx.React


export default function RemindRecord(prop: {}) {

  return <MyBaseList
    table_preset={{
      title: `出生证预约办理-列表`,
      tableColumns: () => import('./form_config'),
      name: "/api/birth-certiticate-apply-infos",
      searchParams: {
      },

      searchConfig:
        [
          { label: '预约时间', name: 'appointmentDate', inputType: 'rangeDate' },
          { label: '姓名', name: 'name', inputType: 'Input' },
          { label: '母亲姓名', name: 'motherName', inputType: 'Input' },

        ],

      showAction: 0,
      beforeSubmit(new_data: any, old_data: any) {
        const neonates = new_data.neonates
        new_data.reserveState = new_data.reserveState || 0
        if (!ctx.utils.isArray(neonates) && ctx.utils.isObject(neonates[0])) {
          new_data.neonates = [neonates[0]]
        }

        return new_data
      },
      renderBtns: () => {

        return <>

          {
            ctx.ui.render_btn('导出当前', function () {
              ctx.request
                .get('/api/birth-certiticate-apply-infos/export', {
                  responseType: 'blob',
                  params: ctx.props.table_helper.getSearchParams(),
                })
                .then(function (response) {
                  return ctx.utils.downloadFile(response.data, '当前数据.xls', 'application/vnd.ms-excel');
                });
            })
          }
          {
            ctx.ui.render_btn('导出所有', function () {
              ctx.request
                .get('/api/birth-certiticate-apply-infos/export-all', {
                  responseType: 'blob',
                  params: ctx.props.table_helper.getSearchParams(),
                })
                .then(function (response) {
                  return ctx.utils.downloadFile(response.data, '所有数据.xls', 'application/vnd.ms-excel');
                });
            })
          }

        </>
      }
    }



    }
  />

}

