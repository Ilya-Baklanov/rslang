import { Statistic } from '@/types/response.types';

const postStatistic = async (statistic: Statistic): Promise<Statistic> => {
  const userId = <string>localStorage.getItem('userId');
  const token = <string>localStorage.getItem('token');
  const rawResponse = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistic),
    }
  );
  const content = <Statistic> await rawResponse.json();

  return content;
};

export default postStatistic;
