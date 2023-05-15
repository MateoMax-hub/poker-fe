import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode
}

interface ProviderData {
  isDarkThemeOn?: boolean
  setisDarkThemeOn?: Function
  setLocale?: Function
  locale?: string
}

export const GlobalContext = createContext<ProviderData>({})

const Context = ({ children }: Props) => {
  const [isDarkThemeOn, setisDarkThemeOn] = useState<boolean>(true);
  const [locale, setLocale] = useState<string>('');

  return (
    <>
      <GlobalContext.Provider value={{
        isDarkThemeOn,
        setisDarkThemeOn,
        locale,
        setLocale,
      }}>
        { children }
      </GlobalContext.Provider>
    </>
  )
}
export default Context
