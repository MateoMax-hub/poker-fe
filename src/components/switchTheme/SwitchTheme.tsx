import { useRef } from 'react';
import style from './switchTheme.module.scss';

const SwitchTheme = () => {
  const lightThemeText = useRef<HTMLDivElement>(null)
  const darkThemeText = useRef<HTMLDivElement>(null)
  const {
    themeSwitchWrapper,
    mainWrapper,
    themeText,
    sliderWrapper,
    themeBtnSlider,
    star,
    star1,
    star2,
    star3,
    star4,
    star5,
    star6,
    disabled,
  } = style;

  const handleSwitch = (e: Event | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    lightThemeText.current?.classList.toggle(disabled)
    darkThemeText.current?.classList.toggle(disabled)

    const target = e.target as HTMLInputElement
    if (target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    console.log(e)
  }

  return (
    <div className={mainWrapper}>
      <div className={themeSwitchWrapper}>
        <label htmlFor="theme-btn">
          <input type="checkbox" id="theme-btn" onClick={handleSwitch}/>
          <div className={sliderWrapper}>
            <div className={themeBtnSlider}></div>
            <span className={`${star} ${star1}`}></span>
            <span className={`${star} ${star2}`}></span>
            <span className={`${star} ${star3}`}></span>
            <span className={`${star} ${star4}`}></span>
            <span className={`${star} ${star5}`}></span>
            <span className={`${star} ${star6}`}></span>
          </div>
        </label>
      </div>
    </div>
  );
};
export default SwitchTheme;
