import React from 'react';
import { Result, Button } from 'antd';
import router from 'umi/router';

const Page403: React.FC = props => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="抱歉，你无权访问该页面。"
            extra={(
                <Button type="primary" onClick={() => router.push('/')}>
                    返回首页
                </Button>
            )}
        />
    );
};

export default Page403;
