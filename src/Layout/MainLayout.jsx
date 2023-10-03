
import { Layout } from 'antd';
const { Content } = Layout;
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sider';




const MainLayout = () => {

    return (
        <div className="min-h-screen overflow-hidden bg-black">
            <Layout>
                <Sidebar />
                <Layout>
                    <Content className='overflow-hidden h-full'>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default MainLayout