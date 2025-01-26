import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PaymentsAPI } from '../api/methods';

const PaymentsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Payment Intent',
      dataIndex: 'paymentIntent',
      key: 'paymentIntent',
    },
    {
      title: 'Total',
      dataIndex: 'amountTotal',
      key: 'amountTotal',
      render: (text, record) => `${(record.amountTotal / 100).toFixed(2)} ${record.currency}`,
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Order ID',
      dataIndex: 'id_order',
      key: 'id_order',
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        let color = status === 'paid' ? 'green' : status === 'failed' ? 'red' : 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async (max_items = 10, page = 1) => {
      setLoading(true);
      const response = await PaymentsAPI.getRows(max_items, page);
      setTotal(response.data.paginate.total);
      setCurrentPage(response.data.paginate.currentPage);
      setPayments(response.data.data);
      setLoading(false);
    }

    const fetchPaginate = async (page) => {
      fetchData(10, page);
    }

  const handleSearch = (value) => {
    setLoading(true);
    // TODO: Implement Search
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Historique de payements</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Order ID, Payment ID, or User ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() => handleSearch(searchText)}
          style={{ width: 400 }}
          disabled={loading}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={payments}
        rowKey="paymentIntent"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: total,
          onChange: fetchPaginate,
          showQuickJumper: true
        }}
      />
    </div>
  );
};

export default PaymentsPage;
