import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col } from 'antd';
import styles from './index.less';
export default function vaginaStrumentsRecordForm(props) {
  return (
    <div className={styles["vagina_struments_record_form"]}>
      <table border="1" className={styles["vagina_struments_record_form_table"]}>
        {/* 表头 */}
        <tr>
          <th className={styles["vagina_struments_record_form_table_label"]}>名称</th>
          <th>操作前</th>
          <th>操作后</th>
          <th className={styles["vagina_struments_record_form_table_label"]}>名称</th>
          <th>操作前</th>
          <th>操作后</th>
        </tr>
        {/* 第一行 */}
        <tr>
          <td>血管钳</td>
          <td>
            <Form.Item
              label="血管钳操作前"
              // name="vascularClampBefore"
              name={['transvaginalDeviceList', 'vascularClampBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="血管钳操作后"
              // name="vascularClampAfter"
              name={['transvaginalDeviceList', 'vascularClampAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>纱块</td>
          <td>
            <Form.Item
              label="纱块操作前"
              // name="yarnBlockBefore"
              name={['transvaginalDeviceList', 'yarnBlockBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="纱块操作后"
              // name="yarnBlockAfter"
              name={['transvaginalDeviceList', 'yarnBlockAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第二行 */}
        <tr>
          <td>持针钳</td>
          <td>
            <Form.Item
              label="持针钳操作前"
              // name="needleHolderBefore"
              name={['transvaginalDeviceList', 'needleHolderBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="持针钳操作后"
              // name="needleHolderAfter"
              name={['transvaginalDeviceList', 'needleHolderAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>有尾纱</td>
          <td>
            <Form.Item
              label="有尾纱操作前"
              // name="tailYarnBefore"
              name={['transvaginalDeviceList', 'tailYarnBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="有尾纱操作后"
              // name="tailYarnAfter"
              name={['transvaginalDeviceList', 'tailYarnAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第三行 */}
        <tr>
          <td>剪刀</td>
          <td>
            <Form.Item
              label="剪刀操作前"
              // name="scissorsBefore"
              name={['transvaginalDeviceList', 'scissorsBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="剪刀操作后"
              // name="scissorsAfter"
              name={['transvaginalDeviceList', 'scissorsAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>注射器</td>
          <td>
            <Form.Item
              label="注射器操作前"
              // name="syringeBefore"
              name={['transvaginalDeviceList', 'syringeBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="注射器操作后"
              // name="syringeAfter"
              name={['transvaginalDeviceList', 'syringeAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第四行 */}
        <tr>
          <td>镊子</td>
          <td>
            <Form.Item
              label="镊子操作前"
              // name="tweezersBefore"
              name={['transvaginalDeviceList', 'tweezersBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="镊子操作后"
              // name="tweezersAfter"
              name={['transvaginalDeviceList', 'tweezersAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>缝线</td>
          <td>
            <Form.Item
              label="缝线操作前"
              // name="stitchingBefore"
              name={['transvaginalDeviceList', 'stitchingBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="缝线操作后"
              // name="stitchingAfter"
              name={['transvaginalDeviceList', 'stitchingAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第五行 */}
        <tr>
          <td>巾钳</td>
          <td>
            <Form.Item
              label="巾钳操作前"
              // name="towelClampBefore"
              name={['transvaginalDeviceList', 'towelClampBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="巾钳操作后"
              // name="towelClampAfter"
              name={['transvaginalDeviceList', 'towelClampAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>封闭针</td>
          <td>
            <Form.Item
              label="封闭针操作前"
              // name="sealingNeedleBefore"
              name={['transvaginalDeviceList', 'sealingNeedleBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="封闭针操作后"
              // name="sealingNeedleAfter"
              name={['transvaginalDeviceList', 'sealingNeedleAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第六行 */}
        <tr>
          <td>小杯</td>
          <td>
            <Form.Item
              label="小杯操作前"
              // name="cannikinBefore"
              name={['transvaginalDeviceList', 'cannikinBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="小杯操作后"
              // name="cannikinAfter"
              name={['transvaginalDeviceList', 'cannikinAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>棉球</td>
          <td>
            <Form.Item
              label="棉球操作前"
              // name="spongeBefore"
              name={['transvaginalDeviceList', 'spongeBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="棉球操作后"
              // name="spongeAfter"
              name={['transvaginalDeviceList', 'spongeAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第七行 */}
        <tr>
          <td>阴道窥器</td>
          <td>
            <Form.Item
              label="阴道窥器操作前"
              // name="vaginalSpeculumBefore"
              name={['transvaginalDeviceList', 'vaginalSpeculumBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="阴道窥器操作后"
              // name="vaginalSpeculumAfter"
              name={['transvaginalDeviceList', 'vaginalSpeculumAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>圈钳</td>
          <td>
            <Form.Item
              label="圈钳操作前"
              // name="loopPliersBefore"
              name={['transvaginalDeviceList', 'loopPliersBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="圈钳操作后"
              // name="loopPliersAfter"
              name={['transvaginalDeviceList', 'loopPliersAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
        </tr>
        {/* 第八行 */}
        <tr>
          <td>宫颈钳</td>
          <td>
            <Form.Item
              label="宫颈钳操作前"
              // name="cervicalClampBefore"
              name={['transvaginalDeviceList', 'cervicalClampBefore']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td>
            <Form.Item
              label="宫颈钳操作后"
              // name="cervicalClampAfter"
              name={['transvaginalDeviceList', 'cervicalClampAfter']}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Input></Input>
            </Form.Item>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}
