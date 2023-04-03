import style from './footer.module.css';

const Footer = () => {
  const { footerContainer } = style;

  return (
    <div className={footerContainer}>
      © derechos reservados por mateo max steel
    </div>
  );
};

export default Footer;
