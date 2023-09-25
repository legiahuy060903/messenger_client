
import { Layout } from 'antd';
const { Content } = Layout;
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sider';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



const MainLayout = () => {
    const navigate = useNavigate();
    const { account, isAuthenticated } = useSelector((state) => state.account);
    useEffect(() => {
        if (account === null || !isAuthenticated) {
            navigate('/login');
        }
    }, [account])

    return (
        <div className="layout_app bg-black">
            <Layout>
                <Sidebar />
                <Layout>
                    <Content className='content_area'>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>

        </div>
    )
}

export default MainLayout