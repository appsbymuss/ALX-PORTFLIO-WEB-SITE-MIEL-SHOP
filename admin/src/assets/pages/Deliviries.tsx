import React, { useState, useEffect } from 'react';
import { Layout, Input, Table, Collapse, Typography, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DeliveriesAPI } from '../api/methods';

const { Header, Content } = Layout;
const { Panel } = Collapse;
const { Text } = Typography;
// deliveries
// Recursive JSON rendering
const renderJson = (data) => {
  if (typeof data !== 'object' || data === null) {
    return <Text>{String(data)}</Text>;
  }
  return (
    <Collapse ghost>
      {Object.keys(data).map((key) => (
        <Panel header={key} key={key}>
          {renderJson(data[key])}
        </Panel>
      ))}
    </Collapse>
  );
};

const DeliveryHistory = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(
    (item) =>
      item.id.toString().includes(searchTerm) ||
      item.id_order.toString().includes(searchTerm) ||
      item.ExpeditionNum.toLowerCase().includes(searchTerm)
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Order ID',
      dataIndex: 'id_order',
      key: 'id_order',
    },
    {
      title: 'Expedition Number',
      dataIndex: 'ExpeditionNum',
      key: 'ExpeditionNum',
    },
    {
      title: 'Service Provider',
      dataIndex: 'serviceProvider',
      key: 'serviceProvider',
    },
    {
      title: 'Shipping Method',
      dataIndex: 'shippingMethod',
      key: 'shippingMethod',
    },
    // {
    //   title: 'Sender Details',
    //   dataIndex: 'senderDetails',
    //   key: 'senderDetails',
    //   render: (details) => renderJson(details),
    // },
    // {
    //   title: 'Recipient Details',
    //   dataIndex: 'recipientDetails',
    //   key: 'recipientDetails',
    //   render: (details) => renderJson(details),
    // },
    // {
    //   title: 'Additional Details',
    //   dataIndex: 'additionalDetails',
    //   key: 'additionalDetails',
    //   render: (details) => (details ? renderJson(details) : <Text>None</Text>),
    // },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async (max_items = 10, page = 1) => {
      setLoading(true);
      const response = await DeliveriesAPI.getRows(max_items, page);
      setTotal(response.data.paginate.total);
      setCurrentPage(response.data.paginate.currentPage);
      setData(response.data.data);
      setLoading(false);
  }

  const fetchPaginate = async (page) => {
    fetchData(10, page);
  }

  const handleSearch = (e) => {
    setLoading(true);
    setSearchTerm(e.target.value.toLowerCase());
    setLoading(false);
  };

  return (
    <>
    <h1>Historique des delevries</h1>
    <Layout
        style={{ padding: '20px' }}
    >
      <Header className="delivery-history-header">
        <Input
          placeholder="Search by ID, Order ID, or Expedition Number"
          prefix={<SearchOutlined />}
          className="search-bar"
          onChange={handleSearch}
        />
      </Header>
      <Content className="delivery-history-content">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: total,
            onChange: fetchPaginate,
            showQuickJumper: true
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <Text strong>Sender Details:</Text>
                {record.senderDetails ? renderJson(record.senderDetails) : <Text> None</Text>}
                <Text strong>Recipient Details:</Text>
                {record.recipientDetails ? renderJson(record.recipientDetails) : <Text> None</Text>}
                <Text strong>Additional Details:</Text>
                {record.additionalDetails ? renderJson(record.additionalDetails) : <Text> None</Text>}
              </div>
            ),
          }}
        />
      </Content>
    </Layout>
    </>
  );
};

export default DeliveryHistory;
