import { useEffect } from 'react';
import axiosClient from '../../utils/config/axiosClient';

const SendVeirfyEmail = () => {
  useEffect(() => {
    const sendVerify = async () => {
      try {
        const data = await axiosClient.post('/users/sendVerify');
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    sendVerify();
  }, []);

  return <div>Se envio un codigo de verificacion a tu email</div>;
};
export default SendVeirfyEmail;
