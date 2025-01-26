import React, { useState, useEffect } from 'react';
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
  Upload,
  Modal,
  Image,
  Pagination
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { CategoriesAPI } from '../api/methods';

function Categories() {

  const [categories, setCategories] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [imageFile, setImageFile] = useState(null);

  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory.name || '',
        description: selectedCategory.description || null
      });
    }
  }, [selectedCategory, form]);

  const fetchData = async (max_items = 5, page = 1) => {
    setLoading(true);
    const response = await CategoriesAPI.getRows(max_items, page);
    setCategories(response.data.data);
    setTotal(response.data.paginate.total);
    setCurrentPage(response.data.paginate.currentPage);
    setLoading(false);
  }

  const fetchPaginate = async (page) => {
    fetchData(5, page);
  }

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setDrawerVisible(true);
  };

  const editHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      if (imageFile){
        values = createMultipartFormData(values, imageFile);
      }

      handleDrawerClose();

      const response = await CategoriesAPI.modifyRow(selectedCategory.id, values);
      hideLoadingMessage();
      setCategories((prev) =>
        prev.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, ...response.data }
            : category
        )
      );
      form.resetFields();
      setImageFile(null);
      message.success('Category modified successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error(err);
      message.error('An error occurred while modifying the Category');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setImageFile(null);
  }

  function createMultipartFormData(jsonObject, file) {
    const formData = new FormData();
  
    // Append JSON data
    Object.keys(jsonObject).forEach((key) => {
      formData.append(key, jsonObject[key]);
    });

    formData.append("image", file, file.name);
  
    return formData;
  }


  const creationHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    console.log(values);
    try {
      if (imageFile){
        values = createMultipartFormData(values, imageFile);
      }

      handleModalClose();

      const response = await CategoriesAPI.createRow(values);
      hideLoadingMessage();
      setCategories((prev) => [...prev, response.data]);
      formAdd.resetFields();
      setImageFile(null);
      message.success('Category created successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error(err);
      message.error('An error occurred while creating the Category');
    }
  }

  const handleDelete = async (id) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      setPopoverVisible(false);
      const response = await CategoriesAPI.deleteRow(id);
      hideLoadingMessage();
      setCategories(categories.filter((category) => category.id !== id));
      message.success('Category deleted successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the Category.');
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedCategory(null);
    setImageFile(null);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setDrawerVisible(true);
  };


  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
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
              Categories Management
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
              Add Category
            </Button>
          </Space>
          <List
            dataSource={categories}
            loading={loading}
            header={
              <List.Item style={{ backgroundColor: "#ede7f6", borderRadius: "8px" }}>
                <List.Item.Meta
                  title={<strong style={{ color: "#673ab7", marginLeft: "10px" }}>Category Details</strong>}
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
                  avatar={
                    <Image
                      src={item.image_url}
                      fallback={item.image_path}
                      alt={item.name}
                      style={{
                        border: "2px solid #673ab7",
                        maxWidth: "64px",
                        maxHeight: "64px", // Ensures the image height is restricted
                        width: "64px",     // Explicitly set width
                        height: "64px",    // Explicitly set height
                        objectFit: "cover" // Ensures the image scales without distortion
                      }}
                    />
                  }
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

          {/* Drawer for Edit/Add Category Form */}
          <Drawer
            title={
              <Typography.Title level={4} style={{ margin: 0, color: "#673ab7" }}>
                {selectedCategory ? `Edit Category: ${selectedCategory.name}` : 'Add New Category'}
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
                label="Category Name"
                name="name"
                rules={[{ required: true, message: "Please enter a category name" }]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} placeholder="Enter category description" />
              </Form.Item>

              <Form.Item label="Upload Image">
                <>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith("image/");
                      if (!isImage) {
                        message.error("You can only upload image files!");
                        return Upload.LIST_IGNORE;
                      }
                      setImageFile(file);
                      return false; // Prevent default upload
                    }}
                  >
                    {imageFile ? (
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="avatar"
                        style={{
                          border: "2px solid #673ab7",
                          maxWidth: "64px",
                          maxHeight: "64px", // Ensures the image height is restricted
                          width: "64px",     // Explicitly set width
                          height: "64px",    // Explicitly set height
                          objectFit: "cover" // Ensures the image scales without distortion
                        }}
                      />
                    ) : (selectedCategory?.image_path || selectedCategory?.image_url) ? (
                      <Image
                        src={selectedCategory?.image_url}
                        fallback={selectedCategory?.image_path}
                        alt={selectedCategory?.name}
                        preview={false}
                        style={{
                          border: "2px solid #673ab7",
                          maxWidth: "64px",
                          maxHeight: "64px", // Ensures the image height is restricted
                          width: "64px",     // Explicitly set width
                          height: "64px",    // Explicitly set height
                          objectFit: "cover" // Ensures the image scales without distortion
                        }}
                      />
                    ) : (
                      <div style={{ color: "#673ab7" }}>
                        <UploadOutlined />
                        <div>Upload</div>
                      </div>
                    )}
                  </Upload>
                </>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ background: "#673ab7", borderColor: "#673ab7" }}>
                  {selectedCategory ? 'Save Changes' : 'Add Category'}
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
          <Modal
            title="Add Category"
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
          >
            <Form
              layout="vertical"
              onFinish={creationHandler}
              form={formAdd}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the Category name' }]}
              >
                <Input placeholder="Enter enter the Category name" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: false, message: 'Please enter the Category description' }]}
              >
                <Input placeholder="Enter enter the Category description" />
              </Form.Item>
              <Form.Item
                label="Upload Image"
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      message.error("You can only upload image files!");
                      return Upload.LIST_IGNORE;
                    }
                    setImageFile(file)
                    return false; // Prevent default upload
                  }}
                >
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="avatar"
                      style={{
                        border: "2px solid #673ab7",
                        maxWidth: "64px",
                        maxHeight: "64px", // Ensures the image height is restricted
                        width: "64px",     // Explicitly set width
                        height: "64px",    // Explicitly set height
                        objectFit: "cover" // Ensures the image scales without distortion
                      }}
                    />
                  ) : (
                    <div style={{ color: "#673ab7" }}>
                      <UploadOutlined />
                      <div>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Add Category
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={total}
            pageSize={5}
            onChange={fetchPaginate}
            showSizeChanger={false}
            style={{ textAlign: 'center', marginTop: '20px' }}
            showQuickJumper
          />
        </Card>
      </Col>
    </Row>
  );
}

export default Categories;
