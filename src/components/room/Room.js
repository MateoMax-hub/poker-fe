import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socketIo = io('http://localhost:4000');

const Room = () => {
  const [myCard, setMyCard] = useState();
  const [roomData, setRoomData] = useState([]);
  const [enterNameModalShow, setEnterNameModalShow] = useState(false);
  const [name, setName] = useState('');
  const cards = [0, 1, 2, 3, 5, 8, 12, 20];
  const socket = useRef();
  const { id: token } = useParams();
  const [nameForm] = Form.useForm();

  useEffect(() => {
    socket.current = socketIo;
    socket.current.on('point response', (data) => updateRoomData(data.sender, data.card, data.senderName));
    socket.current.on('getOthersDataBe 4', (data) => {
      updateRoomData(data.sender, data.card, data.name);
    });
    socket.current.on('getOthersDataBe 2', (data) => {
      if (data.requester !== socket.current.id) {
        socket.current.emit('getOthersDataFe 3', {card: myCard, requester: data.requester, name});
        updateRoomData(data.requester, undefined, data.requesterName);
      }
    });
    socket.current.on('connect room response', (data) => {
      if (data.connected) {
        socket.current.emit('getOthersDataFe 1', {room: token, socketId: socket.current.id, name});
      }
    });
    return () => {
      socket.current.off('point response');
      socket.current.off('getOthersDataBe 4');
      socket.current.off('getOthersDataBe 2');
      socket.current.off('connect room response');
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
  

  useEffect(() => {
    console.log(roomData);
  }, [roomData]);

  const sendCard = (point) => {
    setMyCard(point);
    updateRoomData(socket.current.id, point, name);
    socket.current.emit('point', { card: point, room: token, sender: socket.current.id, senderName: name });
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
    setRoomData([{id: socket.current.id, card: undefined, playerName: values.name }]);
  };

  return (
    <>
      <h3>Enviar puntaje</h3>
      {cards &&
        cards?.map((card) => (
          <button onClick={() => sendCard(card)} key={card}>
            {card}
          </button>
        ))}
      <Modal
        open={enterNameModalShow}
        closable={false}
        footer={[
          <Button onClick={submitNameForm}>
            Guardar
          </Button>
        ]}
        title='¿Con que nombre quieres entrar a la mesa?'
      >
        <Form form={nameForm} onFinish={handleSubmit}>
          <Form.Item name='name' rules={[{ required: true, message: 'Por favor rellenar con un nombre'}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Room;
