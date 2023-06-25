import style from './header.module.scss';
import HeaderUtilitiesBtns from '../../components/headerUtilitiesBtns/HeaderUtilitiesBtns';

const Header = () => {
  const { headerContainer, selectedCard } = style;

  return (
    <div className={headerContainer}>
      <div>
        <div className={selectedCard}>☕</div>
        <h1>POKER PLANNING</h1>
      </div>
      <HeaderUtilitiesBtns />
    </div>
  );
};

export default Header;
