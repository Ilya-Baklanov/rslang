import { Statistic } from '@/types/response.types';

const getStatistic = async (): Promise<Statistic> => {
  const userId = <string>localStorage.getItem('userId');
  const token = <string>localStorage.getItem('token');
  const rawResponse = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <Statistic> await rawResponse.json();

  return content;
};

export default getStatistic;
