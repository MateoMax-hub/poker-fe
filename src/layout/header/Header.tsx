import { useContext } from 'react';
import style from './header.module.scss';
import { GlobalContext } from '../../context/Context';

const Header = () => {
  const { headerContainer, selectedCard } = style;
  console.log(useContext(GlobalContext));

  return (
    <div className={headerContainer}>
      <div>
        <div className={selectedCard}>☕</div>
        <h1>POKER PLANNING</h1>
      </div>
    </div>
  );
};

export default Header;
