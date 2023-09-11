import { createContext, useState, useEffect } from "react";
import axiosClient from "../utils/config/axiosClient";

interface Props {
  children: React.ReactNode
}

interface ProviderData {
  isDarkThemeOn?: boolean
  setIsDarkThemeOn?: Function
  setLocale?: Function
  locale?: string
  userData?: {
    emailConfirmed?: boolean,
    userName?: string,
    email?: string,
    _id?: string,
    createdAt?: Date,
    hasMembership?: boolean
  }
}

export const UserConfigContext = createContext<ProviderData>({})

const Context = ({ children }: Props) => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState<boolean>(true);
  const [locale, setLocale] = useState<string>('');
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axiosClient.get('/users/userData')
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (localStorage.getItem('token')) getUserData()
  }, [])

  return (
    <UserConfigContext.Provider value={{
      isDarkThemeOn,
      setIsDarkThemeOn,
      locale,
      setLocale,
      userData
    }}>
      { children }
    </UserConfigContext.Provider>
  )
}
export default Context
