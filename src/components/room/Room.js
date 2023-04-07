import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socketIo = io('http://localhost:4000');
import style from './room.module.css';
import scrumpe from '../assets/scrumpe.png';

const Room = () => {
  const { bodyContainer, buttonArea, cardArea, userArea, selectedCard } = style;
  const [myCard, setMyCard] = useState();
  const [roomData, setRoomData] = useState([]);
  const [enterNameModalShow, setEnterNameModalShow] = useState(false);
  const [name, setName] = useState('');
  const [reveal, setReveal] = useState(false);
  const cards = [0, 1, 2, 3, 5, 8, 12, 20];
  const socket = useRef();
  const { id: token } = useParams();
  const [nameForm] = Form.useForm();

  useEffect(() => {
    socket.current = socketIo;
    socket.current.on('point response', (data) =>
      updateRoomData(data.sender, data.card, data.senderName)
    );
    socket.current.on('getOthersDataBe 4', (data) => {
      updateRoomData(data.sender, data.card, data.name);
    });
    socket.current.on('getOthersDataBe 2', (data) => {
      if (data.requester !== socket.current.id) {
        socket.current.emit('getOthersDataFe 3', {
          card: myCard,
          requester: data.requester,
          name,
        });
        updateRoomData(data.requester, undefined, data.requesterName);
      }
    });
    socket.current.on('connect room response', (data) => {
      if (data.connected) {
        socket.current.emit('getOthersDataFe 1', {
          room: token,
          socketId: socket.current.id,
          name,
        });
      }
    });
    socket.current.on('handle hand response', (data) => {
      setReveal(data.show);
    });
    return () => {
      socket.current.off('point response');
      socket.current.off('getOthersDataBe 4');
      socket.current.off('getOthersDataBe 2');
      socket.current.off('connect room response');
      socket.current.off('handle hand response');
    };
  }, [myCard, name]);

  useEffect(() => {
    if (token && name) {
      socket.current.emit('connect room', { room: token });
    }
  }, [token, name]);

  useEffect(() => {
    setEnterNameModalShow(true);
  }, []);

  const sendCard = (point) => {
    setMyCard(point);
    updateRoomData(socket.current.id, point, name);
    socket.current.emit('point', {
      card: point,
      room: token,
      sender: socket.current.id,
      senderName: name,
    });
  };

  const updateRoomData = (hand, card, playerName) => {
    const handPlayedFound = roomData.some((player) => player.id === hand);
    if (handPlayedFound) {
      const newHandInserted = roomData.map((player) => {
        if (player.id === hand) return { ...player, card, playerName };
        return player;
      });
      return setRoomData(newHandInserted);
    }
    setRoomData([...roomData, { id: hand, card, playerName }]);
  };

  const submitNameForm = () => {
    nameForm.submit();
    setEnterNameModalShow(false);
  };

  const handleSubmit = (values) => {
    setName(values.name);
    setRoomData([
      { id: socket.current.id, card: undefined, playerName: values.name },
    ]);
  };

  const showHands = (show) => {
    socket.current.emit('handle hand', { show, room: token });
    setReveal(show);
    if (!show) {
      const usersWithoutCards = roomData.map((player) => ({
        ...player,
        card: undefined,
      }));
      setRoomData(usersWithoutCards);
    }
  };

  return (
    <>
      <div className={bodyContainer}>
        {roomData.length !== 0 &&
          roomData.map((player) => (
            <div className={userArea} key={player.id}>
              {/* <img src={scrumpe} alt='imagen usuario'/> */}
              <div className={selectedCard}>{reveal ? player.card : ''}</div>
              <p>{player.playerName}</p>
            </div>
          ))}
        <div className={cardArea}>
          <button onClick={() => showHands(!reveal)}>
            {reveal ? 'Reiniciar' : 'Revelar cartas'}
          </button>
        </div>
        <div className={buttonArea}>
          {cards &&
            cards?.map((card) => (
              <button onClick={() => sendCard(card)} key={card}>
                <div>{card === myCard ? 'SELECCIONADA' : ''}</div>
                {card}
              </button>
            ))}
        </div>
        <Modal
          open={enterNameModalShow}
          closable={false}
          footer={[
            <Button onClick={submitNameForm} key="1">
              Guardar
            </Button>,
          ]}
          title="¿Con que nombre quieres entrar a la mesa?"
        >
          <Form form={nameForm} onFinish={handleSubmit}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Por favor rellenar con un nombre' },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default Room;
