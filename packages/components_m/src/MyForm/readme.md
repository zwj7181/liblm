## 配置表单结构描述

​	一个表单实例中应存在一个formHandler实例

- 由`/form.js`生成，存储在`/index.tsx`中，并通过方法传递至父组件(一般来说是一个页面)进行表单的操作。
- 在`/form.js`中，会根据传入配置的`key`和`name`生成formHandler实例，对象下以name为键值生成相应的操作方法；这个地方后期可以优化，将所有的键值状态私有化，仅仅暴露出公共方法去处理。
- 在`/index.tsx`中存在一个方法`renderForm`去将JSON配置和生成的handler进行结合，渲染出输入器。
- 每一个输入器的值或状态，应该全部放置于`formItem`这一层(对应./formItem.tsx)；formItem层的更新不会触发上层(form层和page层)的更新；所以如果想获取表单值，必须通过formHandler中的方法去获取。



## MyForm组件入参

| name           | descriptions                       | format                 | ps                 |
| -------------- | ---------------------------------- | ---------------------- | ------------------ |
| config         | 表单配置JSON                       | Array<object>          |                    |
| value          | 表单值                             | Object                 |                    |
| getFormHandler | 获取form层抛出的实例               | (func: object) => void | 这个可以优化       |
| submitChange   | 表单下某项改变时是否进行提交的操作 | Boolean                | 用于custom组件同步 |



## Config的JSON属性对照

- FormConfig

| name         | descriptions                                  | format  | ps                                        |
| ------------ | --------------------------------------------- | ------- | ----------------------------------------- |
| name         | 标识名称，用于对表单下方字段的操作            | String  |                                           |
| key          | 用于提取数据项，使用`.`作为分隔符提取对象下值 | String  |                                           |
| input_type   | 输入器类型                                    | String  |                                           |
| label        | 输入器label                                   | String  |                                           |
| header_label | 是否将label至于输入器上方                     | boolean | 非custom组件和custom组件效果不相同        |
| unit         | 单位                                          | String  |                                           |
| span         | 输入器+label+unit 栅格占位                    | Number  | antd24栅格标准                            |
| offset       | 输入器前置空占位                              | Number  | antd24栅格标准                            |
| rules        | 校验规则                                      | String  | 见`/utils/valid.ts`文件                   |
| is_new_row   | 是否将此输入器新开一行                        | Boolean |                                           |
| just_header  | 仅做header渲染                                | Boolean |                                           |
| input_props  | 输入器属性                                    | Object  | 不相同的输入器配置不相同的ComponentOption |

## 各类输入器的ComponentOption对照（横线后为type,下方表格展示属性均为input_props)

- input - default/text 普通Input

  不填写input_props中type时默认使用的组件

- input - password  密码型

- input - textarea  textarea型

- input - number  数字型

  带有右侧的上下箭头按钮



- date - date 日期选择组件

| name   | descriptions             | format | ps                   |
| ------ | ------------------------ | ------ | -------------------- |
| format | DatePicker日期展示的形式 | String | 使用`dayjs()`日期格式 |

- date - time 日期选择组件

| name   | descriptions             | format | ps                   |
| ------ | ------------------------ | ------ | -------------------- |
| format | TimePicker时间展示的形式 | String | 使用`dayjs()`日期格式 |



- select - default  普通类型选择器

| name    | descriptions       | format        | ps                     |
| ------- | ------------------ | ------------- | ---------------------- |
| tags    | 是否支持自定义输入 | Boolean       | 与multiple属性共同作用 |
| radio   | 是否为单选选       | Boolean       | 与tags属性共同作用     |
| options | 渲染选项           | Array<Option> | -                      |

- select - multiple 混合型选择器

| name         | descriptions | format              | ps     |
| ------------ | ------------ | ------------------- | ------ |
| radios       | 是否为单选   | Boolean             |        |
| options      | 选项         | Array<Option>       |        |
| extraEditors | 额外的输入器 | Array<ExtraEditors> | 见附录 |



- checkbox - default 默认的checkbox

- checkbox - multiple 渲染一个对象下多个字段的checkbox

| name       | descriptions | format                            | ps   |
| ---------- | ------------ | --------------------------------- | ---- |
| radio      | 是否为单选选 | Boolean                           |      |
| renderData | 渲染的选项   | Array<MultipleCheckboxRenderData> |      |

> MultipleCheckboxRenderData

| name         | descriptions              | format              | ps   |
| ------------ | ------------------------- | ------------------- | ---- |
| key          | 对象下的键名              | String              |      |
| label        | 渲染出来的checkbox的label | string              |      |
| extraEditors | 额外的输入器              | Array<ExtraEditors> |      |

> 例子

