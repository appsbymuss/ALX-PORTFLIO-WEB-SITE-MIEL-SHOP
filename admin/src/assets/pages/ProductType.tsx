import React, { useEffect, useState } from 'react';
import { List, Button, Drawer, Form, Input, message, InputNumber, Typography, Popover, Space, Modal } from 'antd';
import { Card, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Product_typesAPI } from '../api/methods';

function ProductType() {
  const [productTypes, setProductTypes] = useState([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal for creating
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [loading, setLoading] = useState(false);


  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  },[]);
  
  useEffect(() => {
      if (selectedProductType) {
        form.setFieldsValue({
          name: selectedProductType.name || '',
          tva_percentage: selectedProductType.tva_percentage || '',
        });
      }
    }, [selectedProductType, form]);
    
    const fetchData = async () => {
      setLoading(true);
      const data = await Product_typesAPI.getRows();
      setProductTypes(data.data);
      setLoading(false);
    }

  const handleEdit = (productType) => {
    setSelectedProductType(productType);
    setDrawerVisible(true);
  };

  const handleDelete = async (id) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      setPopoverVisible(null);
      const response = await Product_typesAPI.deleteRow(id);
      hideLoadingMessage();

      setProductTypes(productTypes.filter((productType) => productType.id !== id));
      message.success('Product Type deleted successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the Product Type.');
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedProductType(null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  const editHandler = async (values: any) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      handleDrawerClose();
      const response = await Product_typesAPI.modifyRow(selectedProductType.id, values);
      hideLoadingMessage();
  
      setProductTypes((prev) =>
        prev.map((productType) =>
          productType.id === response.data.id
            ? { ...productType, ...response.data }
            : productType
        )
      );

      message.success('Product Type updated successfully!');
    } catch (error) {
      // Handle errors gracefully
      hideLoadingMessage();
      console.error('Update failed:', error);
      message.error('An error occurred while updating the Product Type.');
    }
  };

  const creationHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      handleModalClose();
      const response = await Product_typesAPI.createRow(values);
      hideLoadingMessage();
      setProductTypes((prev) => [...prev, response.data]);
      createForm.resetFields();
      message.success('Product Type created successfully!');
    } catch (err) {
      hideLoadingMessage();
      message.error('An error occurred while creating the Product Type.');
    }
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #f3f4f7, #e1bee7)",
        padding: "20px",
      }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card
          title={
            <Typography.Title
              level={3}
              style={{ margin: 0, textAlign: "center", color: "#673ab7" }}
            >
              Product Types Management
            </Typography.Title>
          }
          bordered={false}
          style={{
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
          }}
        >
          <Space style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Add Product Type
            </Button>
          </Space>
          <List
            dataSource={productTypes}
            header={
              <List.Item style={{ backgroundColor: "#ede7f6", borderRadius: "8px" }}>
                <List.Item.Meta
                  title={<strong style={{ color: "#673ab7", marginLeft: "10px" }}>Product Type Details</strong>}
                />
                <div>
                  <strong style={{ color: "#673ab7", marginRight: "10px" }}>Actions</strong>
                </div>
              </List.Item>
            }
            renderItem={(item) => (
              <List.Item
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  background: "#fafafa",
                }}
                actions={[
                  <Button
                    type="text"
                    style={{ color: "#1e88e5" }}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>,
                  <Popover
                  content={
                    <Space>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(item.id)}
                      >
                        Confirm
                      </Button>
                      <Button onClick={() => setPopoverVisible(null)}>Cancel</Button>
                    </Space>
                  }
                  title="Are you sure?"
                  trigger="click"
                  open={popoverVisible === item.id}
                  onOpenChange={(visible) =>
                    setPopoverVisible(visible ? item.id : null)
                  }
                >
                  <Button type="text" style={{ color: "#e53935" }}>
                    Delete
                  </Button>
                </Popover>,
                ]}
              >
                <List.Item.Meta
                  title={<Typography.Text style={{ fontWeight: 'bold' }}>{item.name}</Typography.Text>}
                  description={`TVA Percentage: ${item.tva_percentage}%`}
                />
              </List.Item>
            )}
          />

          {/* Drawer for Edit Form */}
          <Drawer
            title={<Typography.Title level={4} style={{ margin: 0, color: "#673ab7" }}>Edit Product Type: {selectedProductType?.name || ""}</Typography.Title>}
            placement="right"
            onClose={handleDrawerClose}
            open={drawerVisible}
            width={400}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={editHandler}
            >
              <Form.Item label="Product Type Name" name="name" rules={[{ required: true, message: "Please enter a product type name" }]}>
                <Input placeholder="Enter product type name" />
              </Form.Item>
              <Form.Item label="TVA Percentage" name="tva_percentage" rules={[{ required: true, message: "Please enter TVA percentage" }]}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                  placeholder="Enter TVA percentage"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ background: "#673ab7", borderColor: "#673ab7" }}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
          <Modal
            title="Create new ProductType"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
              <Form
                onFinish={creationHandler}
                layout="vertical"
                form={createForm}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Name"
                      name={["name"]}
                      rules={[{ required: true, message: "Please enter a name for the product type" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Tva Percentage"
                      name={["tva_percentage"]}
                      rules={[{ required: true, message: "Please enter a tva_percentage for the product type" }]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        style={{ width: "100%" }}
                        placeholder="Enter TVA percentage"/>
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
          </Modal>
        </Card>
      </Col>
    </Row>
  );
}

export default ProductType;
