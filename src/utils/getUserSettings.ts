import { UserSettings } from '@/types/response.types';

const getUserSettings = async (): Promise<UserSettings> => {
  const userId = <string>localStorage.getItem('userId');
  const token = <string>localStorage.getItem('token');
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/settings`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <UserSettings> await rawResponse.json();

  return content;
};

export default getUserSettings;
