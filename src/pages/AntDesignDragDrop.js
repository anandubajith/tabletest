// https://stackblitz.com/edit/react-s6hr8t?file=src%2FDraggableTable.css
import { Alert, Layout, Spin, Table, Tag } from 'antd';
import React from 'react';

const { Header, Content} = Layout;

const COLOR_MAP = {
    'Idle': 'blue',
    'Active': 'green',
    'Pending': 'yellow',
    'Blocked': 'volcano'
}

export default function AntDesignDragDrop({data, loading, error}) {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'first_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Subscription',
            dataIndex: 'subscription',
            render: ({status})=> {
                return (<Tag color={COLOR_MAP[status]}>{status}</Tag>)
            }
        },
        {
            title: 'City',
            dataIndex: 'address',
            render: address => address.city
        },
    ];


    return (
        <Layout className="layout">
            <Header>
                <div className="logo"> Supermind</div>
            </Header>
            <Content style={{ padding: '10px 50px', }} >
                <div className="site-layout-content">
        { error && (

            <Alert
            message="Error"
            description="Error when loading data, please try refreshing the page"
            type="error"
            showIcon
            style={{marginBottom: '10px'}}
            />
        )}
        <Spin spinning={loading} size="large">
        <Table columns={columns} dataSource={data} />
        </Spin>
                </div>
            </Content>
        </Layout>
    )
}
