
import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 30,
        }}
        spin
    />
);
const Spinner = () => {
    return (
        <Layout className='h-screen flex-center'>
            <Spin indicator={antIcon} />
        </Layout>
    )
}

export default Spinner;