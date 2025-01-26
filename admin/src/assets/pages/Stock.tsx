import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Form, Table, Space, Select, InputNumber, Drawer, message, Typography, Popconfirm } from 'antd';
import { ProductsAPI, StockAPI, StockProductsAPI } from '../api/methods';

const { Option } = Select;

const StockPage = () => {
  const [stocks, setStocks] = useState([]); // Stores all stock locations
  const [selectedStock, setSelectedStock] = useState(null); // For selected stock
  const [stockName, setStockName] = useState(''); // For adding stock name
  const [stockItems, setStockItems] = useState([]); // Items of the selected stock
  const [selectedStockProduct, setSelectedStockProduct] = useState(null);
  const [productId, setProductId] = useState(''); // Product ID for adding stock item
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0); // Quantity for stock item
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerStockProductVisible, setDrawerStockProductVisible] = useState(false);
  const [form] = Form.useForm();
  const [formStockProduct] = Form.useForm();

  // Add Stock Handler
  useEffect(() => {
    if (selectedStock) {
      form.setFieldsValue({
        name: selectedStock.name || '',
      });
    }
  }, [selectedStock, form]);
  
  useEffect(() => {
    if (selectedStockProduct) {
      formStockProduct.setFieldsValue({
        quantity: selectedStockProduct.quantity || ''
      });
    }
  }, [selectedStockProduct, formStockProduct]);

    useEffect(() => {
      fetchData();
      fetchProductItems();
    }, []);

    const fetchData = async () => {
      setLoading(true);
      const response = await StockAPI.getRows();
      setStocks(response.data);
      setLoading(false);
    }

    const fetchStockItems = async (stock) => {
      setLoading(true);
      setSelectedStock(stock);
      const response = await StockProductsAPI.getRowsByStockID(stock.id);
      setStockItems(response.data);
      setLoading(false);
    }

  const handleAddStock = async () => {
    if (stockName) {
      const hideLoadingMessage = message.loading("Loading...", 0);
      try {
        const response = await StockAPI.createRow({name: stockName});
        setStocks([...stocks, response.data]);
        handleSelectStock(response.data)
        hideLoadingMessage();
        message.success('Stock (Place) created successfully!');
      } catch (err) {
        hideLoadingMessage();
        message.error('An error occurred while creating the Stock (Place)');
      }
      setStockName('');
    }
  };

  const fetchProductItems = async () => {
    const response = await ProductsAPI.getAllRowsUnpaginated();
    console.log("fetched");
    setProducts(response.data.data);
  }

  // Select Stock Handler
  const handleSelectStock = (stock) => {
    fetchStockItems(stock)
  };

  const handleProductSelect = (value) => {
    setProductId(value);
  };  

  // Add Stock Item Handler
  const handleAddStockItem = async () => {
    if (!productId || quantity == 0) return;

    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      const response = await StockProductsAPI.createRow({stock_id: selectedStock.id, product_id: productId, quantity: quantity});
      hideLoadingMessage();
      console.log(response);
      setStockItems((prev) => [...prev, response.data]);
      message.success('Stock Product added successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Stock Product failed:', err);
      message.error('An error occurred while adding Stock Product.');
    }

    setProductId('');
    setQuantity(0);
  };

  // Delete Stock Handler
  const handleDeleteStock = async (stockId) => {
    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      const response = await StockAPI.deleteRow(stockId);
      hideLoadingMessage();
    
      setStocks(stocks.filter((stock) => stock.id !== stockId));
      if (selectedStock && selectedStock.id === stockId) {
        setSelectedStock(null);
        setStockItems([]);
      }
      message.success('Stock (Place) deleted successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the Stock (Place).');
    }
  };

  // Delete Stock Item Handler
  const handleDeleteStockItem = async (itemId) => {

    const hideLoadingMessage = message.loading("Loading...", 0);
    try {
      const response = await StockProductsAPI.deleteRow(itemId);
      hideLoadingMessage();
    
      setStockItems(stockItems.filter((stockItem) => stockItem.id != itemId));
      message.success('Stock Product deleted successfully!');
    } catch (err) {
      hideLoadingMessage();
      console.error('Delete failed:', err);
      message.error('An error occurred while deleting the Stock Product.');
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  }
  
    const handleEditDrawer = (stock) => {
      setSelectedStock(stock);
      setDrawerVisible(true);
    };

    const handleDrawerStockProductClose = () => {
      setDrawerStockProductVisible(false);
      setSelectedStockProduct(null);
    }

    const handleDrawerStockProduct = (stockProduct) => {
      setDrawerStockProductVisible(true);
      setSelectedStockProduct(stockProduct);
    }

    const editHandlerStockProduct = async (values) => {
      const hideLoadingMessage = message.loading("Loading...", 0);
      try {
        handleDrawerStockProductClose();
        const response = await StockProductsAPI.modifyRow(selectedStockProduct.id, values);
        hideLoadingMessage();
    
        setStockItems((prev) =>
          prev.map((stockProduct) =>
            stockProduct.id === response.data.id
              ? { ...stockProduct, ...response.data }
              : stockProduct
          )
        );
      
        message.success('Stock Product updated successfully!');
      } catch (error) {
        // Handle errors gracefully
        hideLoadingMessage();
        console.error('Update failed:', error);
        message.error('An error occurred while updating the Stock Product.');
      }
    }
  
    const editHandler = async (values) => {

      const hideLoadingMessage = message.loading("Loading...", 0);
      try {
        handleDrawerClose();
        const response = await StockAPI.modifyRow(selectedStock.id, values);
        hideLoadingMessage();
    
        setStocks((prev) =>
          prev.map((stock) =>
            stock.id === response.data.id
              ? { ...stock, ...response.data }
              : stock
          )
        );

        setSelectedStock({...values, id: selectedStock.id});
      
        message.success('Stock (Place) updated successfully!');
      } catch (error) {
        // Handle errors gracefully
        hideLoadingMessage();
        console.error('Update failed:', error);
        message.error('An error occurred while updating the Stock (Place).');
      }
    }


  // Columns for stock items table
  const itemColumns = [
    {
      title: 'Product ID',
      // dataIndex: 'productId',
      key: 'productId',
      render: (_, record) => (
        <h3>{products.find((val) => val.id == record.product_id)?.name || ''}</h3>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
              type="link"
              onClick={() => handleDrawerStockProduct(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Stock Product?"
            onConfirm={() => handleDeleteStockItem(record.id)}
            okText="Yes"
            cancelText="No"
            >
            <Button type="link" danger>
                Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Columns for stock list table
  const stockColumns = [
    {
      title: 'Stock Location',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleSelectStock(record)}>
            Manage Items
          </Button>
          <Button
              type="link"
              onClick={() => handleEditDrawer(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Stock (Place)"
            onConfirm={() => handleDeleteStock(record.id)}
            okText="Yes"
            cancelText="No"
            >
            <Button type="link" danger>
                Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stock Management</h1>
      <div></div>
      <Drawer
        title={
          <Typography.Title level={4} style={{ margin: 0, color: '#673ab7' }}>
            Edit Stock (Place): { selectedStock?.name || ''}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the Stock name!' }]}
          >
            <Input placeholder="enter the Stock Location Name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit Stock (Place)
          </Button>
        </Form>
      </Drawer>
      <Drawer
        title={
          <Typography.Title level={4} style={{ margin: 0, color: '#673ab7' }}>
            Edit Stock Product: { products.find((val) => val.id == selectedStockProduct?.product_id)?.name || ''}
          </Typography.Title>
        }
        placement="right"
        onClose={handleDrawerStockProductClose}
        open={drawerStockProductVisible}
      >
        <Form
          layout="vertical"
          onFinish={editHandlerStockProduct}
          form={formStockProduct}
        >
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the new desired quantity!' }]}
          >
            <InputNumber
              value={selectedStockProduct?.quantity}
              placeholder="Enter Quantity"
              min={1}
              max={65000}
              style={{ width: '150px', marginRight: '10px' }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit Stock Product
          </Button>
        </Form>
      </Drawer>
      <div style={{ marginBottom: '20px' }}>
        <Input
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          placeholder="Enter Stock Location Name"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Button type="primary" onClick={handleAddStock}>
          Add Stock
        </Button>
      </div>

      {/* Stocks List */}
      <Table
        dataSource={stocks}
        columns={stockColumns}
        rowKey="id"
        style={{ marginBottom: '20px' }}
        loading={loading}
        pagination={false}
      />
      

      {/* If a stock is selected, show stock items management */}
      {selectedStock && (
        <div>
          <h2>Manage Items for: {selectedStock.name}</h2>

          {/* Add Stock Item */}
          <div style={{ marginBottom: '20px' }}>
          <Select
            value={productId}
            onChange={handleProductSelect}
            placeholder="Select Product"
            onFocus={fetchProductItems}
            style={{ width: '200px', marginRight: '10px' }}
            >
            {products.map((product) => (
                <Option key={product.id} value={product.id}>
                    {product.name}
                </Option>
            ))}
          </Select>

            {/* Input for Quantity */}
            <InputNumber
            value={quantity}
            onChange={(value) => setQuantity(value)}
            placeholder="Enter Quantity"
            min={1}
            max={65000}
            style={{ width: '150px', marginRight: '10px' }}
            />

            {/* Add Button */}
            <Button type="primary" onClick={handleAddStockItem}>
            Add Stock Item
            </Button>
          </div>

          {/* Stock Items Table */}
          <Table
            dataSource={stockItems}
            columns={itemColumns}
            rowKey="id"
            pagination={false}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default StockPage;
