import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socketIo = io('http://localhost:4000');
import style from './room.module.css';
import scrumpe from '../assets/scrumpe.png';

const Room = () => {
  const { bodyContainer, buttonArea, cardArea, userArea } = style;
  const [myCard, setMyCard] = useState();
  const [roomData, setRoomData] = useState([]);
  const cards = [0, 1, 2, 3, 5, 8, 12, 20];
  const socket = useRef();
  let { id } = useParams();
  const token = id;

  useEffect(() => {
    socket.current = socketIo;
    socket.current.on('point response', (data) =>
      updateRoomData(data.sender, data.card)
    );
    socket.current.on('getOthersDataBe 4', (data) => {
      updateRoomData(data.sender, data.card);
    });
    socket.current.on('getOthersDataBe 2', (data) => {
      if (data.requester !== socket.current.id) {
        socket.current.emit('getOthersDataFe 3', {
          card: myCard,
          requester: data.requester,
        });
      }
    });
    socket.current.on('connect room response', (data) => {
      if (data.connected) {
        socket.current.emit('getOthersDataFe 1', {
          room: token,
          socketId: socket.current.id,
        });
      }
    });
    return () => {
      socket.current.off('getOthersDataBe 2');
    };
  }, [myCard]);

  useEffect(() => {
    if (token) {
      socket.current.emit('connect room', { room: token });
    }
  }, [token]);

  useEffect(() => {
    console.log(roomData);
  }, [roomData]);

  const sendCard = (point) => {
    setMyCard(point);
    updateRoomData(socket.current.id, point);
    socket.current.emit('point', {
      card: point,
      room: token,
      sender: socket.current.id,
    });
  };

  const updateRoomData = (hand, card) => {
    const handPlayedFound = roomData.some((player) => player.id === hand);
    if (handPlayedFound) {
      const newHandInserted = roomData.map((player) => {
        if (player.id === hand) return { ...player, card };
        return player;
      });
      return setRoomData(newHandInserted);
    }
    setRoomData([...roomData, { id: hand, card }]);
  };

  return (
    <>
      <div className={bodyContainer}>
        <div className={userArea}>
          <img src={scrumpe} />
          <p>User 1</p>
        </div>
        <div className={cardArea}>
          <button>Revelar cartas!</button>
        </div>
        <div className={userArea}>
          <img src={scrumpe} />
          <p>User 2</p>
        </div>
        <div className={buttonArea}>
          {cards &&
            cards?.map((card) => (
              <button onClick={() => sendCard(card)} key={card}>
                {card}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};
export default Room;
