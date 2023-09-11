import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null => {
  let navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState<boolean | undefined>();

  useEffect(() => {
    const getTokenValidation = async () => {
      try {
        const { data } = await axios.get('/verifyToken', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setIsTokenValid(data.tokenOk);
      } catch (error) {
        setIsTokenValid(false);
      }
    };
    getTokenValidation();
  });

  useEffect(() => {
    if (isTokenValid !== undefined && isTokenValid === false) navigate('/login');
  }, [isTokenValid])

  return (
    <>
      {
        (isTokenValid === undefined || isTokenValid === false) ? <></> : children
      }
    </>
  );
};

export default PrivateRoute;
