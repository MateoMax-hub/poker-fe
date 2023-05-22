import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
const socketIo = io(import.meta.env.VITE_API_URL);
import style from './room.module.scss';
import { Cards, CardsToUpdateRoom, MyCard, PlayerNameSubmit, RoomData, RoomPlayersDividedInPositions } from '../../types';
import useLocale from '../../utils/hooks/useLocale';

interface AppStates {
  roomData: RoomData[]
  myCard: MyCard
  modalShow: boolean
  playerName: string
  reveal: boolean
};

const Room = () => {
  const {
    bodyContainer,
    buttonArea,
    userArea,
    selectedCard,
    table,
    cardSelected,
    blockCards,
    nameModal,
  } = style;
  const pageTextContent = useLocale();
  const [myCard, setMyCard] = useState<AppStates['myCard']>();
  const [roomData, setRoomData] = useState<AppStates['roomData']>([]);
  const [enterNameModalShow, setEnterNameModalShow] = useState<AppStates['modalShow']>(false);
  const [name, setName] = useState<AppStates['playerName']>('');
  const [reveal, setReveal] = useState<AppStates['reveal']>(false);
  const cards: Cards[] = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];
  const socket = useRef<Socket>();
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
      if (data.requester !== socket.current?.id) {
        socket.current?.emit('getOthersDataFe 3', {
          card: myCard,
          requester: data.requester,
          name,
        });
        updateRoomData(data.requester, undefined, data.requesterName);
      }
    });
    socket.current.on('connect room response', (data) => {
      if (data.connected) {
        socket.current?.emit('getOthersDataFe 1', {
          room: token,
          socketId: socket.current.id,
          name,
        });
      }
    });
    socket.current.on('handle hand response', (data) => {
      resetHands(data.show);
    });
    socket.current.on('player disconnected', (data) => {
      disconnectPlayer(data.player);
    });
    return () => {
      socket.current?.off('point response');
      socket.current?.off('getOthersDataBe 4');
      socket.current?.off('getOthersDataBe 2');
      socket.current?.off('connect room response');
      socket.current?.off('handle hand response');
      socket.current?.off('player disconnected');
    };
  }, [myCard, name, roomData]);

  useEffect(() => {
    if (token && name) {
      socket.current?.emit('connect room', { room: token });
    }
  }, [token, name]);

  useEffect(() => {
    setEnterNameModalShow(true);
  }, []);

  const sendCard = (point: Cards) => {
    setMyCard(point);
    updateRoomData(socket.current?.id, point, name);
    socket.current?.emit('point', {
      card: point,
      room: token,
      sender: socket.current.id,
      senderName: name,
    });
  };

  const updateRoomData = (hand: string | undefined, card: CardsToUpdateRoom, playerName: string) => {
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

  const disconnectPlayer = (playerToDisconnect: string) => {
    const roomUpdated = roomData.filter(
      (player) => player.id !== playerToDisconnect
    );
    setRoomData(roomUpdated);
  };

  const submitNameForm = () => {
    nameForm.submit();
  };

  const handleSubmit = (values: PlayerNameSubmit) => {
    setName(values.name);
    setRoomData([
      { id: socket.current?.id, card: undefined, playerName: values.name },
    ]);
    setEnterNameModalShow(false);
  };

  const showHands = (show: boolean) => {
    socket.current?.emit('handle hand', { show, room: token });
    setReveal(show);
    if (!show) {
      const usersWithoutCards = roomData.map((player) => ({
        ...player,
        card: undefined,
      }));
      setRoomData(usersWithoutCards);
      setMyCard(undefined);
    }
  };

  const resetHands = (show: boolean) => {
    setReveal(show);
    if (!show) {
      const usersWithoutCards = roomData.map((player) => ({
        ...player,
        card: undefined,
      }));
      setRoomData(usersWithoutCards);
      setMyCard(undefined);
    }
  };

  const handleSitUsers = () => {
    let initialPos = 'top';
    const config: RoomPlayersDividedInPositions[] = [
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
        <div className="d-flex justify-content-around">
          {config[0].users.length !== 0 &&
            config[0].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>
                  {reveal ? player.card : player.card !== undefined ? '✔' : ''}
                </div>
                <span>
                  <p>{player.playerName}</p>
                </span>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-around">
          {config[1].users.length !== 0 &&
            config[1].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>
                  {reveal ? player.card : player.card !== undefined ? '✔' : ''}
                </div>
                <span>
                  <p>{player.playerName}</p>
                </span>
              </div>
            ))}
        </div>
        <div className="d-flex flex-column justify-content-around">
          {config[2].users.length !== 0 &&
            config[2].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>
                  {reveal ? player.card : player.card !== undefined ? '✔' : ''}
                </div>
                <span>
                  <p>{player.playerName}</p>
                </span>
              </div>
            ))}
        </div>
        <div className="d-flex flex-column justify-content-around">
          {config[3].users.length !== 0 &&
            config[3].users.map((player) => (
              <div className={userArea} key={player.id}>
                <div className={selectedCard}>
                  {reveal ? player.card : player.card !== undefined ? '✔' : ''}
                </div>
                <span>
                  <p>{player.playerName}</p>
                </span>
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <div className={bodyContainer}>
      <div>
        <div className={table}>
          {handleSitUsers()}
          <div>
            <div>
              <button onClick={() => showHands(!reveal)}>
                {reveal ? pageTextContent?.RESET_BUTTON : pageTextContent?.SHOW_CARDS}
              </button>
            </div>
          </div>
        </div>
        <div className={buttonArea}>
          <div className={reveal ? blockCards : ''}>
            <div>{pageTextContent?.HAND_PLAYED}</div>
            {cards &&
              cards?.map((card) => (
                <button
                  className={card === myCard ? cardSelected : ''}
                  onClick={() => sendCard(card)}
                  key={card}
                >
                  {card}
                </button>
              ))}
          </div>
        </div>
        <Modal
          open={enterNameModalShow}
          closable={false}
          footer={[
            <Button onClick={submitNameForm} key="1">
              {pageTextContent?.SAVE_PLAYER_NAME}
            </Button>,
          ]}
          title={pageTextContent?.NAME_MODAL_TITLE}
          className={nameModal}
        >
          <Form form={nameForm} onFinish={handleSubmit}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: pageTextContent?.NAME_INPUT_REQUIRE_MSG },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default Room;
