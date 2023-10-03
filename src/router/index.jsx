import { useNavigate, useRoutes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import NotFound from "../components/NotFound";
import HomeChat from "../pages/HomeChat";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount } from "../redux/action/user";
import Spinner from "../components/Loading";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function useRouteElements() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { language, account, isAuthenticated } = useSelector((state) => state.user);
    const { i18n } = useTranslation();
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language])

    useEffect(() => {
        if (window.location.pathname !== "/login") {
            dispatch(fetchAccount());
        }
    }, []);
    useEffect(() => {
        if (account == null || !isAuthenticated) {
            navigate('/login');
        }
    }, [account]);


    if (account && account.loading) {
        return <Spinner />;
    }

    const router = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <HomeChat /> },
                { path: '/chat/:id', element: <HomeChat /> }
            ],
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return router;
}