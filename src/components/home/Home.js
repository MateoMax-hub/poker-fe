import { Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './home.module.scss';

const { homeContainer, button, coffee, wave } = style;

const Home = () => {
  const cards = [0, 1, 2, 3, 5, 8, 13, 13, 21, 34, 55, 89, '?'];
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
        <div>
          <div>
            {cards &&
              cards?.map((card) => (
                <button key={card}>
                  {card}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className={coffee}>☕</div>
      <div className={wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fill-opacity="1" d="M0,128L48,112C96,96,192,64,288,69.3C384,75,480,117,576,144C672,171,768,181,864,170.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </>
  );
};
export default Home;
