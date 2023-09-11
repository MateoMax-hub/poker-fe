import { Button } from 'antd';
import axiosClient from '../../utils/config/axiosClient';

const PlanUpdate = () => {
  const handlePayUptade = async () => {
    try {
      const { data } = await axiosClient.post('/payment/create-order')
      if (data.link) window.location = data.link
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={handlePayUptade}>Pagar</Button>;
};
export default PlanUpdate;
