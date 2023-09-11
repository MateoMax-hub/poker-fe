import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './layout/header/Header';
import Room from './components/room/Room';
import Context from './context/Context';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SendVeirfyEmail from './pages/sendVerifyEmail/SendVeirfyEmail';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import PlanUpdate from './pages/planUpdate/PlanUpdate';

const App = () => {
  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/planUpdate" element={<PlanUpdate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sendVerifyEmail" element={<SendVeirfyEmail />} />
          <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
          <Route path="/room/:id" element={<PrivateRoute><Room /></PrivateRoute>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
};

export default App;
