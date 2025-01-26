import { useState, createElement } from 'react'
import * as ant_icon from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthAPI } from '../api/methods';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  [ ant_icon.LayoutOutlined, "Dashboard", "/"],
  [ ant_icon.ShoppingCartOutlined, "Orders", "/orders"],
  [ ant_icon.AppstoreOutlined, "Categories", "/categories"],
  [ ant_icon.DribbbleOutlined, "Brands", "/brands"],
  [ ant_icon.ApartmentOutlined, "Product Types", "/product-types"],
  [ ant_icon.SkinOutlined, "Products", "/products"],
  [ ant_icon.ProductOutlined, "Stock", "/stock"],
  [ ant_icon.AccountBookOutlined, "Coupons", "/coupons"],
  [ ant_icon.DollarOutlined, "Payments", "/payments"],
  [ ant_icon.TruckOutlined, "Delivery", "/delivery"],
];

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    try {
      const response = await AuthAPI.logOut();
      console.log('Logout successful:', response.data);

      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', margin: '0px' }}>
      <Header style={{ backgroundColor: 'magenta', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: 'white' }}>App Name</h2>
        </div>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider
          collapsible
          breakpoint="lg"
          collapsedWidth="50"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          collapsed={collapsed}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed)
            console.log(collapsed, type);
          }}
        >
            <div>
              <div className="demo-logo-vertical" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                items={items.map((item, index) => ({
                    key: String(index + 1),
                    icon: createElement(item[0]),
                    label: item[1],
                    // OnClick now calls the handleClick function with the correct path
                    onClick: () => navigate(item[2]),
                  }))
                }
              />
            </div>
        </Sider>
          <Layout>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                style={{
                  padding: 24,
                  // minHeight: '100vh',
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet/>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
