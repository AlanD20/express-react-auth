import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoutes from '@comp/AuthRoutes';
import Dashboard from './pages/Dashboard';
import RedirectIfAuth from '@comp/RedirectIfAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<RedirectIfAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