```javascript
// select - multiple例子
// 数据
const data = {
    "pdAllegyHistory":{
        "drug": true, "drugNote": "xx药物过敏",
        "food": false, "foodNote": ""
    }
}
// 配置
const config = [
 { 
     name: "pdAllergyHistory", key: ".pdAllergyHistory", label: "过敏史",
     input_type: "checkbox",
     inpt_props: {
         type: "multiple",
         radio: false,
         renderData: [
              {
                  key: "drug",
                  label: "药物",
                  extraEditors: [
                    {
                      key: "drug",
                      editors: [
                        { name: "", key: "", input_type: "input" }
                      ]
                    }
                  ]
                },
                {
                  key: "food",
                  label: "食物",
                  extraEditors: [
                    {
                      key: "food",
                      editors: [
                        { name: "", key: "", input_type: "input" }
                      ]
                    }
                  ]
                }
         ]
     }
 }   
]

```



- checkbox - custom 针对单独字段的checkbox（select的类型）

| name       | descriptions | format                          | ps               |
| ---------- | ------------ | ------------------------------- | ---------------- |
| renderData | 渲染配置     | Array<CustomCheckboxRenderData> | 仅使用第一个元素 |

> CustomCheckboxRenderData

| name         | descriptions        | format              | ps     |
| ------------ | ------------------- | ------------------- | ------ |
| key          | 使用key提取对象下值 | String              |        |
| options      | checkbox渲染配置    | Array\<Option\>     |        |
| extraEditors | 额外渲染器          | Array<ExtraEditors> | 见附录 |

- checkbox - group

| name    | descriptions    | format        | ps                             |
| ------- | --------------- | ------------- | ------------------------------ |
| options | 纯checkboxGourp | Array<Option> | 与custom类相同，只是不需要note |



- table

| name            | descriptions          | format                                                       | ps   |
| --------------- | --------------------- | ------------------------------------------------------------ | ---- |
| tableColumns    | table列属性           | 见https://ant.design/components/table-cn/；如果需要表格内，请添加一个editor字段（format:FormConfig） |      |
| editable        | 是否可以编辑          | Boolean                                                      |      |
| isMerge         |                       | Boolen                                                       |      |
| ignoreKeys      |                       | Array<String>                                                |      |
| hiddenBtn       | 是否隐藏增加/删除按钮 | Boolean                                                      |      |
| hiddenSelection | 是否隐藏table的选中列 | Boolean                                                      |      |
| pagination      | 是否需要分页          | Boolean                                                      |      |
| scroll          | 是否滚动              | Boolean                                                      |      |



- cascader 多级选择器

| name       | descriptions | format  | ps   |
| ---------- | ------------ | ------- | ---- |
| pagination | 是否需要分页 | Boolean |      |



- treeselect 属性选择器

  支持自定义输入

| name  | descriptions | format  | ps   |
| ----- | ------------ | ------- | ---- |
| radio | 是否为单选   | Boolean |      |

- button 功能性按键 默认点击时进行dispatch

| name     | descriptions | format        | ps             |
| -------- | ------------ | ------------- | -------------- |
| btn_text | button文字   | Array<String> | 渲染多个button |



- custon 自定义子表单

| name   | descriptions   | format            | ps   |
| ------ | -------------- | ----------------- | ---- |
| config | 传入子表单配置 | Array<FormConfig> |      |

- array-custom / array-custom-tab

| name        | descriptions    | format            | ps   |
| ----------- | --------------- | ----------------- | ---- |
| config      | 传入子表单配置  | Array<FormConfig> |      |
| array_title | 渲染title的文字 | String            |      |



- template-textarea

| name          | descriptions  | format | ps   |
| ------------- | ------------- | ------ | ---- |
| template_url  | 获取模板的url | String |      |
| template_type | 模板的类型    | Any    |      |



## formHandler 对象描述

| name      | descriptions               | format                                                       | ps   |
| --------- | -------------------------- | ------------------------------------------------------------ | ---- |
| submit    | 提交方法                   | Promise\<{validate:boolean, data: any}\>                     |      |
| subscribe | 用于订阅事件               | function(fieldName: string, eventName: string, callback: function) |      |
| dispatch  | 提交事件                   | function(fieldName: string, eventName: string, args: any)    |      |
| `name`    | 这个name是指代配置下的name | itemHandler                                                  |      |

> itemHandler.action

| name        | descriptions           | format       | ps   |
| ----------- | ---------------------- | ------------ | ---- |
| getValue    | 获取当前字段的值       | () => any    |      |
| setValue    | 设置当前字段的值       | (value: any) |      |
| valid       | 触发验证               | () => string |      |
| reset       | 重置、清空当前值       | () => void   |      |
| getValidate | 获取当前字段的校验规则 | () => string |      |
| setValidate | 设置当前字段的校验规则 | (rules: any) |      |

## 附录

> Option

| name     | descriptions | format        | ps   |
| -------- | ------------ | ------------- | ---- |
| label    | 展示标题     | String        |      |
| value    | 选择值       | any           |      |
| children | 子级         | Array<Option> | 选填 |

>ExtraEditors

| name    | descriptions             | format            | ps                                |
| ------- | ------------------------ | ----------------- | --------------------------------- |
| key     | 对象下的键名，作对应关系 | String            |                                   |
| editors | 选择后出现的输入器       | Array<FormConfig> | 此处FormConfig的name和key可以为空 |