import { useEffect, useState } from 'react';
import { getBrowserLocales } from '../helpers';
import languages from './../languages';

interface AppStates {
  locale: 'en' | 'es'
  content: {[x: string]: string}
}

const useLocale = () => {
  const [locale, setLocale] = useState<AppStates['locale']>('en')
  const [content, setContent] = useState<AppStates['content']>({});

  useEffect(() => {
    getLocale();
  }, []);

  useEffect(() => {
    if (locale) {
      setContentNeeded();
    }
  }, [locale]);

  const getLocale = () => {
    const localeInLocalStorage = localStorage.getItem('locale');
    let localeSelected = localeInLocalStorage ? localeInLocalStorage : getBrowserLocales({ languageCodeOnly: true })[0];
    const finalLocale = (localeSelected !== 'en' && localeSelected !== 'es') ? 'en' : localeSelected;
    setLocale(finalLocale);
    localStorage.setItem('locale', finalLocale);
  }

  const setContentNeeded = () => {
    const languageFile = findCorrectLanguageFile();
    setContent(languageFile);
  }

  const findCorrectLanguageFile = () => {
    return languages[locale];
  };

  return content;
};

export default useLocale;
