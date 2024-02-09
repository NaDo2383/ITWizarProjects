import React, { useContext, Suspense, useEffect, lazy } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

//internal import
import Main from '@/components/layout/Main';
import routes from '@/routes/index';
import Header from '@/components/layout/header/Header';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import ThemeSuspense from '@/components/ui/theme/ThemeSuspense';

const Page404 = lazy(() => import('@/features/404'));

function Layout() {
    const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);
    let location = useLocation();

    const isOnline = navigator.onLine;

    useEffect(() => {
        closeSidebar();
    }, [location]);

    return (
        <>
            {!isOnline && (
                <div className='flex justify-center bg-red-600 text-white'>
                    You are in offline mode!{' '}
                </div>
            )}
            <div
                className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
                    isSidebarOpen && 'overflow-hidden'
                }`}
            >
                {navBar && <Sidebar />}

                <div className='flex flex-col flex-1 w-full'>
                    <Header />
                    <Main>
                        <Suspense fallback={<ThemeSuspense />}>
                            <Switch>
                                {routes.map((route, i) => {
                                    return route.component ? (
                                        <Route
                                            key={i}
                                            exact={true}
                                            path={`${route.path}`}
                                            render={(props) => <route.component {...props} />}
                                        />
                                    ) : null;
                                })}
                                <Redirect exact from='/' to='/dashboard' />
                                <Route component={Page404} />
                            </Switch>
                        </Suspense>
                    </Main>
                </div>
            </div>
        </>
    );
}

export default Layout;
