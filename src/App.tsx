import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './layout/header/Header';
import Room from './components/room/Room';
import Context from './context/Context';

const App = () => {
  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
};

export default App;
