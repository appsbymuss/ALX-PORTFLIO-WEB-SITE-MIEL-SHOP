import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Select, Button, DatePicker, Space, Form, Modal, message, Popconfirm, InputNumber, Col, Drawer, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CouponAPI, ProductsAPI } from '../api/methods';
import dayjs from 'dayjs';


const { Option } = Select;

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectProductItems, setSelectProductItems]= useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [selectCouponType, setSelectedCouponType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  const columns = [
    {
      title: 'Coupon Code',
      dataIndex: 'couponCode',
      key: 'couponCode',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'order' ? 'blue' : 'green'}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Discount (%)',
      dataIndex: 'percentage',
      key: 'percentage',
    },
    {
      title: 'Start Date',
      dataIndex: 'date_start',
      key: 'date_start',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'date_end',
      key: 'date_end',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Product',
      dataIndex: 'id_product',
      key: 'id_product',
      render: (id_product) => (id_product ? selectProductItems.find((v) => v.id == id_product)?.name : 'N/A'),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <>
            <Button
                type="link"
                onClick={() => handleEditDrawer(record)}
            >
                Edit
            </Button>
            <Popconfirm
                title="Are you sure you want to delete this coupon?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
                >
                <Button type="link" danger>
                    Delete
                </Button>
            </Popconfirm>
          </>
        ),
      },
  ];


  useEffect(() => {
    fetchData();
    fetchProductItems();
  }, []);
  
  useEffect(() => {
      if (selectedCoupon) {
        form.setFieldsValue({
          couponCode: selectedCoupon.couponCode || '',
          type: selectedCoupon.type || '',
          percentage: selectedCoupon.percentage || 1,
          date_start: dayjs(selectedCoupon.date_start),
          date_end: dayjs(selectedCoupon.date_end),
          id_product: parseInt(selectedCoupon.id_product) || null
        });
        console.log(selectedCoupon)
      }
    }, [selectedCoupon, form]);
  

    const fetchData = async (max_items = 10, page = 1) => {
      setLoading(true);
      const response = await CouponAPI.getRows(max_items, page);
      setTotal(response.data.paginate.total);
      setCurrentPage(response.data.paginate.currentPage);
      setCoupons(response.data.data);
      setLoading(false);
    }
    
    
    const fetchPaginate = async (page) => {
      fetchData(10, page);
    }

    const fetchProductItems = async () => {
      const response = await ProductsAPI.getAllRowsUnpaginated();
      console.log("fetched");
      setSelectProductItems(response.data.data);
    }

  const handleProductSelect = async () => {
    setLoadingProducts(true);
    const response = await ProductsAPI.getAllRowsUnpaginated();
    console.log("fetched");
    setSelectProductItems(response.data.data);
    setLoadingProducts(false);
  }

  const handleEditDrawer = (coupon) => {
    setSelectedCoupon(coupon);
    setDrawerVisible(true);
  };

  const editHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    if (values.type === 'order')
      values.id_product = null;
    try {
      handleDrawerClose();
      const response = await CouponAPI.modifyRow(selectedCoupon.id, values);
      hideLoadingMessage();
  
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === response.data.id
          ? { ...coupon, ...response.data }
          : coupon
      )
    );
    
      message.success('Coupon updated successfully!');
    } catch (error) {
      // Handle errors gracefully
      hideLoadingMessage();
      console.error('Update failed:', error);
      message.error('An error occurred while updating the Coupon.');
    }
  }

  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
    setSelectedCoupon(null);
  }

  const creationHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    if (values.type === 'order')
      values.id_product = null;
    try {
      handleModalClose();
      const response = await CouponAPI.createRow(values);
      hideLoadingMessage();
      setCoupons((prev) => [...prev, response.data]);
      createForm.resetFields();
      message.success('Coupon created successfully!');
    } catch (err) {
      hideLoadingMessage();
      message.error('An error occurred while creating the Coupon');
    }
  };

  const handleDelete = async (id) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      const response = await CouponAPI.deleteRow(id);
      hideLoadingMessage();

      setCoupons(coupons.filter((coupon) => coupon.id !== id));
      message.success('Coupon deleted successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the Coupon.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Coupon Management</h1>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Coupon
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={coupons}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: total,
          onChange: fetchPaginate,
          showQuickJumper: true
        }}
      />
      {/* Drawer for Edit Form */}
      <Drawer
        title={
          <Typography.Title level={4} style={{ margin: 0, color: '#673ab7' }}>
            Edit Coupon: {selectedCoupon?.name || ''}
          </Typography.Title>
        }
        placement="right"
        onClose={handleDrawerClose}
        open={drawerVisible}
      >
        <Form
          layout="vertical"
          onFinish={editHandler}
          form={form}
        >
          <Form.Item
            label="Coupon Code"
            name="couponCode"
            rules={[{ required: true, message: 'Please enter the coupon code!' }]}
          >
            <Input placeholder="Enter Coupon Code" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the coupon type!' }]}
          >
            <Select
                placeholder="Select Type"
                onChange={(v) => setSelectedCoupon({...selectedCoupon, type: v})}
                style={{width: "100%"}}
            >
              <Option value="order">Order</Option>
              <Option value="product">Product</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Discount (%)"
            name="percentage"
            rules={[{ required: true, message: 'Please enter the discount percentage!' }]}
          >
            <InputNumber style={{minWidth: "100%"}} min={1} max={100} placeholder="Enter Discount Percentage" />
          </Form.Item>
          <Form.Item
            label="Applicable Product"
            name="id_product"
            dependencies={['type']}
            rules={[
              {
                required: selectCouponType === 'product',
                message: 'Please select the product for this coupon!',
              },
            ]}
            initialValue={null}
          >
            <Select
              placeholder="Select Product"
              disabled={(selectedCoupon && selectedCoupon?.type) != 'product'}
              loading={loadingProducts}
              onFocus={handleProductSelect}
            >
              <Option value={null}>Choisir...</Option>
              {selectProductItems.map((item) => (
                <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="date_start"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="date_end"
            rules={[{ required: true, message: 'Please select the end date!' },]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Edit Coupon
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title="Add Coupon"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={creationHandler}
          form={createForm}
        >
          <Form.Item
            label="Coupon Code"
            name="couponCode"
            rules={[{ required: true, message: 'Please enter the coupon code!' }]}
          >
            <Input placeholder="Enter Coupon Code" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the coupon type!' }]}
          >
            <Select
                placeholder="Select Type"
                onChange={(v) => setSelectedCouponType(v)}
                style={{width: "100%"}}
            >
              <Option value="order">Order</Option>
              <Option value="product">Product</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Discount (%)"
            name="percentage"
            rules={[{ required: true, message: 'Please enter the discount percentage!' }]}
          >
            <InputNumber style={{minWidth: "100%"}} min={1} max={100} placeholder="Enter Discount Percentage" />
          </Form.Item>
          <Form.Item
            label="Applicable Product"
            name="id_product"
            dependencies={['type']}
            rules={[{
                required: selectCouponType === 'product',
                message: 'Please select the product for this coupon!',
              }
            ]}
          >
            <Select
              placeholder="Select Product"
              disabled={selectCouponType != 'product'}
              onFocus={handleProductSelect}
            >
              {selectProductItems.map((item) => (
                <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="date_start"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="date_end"
            rules={[{ required: true, message: 'Please select the end date!' },]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Coupon
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponsPage;
