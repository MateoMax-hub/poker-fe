import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  const getRandomRoomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <>
      <Link to={`/room/${getRandomRoomId()}`}>
        <Button>Crear sala</Button>
      </Link>
    </>
  );
};
export default Home;
