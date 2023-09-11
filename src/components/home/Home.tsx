import { Button, Col, Modal, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import style from './home.module.scss';
import useLocale from '../../utils/hooks/useLocale';
import { useEffect, useState, useContext } from 'react';
import { UserConfigContext } from '../../context/Context';

const { homeContainer, button, coffee, wave } = style;

const Home = () => {
  let navigate = useNavigate();
  const pageTextContent = useLocale();
  const cards = [0, 1, 2, 3, 5, 8, 13, 13, 21, 34, 55, 89, '?'];
  const getRandomRoomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  const [isEmailVerify, setIsEmailVerify] = useState(true)
  const { userData } = useContext(UserConfigContext)

  useEffect(() => {
    if (localStorage.getItem('token') && userData?.emailConfirmed !== undefined) setIsEmailVerify(userData?.emailConfirmed)
  }, [userData])

  const handleCloseSession = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <Row className={homeContainer}>
        <Col lg={13} md={24}>
          <div className='w-100 h-100'>
            <h1>
              {pageTextContent?.MAIN_DESCRIPTION}
            </h1>
            <Link className={button} to={`/room/${getRandomRoomId()}`}>
              <Button>{pageTextContent?.BTN_CREATE_ROOM}</Button>
            </Link>
          </div>
        </Col>
        <Col lg={11}>
          <div>
            {cards &&
              cards?.map((card) => (
                <button key={card}>
                  {card}
                </button>
              ))}
          </div>
        </Col>
      </Row>
      <div className={coffee}>☕</div>
      <div className={wave}>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%', zIndex: '-1'}}><path d="M213.19,-0.00 C41.98,40.84 435.89,75.29 202.98,149.60 L500.00,149.60 L500.00,-0.00 Zca" style={{stroke: 'none'}}></path></svg>
      </div>

      <Modal
        open={!isEmailVerify}
        title="Por favor verificar el email"
        closable={false}
        okText='Reenviar verificación'
        onOk={() => navigate('/sendVerifyEmail')}
        cancelText="Iniciar con una cuenta diferente"
        onCancel={handleCloseSession}
        maskClosable={false}
      />
    </>
  );
};
export default Home;
