import { UserSettings } from '@/types/response.types';

const putUserSettings = async (
  wordsPerDay: number,
  option: Record<string, any>
): Promise<UserSettings> => {
  const userId = <string>localStorage.getItem('userId');
  const token = <string>localStorage.getItem('token');
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/settings`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wordsPerDay,
        optional: option,
      }),
    }
  );
  const content = <UserSettings> await rawResponse.json();

  return content;
};

export default putUserSettings;
