import React, { useEffect, useState } from 'react';
import {
  List,
  Button,
  Drawer,
  Popover,
  Form,
  Input,
  Space,
  Typography,
  message,
  Modal
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { BrandsAPI } from '../api/methods';
import TextArea from 'antd/es/input/TextArea';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false); // Drawer for Editing
  const [popoverVisible, setPopoverVisible] = useState(null); // Popover for delete confirmation
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal for creating
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (selectedBrand) {
      form.setFieldsValue({
        name: selectedBrand.name || '',
        description: selectedBrand.description || null,
      });
    }
  }, [selectedBrand, form]);
  
  const fetchData = async () => {
    setLoading(true);
    const data = await BrandsAPI.getRows();
    setBrands(data.data.data);
    setLoading(false);
  }

  const handleEditDrawer = (brand) => {
    setSelectedBrand(brand);
    setDrawerVisible(true);
  };

  const editHandler = async (values: any) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      handleDrawerClose();
      const response = await BrandsAPI.modifyRow(selectedBrand.id, values);
      hideLoadingMessage();

      if (response.status) {
        // Update state if API confirms success
        setBrands((prev) =>
          prev.map((brand) =>
            brand.id === selectedBrand.id
              ? { ...brand, ...response.data }
              : brand
          )
        );
        message.success('Brand updated successfully!');
      } else {
        // Handle unsuccessful API response
        message.error(response.message || 'Failed to update brand');
      }
    } catch (error) {
      // Handle errors gracefully
      hideLoadingMessage();
      console.error('Update failed:', error);
      message.error('An error occurred while updating the brand.');
    }
  };

  const creationHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    setLoading(true);
    try {
      handleModalClose();
      const response = await BrandsAPI.createRow(values);
      hideLoadingMessage();
      setBrands((prev) => [...prev, response.data]);
      createForm.resetFields();
      message.success('Brand created successfully!');
    } catch (err) {
      hideLoadingMessage();
      message.error('An error occurred while creating the brand.');
    }
    setLoading(false);
  }

  const handleDelete = async (id) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      setPopoverVisible(null);
      const response = await BrandsAPI.deleteRow(id);
      hideLoadingMessage();

      if (response.status) {
        setBrands(brands.filter((brand) => brand.id !== id));
        message.success('Brand deleted successfully!');
      } else {
        message.error(response.message || 'Failed to delete brand');
      }

    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the brand.');
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedBrand(null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa, #e1bee7)',
        padding: '20px',
      }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card
          title={
            <Typography.Title
              level={3}
              style={{ margin: 0, textAlign: 'center', color: '#673ab7' }}
            >
              Brands Management
            </Typography.Title>
          }
          bordered={false}
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
          }}
        >
          <Space style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              loading={loading}
            >
              Add Brand
            </Button>
          </Space>
          <List
            dataSource={brands}
            loading={loading}
            header={
              <List.Item style={{ backgroundColor: '#ede7f6', borderRadius: '8px' }}>
                <List.Item.Meta
                  title={<strong style={{ color: '#673ab7', marginLeft: '10px' }}>Brand Details</strong>}
                />
                <div>
                  <strong style={{ color: '#673ab7', marginRight: '10px' }}>Actions</strong>
                </div>
              </List.Item>
            }
            renderItem={(item) => (
              <List.Item
                style={{
                  margin: '10px 0',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  background: '#fafafa',
                }}
                actions={[
                  <Button
                    type="text"
                    style={{ color: '#1e88e5' }}
                    onClick={() => handleEditDrawer(item)}
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
                    <Button type="text" style={{ color: '#e53935' }}>
                      Delete
                    </Button>
                  </Popover>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Typography.Text 
                      ellipsis={{ tooltip: item.name }} 
                      style={{ maxWidth: "300px", fontWeight: "bold" }}
                    >
                      {item.name}
                    </Typography.Text>
                  }
                  description={
                    <Typography.Text 
                      ellipsis={{ tooltip: item.description }} 
                      style={{ maxWidth: "300px" }}
                    >
                      {item.description}
                    </Typography.Text>
                  }
                />
              </List.Item>
            )}
          />

          {/* Drawer for Edit Form */}
          <Drawer
            title={
              <Typography.Title level={4} style={{ margin: 0, color: '#673ab7' }}>
                Edit Brand: {selectedBrand?.name || ''}
              </Typography.Title>
            }
            placement="right"
            onClose={handleDrawerClose}
            open={drawerVisible}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={editHandler}
            >
              <Form.Item
                label="Brand Name"
                name="name"
                rules={[{ required: true, message: 'Please enter a brand name' }]}
              >
                <Input placeholder="Enter brand name" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} placeholder="Enter brand description" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ background: '#673ab7', borderColor: '#673ab7' }}
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
          <Modal
            title="Create new Brand"
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
                      rules={[{ required: true, message: "Please enter a name for the brand" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name={["description"]}
                      rules={[{ required: false, message: "Please enter a description for the brand", max: 250 }]}
                    >
                      <TextArea />
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

export default Brands;
