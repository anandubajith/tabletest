import { SearchOutlined } from '@mui/icons-material';
import { Alert, Button, Input, Layout, Space, Spin, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const { Header, Content } = Layout;

const COLOR_MAP = {
    'Idle': 'blue',
    'Active': 'green',
    'Pending': 'yellow',
    'Blocked': 'volcano'
}
const type = 'DraggableBodyRow';
const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = useRef(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type,
        item: {
            index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{
                cursor: 'move',
                ...style,
            }}
            {...restProps}
        />
    );
};

export default function AntDesignDragDrop({ data, setData, loading, error }) {
    const searchInput = useRef(null);
    const [pageProps, setPageProps] = useState({})

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={confirm}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button type="primary" onClick={confirm} size="small" style={{ width: 90 }} >
                        Search
                    </Button>
                    <Button type="link" size="small" onClick={close} >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes((value).toLowerCase()),
        onFilterDropdownOpenChange: visible => { if (visible) { setTimeout(() => searchInput.current?.select(), 100); } },
    });


    const columns = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
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
            render: ({ status }) => {
                return (<Tag color={COLOR_MAP[status]}>{status}</Tag>)
            }
        },
        {
            title: 'City',
            dataIndex: 'address',
            render: address => address.city
        },
    ];
    const components = {
        body: {
            row: DraggableBodyRow,
        },
    };

    const moveRow = (dragIndexCurrent, hoverIndexCurrent) => {
        // need to offset these indexes by pageSize
        const currentPage = pageProps?.current ?? 0
        const offset = (currentPage > 0 ? currentPage - 1 : 0) * (pageProps?.pageSize ?? 10);
        const dragIndex = dragIndexCurrent + offset;
        const hoverIndex = hoverIndexCurrent + offset;
        // console.log(dragIndex, hoverIndex)
        // console.log(pageProps)
        const dragRow = data[dragIndex];
        const updatedData = [...data];
        updatedData.splice(dragIndex, 1);
        updatedData.splice(hoverIndex, 0, dragRow);
        setData(updatedData);
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo"> Supermind</div>
            </Header>
            <Content style={{ padding: '10px 50px', }} >
                {error && (
                    <Alert
                        message="Error"
                        description="Error when loading data, please try refreshing the page"
                        type="error"
                        showIcon
                        style={{ marginBottom: '10px' }}
                    />
                )}
                <Spin spinning={loading} size="large">
                    <DndProvider backend={HTML5Backend}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            components={components}
                            onChange={e => setPageProps(e)}
                            onRow={(_, index) => { const attr = { index, moveRow }; return attr; }}
                        />
                    </DndProvider>
                </Spin>
            </Content>
        </Layout>
    )
}
