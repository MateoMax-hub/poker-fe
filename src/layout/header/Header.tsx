import style from './header.module.scss';
import HeaderUtilitiesBtns from '../../components/headerUtilitiesBtns/HeaderUtilitiesBtns';
import { SettingFilled } from '@ant-design/icons';
import { useState } from 'react'
import { Button, Modal } from 'antd';

const Header = () => {
  const { headerContainer, selectedCard, utilitiesModal, settingsModal, brand } = style;
  const [settingsModalShow, setSettingsModalShow] = useState(false);

  const handleSettingsModal = () => setSettingsModalShow(previous => !previous)

  return (
    <div className={headerContainer}>
      <div>
        <div className={selectedCard}>☕</div>
        <h1 className={brand}>POKER PLANNING</h1>
      </div>
      <HeaderUtilitiesBtns />
      <div className={utilitiesModal}>
        <div onClick={handleSettingsModal}>
          <SettingFilled />
        </div>
      </div>

      <Modal
        open={settingsModalShow}
        footer={[
          <Button onClick={handleSettingsModal} key="1">
            Close
          </Button>,
        ]}
        title={'Settings'}
        className={settingsModal}
      >
        <HeaderUtilitiesBtns isFromSettingsModal={true}/>
      </Modal>
    </div>
  );
};

export default Header;
