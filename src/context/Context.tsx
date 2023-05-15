import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode
}

const GlobalContext = createContext('')

const Context = ({ children }: Props) => {
  const [isDarkThemeOn, setisDarkThemeOn] = useState<boolean>(true);

  return (
    <>
      <GlobalContext.Provider>
        { children }
      </GlobalContext.Provider>
    </>
  )
}
export default Context
