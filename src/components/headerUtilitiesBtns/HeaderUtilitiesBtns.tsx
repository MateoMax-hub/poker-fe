import { useState } from 'react';
import { Option } from '../../types';
import Select from '../common/select/Select';
import SwitchTheme from '../switchTheme/SwitchTheme';

const options: Option[] = [
  {
    label: 'Idioma',
    value: 'default',
  },
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

const HeaderUtilitiesBtns = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Option>(options[0]);

  return (
    <div>
      <Select
        options={options}
        onChange={(selection: Option) => setSelectedLanguage(selection)}
        selectedValue={selectedLanguage}
      />
      <SwitchTheme />
    </div>
  );
};
export default HeaderUtilitiesBtns;
