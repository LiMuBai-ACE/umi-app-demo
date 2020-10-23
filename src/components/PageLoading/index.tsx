import React, { useEffect } from 'react';
// import { ActivityIndicator } from 'antd-mobile';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false })

function PageLoading() {
    useEffect(() => {
        const progress = NProgress.start();
        return () => {
            progress.done();
        }
    }, [])
    return <></>
}

export default PageLoading
