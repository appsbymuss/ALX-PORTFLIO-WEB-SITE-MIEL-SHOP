import React, { useState, useEffect } from 'react';
import {
  List,
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Typography,
  message,
  InputNumber,
  Pagination,
  Upload,
  Popover,
  Image,
  Select,
  Modal
} from 'antd';
import { Card, Col, Row } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { BrandsAPI, CategoriesAPI, Product_typesAPI, ProductsAPI } from '../api/methods';

const { Option } = Select;

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product_types, setProduct_types] = useState([]);
  const [brands, setBrands] = useState([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(null);
  const [modalVisible, setIsModalVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [imageFile, setImageFile] = useState(null);

  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchProductTypes();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    const response = await CategoriesAPI.getAllRowsUnpaginated();
    setCategories(response.data.data);
  }

  const fetchProductTypes = async () => {
    const response = await Product_typesAPI.getAllRowsUnpaginated();
    setProduct_types(response.data);
  }

  const fetchBrands = async () => {
    const response = await BrandsAPI.getAllRowsUnpaginated();
    setBrands(response.data.data);
  }
  

  useEffect(() => {
      if (selectedProduct) {
        form.setFieldsValue({
          name: selectedProduct.name || '',
          description: selectedProduct.description || '',
          price: selectedProduct.price || 0,
          priceBarre: selectedProduct.priceBarre || 0,
          category_id: parseInt(selectedProduct.category_id),
          brand_id: parseInt(selectedProduct.brand_id),
          product_type_id: parseInt(selectedProduct.product_type_id),
          weight: selectedProduct.weight
        });
      }
    }, [selectedProduct, form]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDrawerVisible(true);
  };

  const editHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      if (imageFile){
        values = createMultipartFormData(values, imageFile);
      }

      handleDrawerClose();

      const response = await ProductsAPI.modifyRow(selectedProduct.id, values);
      hideLoadingMessage();
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...response.data }
            : product
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

  const handleDelete = async (id) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      setPopoverVisible(false);
      const response = await ProductsAPI.deleteRow(id);
      hideLoadingMessage();
      setProducts(products.filter((product) => product.id !== id));
      message.success('Product deleted successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the Product.');
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedProduct(null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  const fetchData = async (max_items = 5, page = 1) => {
    setLoading(true);
    const response = await ProductsAPI.getRows(max_items, page);
    setProducts(response.data.data);
    setTotal(response.data.paginate.total);
    setCurrentPage(response.data.paginate.currentPage);
    setLoading(false);
  }

  const fetchPaginate = async (page) => {
    fetchData(5, page);
  }

  const creationHandler = async (values) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    console.log(values);
    try {
      if (imageFile){
        values = createMultipartFormData(values, imageFile);
      }

      handleModalClose();

      const response = await ProductsAPI.createRow(values);
      hideLoadingMessage();
      setProducts((prev) => [...prev, response.data]);
      formAdd.resetFields();
      setImageFile(null);
      message.success('Product created successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error(err);
      message.error('An error occurred while creating the Product');
    }
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
              Products Management
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
              Add Product
            </Button>
          </Space>
          <List
            dataSource={products}
            loading={loading}
            header={
              <List.Item style={{ backgroundColor: "#ede7f6", borderRadius: "8px" }}>
                <List.Item.Meta
                  title={<strong style={{ color: "#673ab7", marginLeft: "10px" }}>Product Details</strong>}
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

          {/* Drawer for Edit Form */}
          <Drawer
            title={<Typography.Title level={4} style={{ margin: 0, color: "#673ab7" }}>Edit Product: {selectedProduct?.name || ""}</Typography.Title>}
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
              <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter a product name" }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} placeholder="Enter product description" />
              </Form.Item>
              <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter the price" }]}>
                <InputNumber style={{ width: "100%" }} placeholder="Enter price" />
              </Form.Item>
              <Form.Item label="Discounted Price" name="priceBarre">
                <InputNumber style={{ width: "100%" }} placeholder="Enter discounted price" />
              </Form.Item>
              <Form.Item label="Weight" name="weight">
                <InputNumber style={{ width: "100%" }} placeholder="Enter weight (in Grams)" />
              </Form.Item>
              <Form.Item required={true} label="Rating" name="rating">
                <InputNumber style={{ width: "100%" }} min={1} max={5} placeholder="Enter product Rating" />
              </Form.Item>
              <Form.Item label="Origin" name="origin">
                <Input placeholder="Enter product origin (country)" />
              </Form.Item>
              <Form.Item label="Texture" name="texture">
                <Input placeholder="Enter product texture" />
              </Form.Item>
              <Form.Item label="Flavor" name="flavor">
                <Input placeholder="Enter product flavor" />
              </Form.Item>
              <Form.Item label="Benefits" name="benefits">
                <Input placeholder="Enter product benefits" />
              </Form.Item>
              <Form.Item label="Usage" name="usage">
                <Input placeholder="Enter product usage" />
              </Form.Item>
              <Form.Item label="Label" name="special_label">
                <Select
                  placeholder="Select Label"
                >
                  <Option value={null}>Choisir...</Option>
                  <Option value={"most_sold"}>Top sold !</Option>
                  <Option value={"new"}>Nouveau !</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category_id">
                <Select
                  placeholder="Select Category"
                >
                  <Option value={null}>Choisir...</Option>
                  {categories.map((item) => (
                    <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Product Type" name="product_type_id">
                <Select
                  placeholder="Select Product Type"
                >
                  <Option value={null}>Choisir...</Option>
                  {product_types.map((item) => (
                    <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Brand" name="brand_id">
                <Select
                  placeholder="Select Brand"
                >
                  <Option value={null}>Choisir...</Option>
                  {brands.map((item) => (
                    <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
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
                          width: "100%",
                          borderRadius: "8px",
                          border: "2px dashed #673ab7",
                        }}
                      />
                    ) : (selectedProduct?.image_path || selectedProduct?.image_url) ? (
                      <Image
                        src={selectedProduct?.image_url}
                        fallback={selectedProduct?.image_path}
                        alt={selectedProduct?.name}
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
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Drawer>

          <Modal
            title="Add Category"
            open={modalVisible}
            onCancel={handleModalClose}
            footer={null}
          >
            <Form
              layout="vertical"
              onFinish={creationHandler}
              form={formAdd}
            >
              <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter a product name" }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} placeholder="Enter product description" />
              </Form.Item>
              <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter the price" }]}>
                <InputNumber style={{ width: "100%" }} placeholder="Enter price" />
              </Form.Item>
              <Form.Item label="Discounted Price" name="priceBarre">
                <InputNumber style={{ width: "100%" }} placeholder="Enter discounted price" />
              </Form.Item>
              <Form.Item label="Weight" name="weight">
                <InputNumber style={{ width: "100%" }} placeholder="Enter weight (in Grams)" />
              </Form.Item>
              <Form.Item required={true} label="Rating" name="rating">
                <InputNumber style={{ width: "100%" }} min={1} max={5} placeholder="Enter product Rating" />
              </Form.Item>
              <Form.Item label="Origin" name="origin">
                <Input placeholder="Enter product origin (country)" />
              </Form.Item>
              <Form.Item label="Texture" name="texture">
                <Input placeholder="Enter product texture" />
              </Form.Item>
              <Form.Item label="Flavor" name="flavor">
                <Input placeholder="Enter product flavor" />
              </Form.Item>
              <Form.Item label="Benefits" name="benefits">
                <Input placeholder="Enter product benefits" />
              </Form.Item>
              <Form.Item label="Usage" name="usage">
                <Input placeholder="Enter product usage" />
              </Form.Item>
              <Form.Item label="Label" name="special_label">
                <Select
                  placeholder="Select Label"
                >
                  <Option value={null}>Choisir...</Option>
                  <Option value={"most_sold"}>Top sold !</Option>
                  <Option value={"new"}>Nouveau !</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category_id">
                <Select
                  placeholder="Select Category"
                >
                  <Option value={null}>Choisir...</Option>
                  {categories.map((item) => (
                    <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Product Type" name="product_type_id">
                <Select
                  placeholder="Select Product Type"
                >
                  <Option value={null}>Choisir...</Option>
                  {product_types.map((item) => (
                    <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Brand" name="brand_id">
                <Select
                  placeholder="Select Brand"
                >
                  <Option value={null}>Choisir...</Option>
                  {brands.map((item) => (
                    <Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
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
                  Save Changes
                </Button>
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

export default Products;
