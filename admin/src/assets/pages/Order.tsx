import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  message,
  Modal
} from "antd";

const { Option } = Select;

const OrderConfirmationPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user: { firstName: "John", lastName: "Doe", gender: "M", numberPhone: "1234567890" },
      address: {
        countryCode: "US",
        streetAddress: "123 Main St",
        streetAddress2: "",
        city: "New York",
        postalCode: "10001",
      },
      payment: { status: "paid" },
      appliedCoupon: "Product 123",
      status: "commande",
      items: [{ product_id: 1, stock_id: 10 }],
    },
    // Add more sample orders as needed
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const showEditModal = (record) => {
    setEditingOrder(record);
    setIsModalVisible(true);
  };

  const handleSaveChanges = (values) => {
    // Update frontend state with changes
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editingOrder.id ? { ...order, ...values } : order
      )
    );
    message.success("Changes saved successfully!");
    setIsModalVisible(false);
  };

  const handleInitiateExpedition = (orderId) => {
    message.success(`Order ${orderId} expedition initiated.`);
  };

  const handleCancelOrder = (orderId) => {
    message.error(`Order ${orderId} canceled.`);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <>
          {record.user.firstName} {record.user.lastName} ({record.user.gender})
        </>
      ),
    },
    {
      title: "Payment",
      key: "payment",
      render: (_, record) => (
        <Tag color={record.payment.status === "paid" ? "green" : "red"}>
          {record.payment.status || "None"}
        </Tag>
      ),
    },
    {
      title: "Coupon",
      key: "appliedCoupon",
      render: (_, record) => (
        <Tag color="blue">{record.appliedCoupon || "None"}</Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color="volcano">{record.status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleInitiateExpedition(record.id)}
          >
            Initiate Expedition
          </Button>
          <Button danger onClick={() => handleCancelOrder(record.id)}>
            Cancel Order
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Confirmation</h1>
      <Divider />
      <Table
        dataSource={orders}
        columns={columns}
        rowClassName={(record) =>
          record.status === "commande" ? "light-blue-row" : "gray-row"
        }
        style={{ marginBottom: "20px" }}
      />
      <Modal
        title="Edit Order Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editingOrder && (
          <Form
            // initialValues={editingOrder.recipient}
            onFinish={handleSaveChanges}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name={["firstName"]}
                  rules={[{ required: true, message: "Please enter first name" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name={["lastName"]}
                  rules={[{ required: true, message: "Please enter last name" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Gender"
                  name={["gender"]}
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Select>
                    <Option value="M">Male</Option>
                    <Option value="F">Female</Option>
                    <Option value="autre">Other</Option>
                    <Option value="nonSpecifie">Unspecified</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name={["numberPhone"]}
                  rules={[{ required: true, message: "Please enter phone number" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Street Address"
                  name={["address", "streetAddress"]}
                  rules={[{ required: true, message: "Please enter street address" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="City"
                  name={["address", "city"]}
                  rules={[{ required: true, message: "Please enter city" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Postal Code"
                  name={["address", "postalCode"]}
                  rules={[{ required: true, message: "Please enter postal code" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default OrderConfirmationPage;
