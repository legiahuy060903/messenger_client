import React from 'react';
import { Button, Form, Input, Layout, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { callLogin } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/features/accountSlice';
import { useNavigate } from 'react-router-dom';
import { pic } from '../../utils/format';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch();
    const { t } = useTranslation("main");
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await callLogin(values);

        if (res.success) {
            localStorage.setItem("access_token", res['accessToken']);
            const { dark_mode, language, ...account } = res?.account;
            dispatch(doLoginAction({ dark_mode, language, account }));

            messageApi.open({
                type: 'success',
                content: '"Đăng nhập thành công',
            });
            navigate('/')
        } else {
            message.open({
                type: 'warning',
                content: res.message
            })
        }
    };
    return (
        <Layout>
            {contextHolder}
            <div className='h-screen flex-center flex-col gap-y-8 xs:w-3/4 sm:w-2/4 lg:w-1/4 m-auto'>
                <img src={pic} className='w-16' />
                <h1 className='text-mode font-medium text-2xl'>{t('login.cap')}</h1>
                <Form
                    className='w-full flex flex-col gap-y-2'
                    name="LOGIN"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: t('login.validate_email'),
                            }
                        ]}
                    >
                        <Input placeholder={t('login.placeholder_email')} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                min: 5,
                                message: t('login.validate_password'),
                            }
                        ]}
                    >
                        <Input.Password placeholder={t('login.placeholder_password')} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='w-full h-full p-2' >
                            {t("login.button")}
                        </Button>
                    </Form.Item>
                </Form>
                <div className='text-mode  hover:underline cursor-pointer'>{t("login.forgot_pass")}</div>
            </div>

        </Layout>

    )
}

export default Login