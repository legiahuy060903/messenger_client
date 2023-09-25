import { useRoutes } from "react-router-dom";
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

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const { i18n } = useTranslation()
    useEffect(() => {
        i18n.changeLanguage(account.language);
    }, [account.language])

    useEffect(() => {
        if (window.location.pathname !== "/login") {
            dispatch(fetchAccount());
        }
    }, [dispatch]);

    if (account && account.loading) {
        return <Spinner />;
    }

    const router = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <HomeChat /> }
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