import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socketIo = io('http://localhost:4000');
import style from './room.module.scss';

const Room = () => {
  const { bodyContainer, buttonArea, cardArea, userArea, selectedCard, table } = style;
  const [myCard, setMyCard] = useState();
  const [roomData, setRoomData] = useState([]);
  const [enterNameModalShow, setEnterNameModalShow] = useState(false);
  const [name, setName] = useState('');
  const [reveal, setReveal] = useState(false);
  const cards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];
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
    socket.current.on('player disconnected', (data) => {
      disconnectPlayer(data.player);
    });
    return () => {
      socket.current.off('point response');
      socket.current.off('getOthersDataBe 4');
      socket.current.off('getOthersDataBe 2');
      socket.current.off('connect room response');
      socket.current.off('handle hand response');
      socket.current.off('player disconnected');
    };
  }, [myCard, name, roomData]);

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
    setRoomData((prevState) => [...prevState, { id: hand, card, playerName }]);
  };

  const disconnectPlayer = (playerToDisconnect) => {
    const roomUpdated = roomData.filter((player) => player.id !== playerToDisconnect);
    console.log(roomUpdated);
    console.log(roomData);
    setRoomData(roomUpdated);
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

  const handleSitUsers = () => {
    let initialPos = 'top';
    const config = [
      { name: 'top', limit: 0, users: [] },
      { name: 'bottom', limit: 0, users: [] },
      { name: 'left', limit: 3, users: [] },
      { name: 'right', limit: 3, users: [] },
    ];
    for (const player of roomData) {
      if (initialPos === 'top') {
        config[0].users.push(player);
        initialPos = 'bottom';
      } else if (initialPos === 'bottom') {
        config[1].users.push(player);
        if (config[2].users.length !== config[2].limit) {
          initialPos = 'left';
        } else {
          initialPos = 'top';
        }
      } else if (initialPos === 'left') {
        config[2].users.push(player);
        initialPos = 'right';
      } else if (initialPos === 'right') {
        config[3].users.push(player);
        initialPos = 'top';
      }
    }
    return (
      <>
        <div className='d-flex justify-content-around'>
          {
            config[0].users.length !== 0 && config[0].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>{reveal ? player.card : ''}</div>
                <p>{player.playerName}</p>
              </div>
            ))
          }
        </div>
        <div className='d-flex justify-content-around'>
          {
            config[1].users.length !== 0 && config[1].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>{reveal ? player.card : ''}</div>
                <p>{player.playerName}</p>
              </div>
            ))
          }
        </div>
        <div className='d-flex flex-column justify-content-around'>
          {
            config[2].users.length !== 0 && config[2].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>{reveal ? player.card : ''}</div>
                <p>{player.playerName}</p>
              </div>
            ))
          }
        </div>
        <div className='d-flex flex-column justify-content-around'>
          {
            config[3].users.length !== 0 && config[3].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>{reveal ? player.card : ''}</div>
                <p>{player.playerName}</p>
              </div>
            ))
          }
        </div>
      </>
    );
  };

  return (
    <>
      <div className={bodyContainer}>
        <div className={table}>
          {handleSitUsers()}
          <div>
            <div>
              <button onClick={() => showHands(!reveal)}>
                {reveal ? 'Reiniciar' : 'Revelar cartas'}
              </button>
            </div>
          </div>
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
