import style from './header.module.scss';

const Header = () => {
  const { headerContainer, selectedCard } = style;

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
