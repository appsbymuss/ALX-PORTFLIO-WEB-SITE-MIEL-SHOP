import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Layout
import MainLayout from './assets/layouts/MainLayout';

// Pages
import Dashboard from './assets/pages/Dashboard';
import Categories from './assets/pages/Categories';
import BrandsPage from './assets/pages/Brands';
import Products from './assets/pages/Products';
import ProductType from './assets/pages/ProductType';
import StockPage from './assets/pages/Stock';
import PaymentsPage from './assets/pages/Payement';
import CouponsPage from './assets/pages/Coupon';
import DeliveryHistory from './assets/pages/Deliviries';
import OrderConfirmationPage from './assets/pages/Order';
import LoginPage from './assets/pages/Login';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path='dashboard' element={<Dashboard />} index/>
          <Route path='categories' element={<Categories/>}/>
          <Route path='brands' element={<BrandsPage />} />
          <Route path='products' element={<Products />} />
          <Route path='product-types' element={<ProductType />} />
          <Route path='stock' element={<StockPage />} />
          <Route path='payments' element={<PaymentsPage />} />
          <Route path='coupons' element={<CouponsPage />} />
          <Route path='delivery' element={<DeliveryHistory />} />
          <Route path='orders' element={<OrderConfirmationPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App
