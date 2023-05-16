import { useContext } from 'react';
import style from './header.module.scss';
import { GlobalContext } from '../../context/Context';
import { Switch } from 'antd';

const Header = () => {
  const { headerContainer, selectedCard, switchBtn } = style;
  console.log(useContext(GlobalContext));

  return (
    <div className={headerContainer}>
      <div>
        <div className={selectedCard}>☕</div>
        <h1>POKER PLANNING</h1>
      </div>
      <Switch className={switchBtn} />
    </div>
  );
};

export default Header;
