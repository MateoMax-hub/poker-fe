import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../utils/config/axiosClient";

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const data = await axiosClient.post('/users/verifyToken', { token })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    verifyEmail()
  }, [])
  
  return <div>VerifyEmail</div>;
};
export default VerifyEmail;
