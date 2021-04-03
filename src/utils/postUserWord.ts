import { UserWord } from '@/types/response.types';

const postUserWord = async (wordId: string, category: string): Promise<UserWord> => {
  const token = <string>localStorage.getItem('token');
  const userId = <string>localStorage.getItem('userId');
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty: category,
        optional: {},
      }),
    }
  );
  const content = <UserWord> await rawResponse.json();

  return content;
};

export default postUserWord;
