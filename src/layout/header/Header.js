import style from './header.module.css';

const Header = () => {
  const { headerContainer } = style;

  return (
    <div className={headerContainer}>
      <h1>POKER PLANNING</h1>
    </div>
  );
};
export default Header;
