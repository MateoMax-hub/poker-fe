import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import Room from './components/room/Room';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
