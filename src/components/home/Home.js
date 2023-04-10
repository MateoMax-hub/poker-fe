import { Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './home.module.scss';

const { homeContainer, button } = style;

const Home = () => {
  const getRandomRoomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <>
      <div className={homeContainer}>
        <div>
          <h1>
            Planning Poker para equipos de desarrollo con metodologia agile
          </h1>
          <Link className={button} to={`/room/${getRandomRoomId()}`}>
            <Button>Crear sala</Button>
          </Link>
        </div>
        <div>Hola</div>
      </div>
    </>
  );
};
export default Home;
