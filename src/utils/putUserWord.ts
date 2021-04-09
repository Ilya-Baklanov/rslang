import { UserWord } from '@/types/response.types';

const putUserWord = async (
  wordId: string,
  category: string,
  option: Record<string, any>
): Promise<UserWord> => {
  const token = <string>localStorage.getItem('token');
  const userId = <string>localStorage.getItem('userId');
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty: category,
        optional: option,
      }),
    }
  );
  const content = <UserWord> await rawResponse.json();

  return content;
};

export default putUserWord;
