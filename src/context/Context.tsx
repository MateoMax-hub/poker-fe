import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode
}

interface ProviderData {
  isDarkThemeOn?: boolean
  setIsDarkThemeOn?: Function
  setLocale?: Function
  locale?: string
}

export const UserConfigContext = createContext<ProviderData>({})

const Context = ({ children }: Props) => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState<boolean>(true);
  const [locale, setLocale] = useState<string>('');

  return (
    <UserConfigContext.Provider value={{
      isDarkThemeOn,
      setIsDarkThemeOn,
      locale,
      setLocale,
    }}>
      { children }
    </UserConfigContext.Provider>
  )
}
export default Context
