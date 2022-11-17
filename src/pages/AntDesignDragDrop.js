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
            filters: [
                {
                    text: 'Idle',
                    value: 'Idle',
                },
                {
                    text: 'Active',
                    value: 'Active',
                },
                {
                    text: 'Pending',
                    value: 'Pending',
                },
                {
                    text: 'Blocked',
                    value: 'Blocked',
                },
            ],
            onFilter: (value, record) => record.subscription?.status.includes(value),
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
            </Content>
        </Layout>
    )
}
