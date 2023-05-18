import { useContext, useState } from 'react';
import style from './header.module.scss';
import { GlobalContext } from '../../context/Context';
import { Switch } from 'antd';
import Select from '../../components/select/Select';
import { Option } from '../../types';

const options: Option[] = [
  {
    label: 'Español',
    value: 'spa',
  },
  {
    label: 'English',
    value: 'eng',
  },
  {
    label: '中文',
    value: 'chinese',
  },
  {
    label: '한국어',
    value: 'korean',
  },
  {
    label: '日本語',
    value: 'japanese',
  },
];

const Header = () => {
  const { headerContainer, selectedCard, switchBtn } = style;
  const [selectedLanguage, setSelectedLanguage] = useState<Option | null>(null);

  return (
    <div className={headerContainer}>
      <div>
        <div className={selectedCard}>☕</div>
        <h1>POKER PLANNING</h1>
      </div>
      <div>
        <Select
          placeholder="Lenguaje"
          options={options}
          onChange={(selection: Option) => setSelectedLanguage(selection)}
          selectedValue={selectedLanguage}
        />
        <Switch className={switchBtn} />
      </div>
    </div>
  );
};

export default Header;
