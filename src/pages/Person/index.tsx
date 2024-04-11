// import { PlusOutlined } from '@ant-design/icons';
// import { useModel } from '@umijs/max';
// import {
//   Button,
//   Checkbox,
//   Form,
//   Input,
//   Radio,
//   Upload
// } from 'antd';
// import React, { useState } from 'react';


// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// const FormDisabledDemo: React.FC = () => {
//   const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
//   const {initialState} = useModel("@@initialState");
//   console.log(initialState?.currentUser);
//   // const {id} = initialState?.currentUser;


  

//   return (
//     <>
//       <Checkbox
//         checked={componentDisabled}
//         onChange={(e) => setComponentDisabled(e.target.checked)}
//       >
//         禁用
//       </Checkbox>
//       <Form
//         labelCol={{ span: 4 }}
//         wrapperCol={{ span: 14 }}
//         layout="horizontal"
//         disabled={componentDisabled}
//         style={{ maxWidth: 600 }}
//       >
        
//         <Form.Item label="用户名">
//           <Input />
//         </Form.Item>
//         <Form.Item label="邮箱">
//           <Input.Password  />
//         </Form.Item>
//         <Form.Item label="电话">
//           <Input  />
//         </Form.Item>
//         <Form.Item label="性别">
//           <Radio.Group>
//             <Radio value="male" > 男 </Radio>
//             <Radio value="female"> 女 </Radio>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="头像" valuePropName="fileList" getValueFromEvent={normFile}>
//           <Upload action="/upload.do" listType="picture-card">
//             <button style={{ border: 0, background: 'none' }} type="button">
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </button>
//           </Upload>
//         </Form.Item>
//         <Form.Item label="提交">
//           <Button>修改</Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default () => <FormDisabledDemo />;