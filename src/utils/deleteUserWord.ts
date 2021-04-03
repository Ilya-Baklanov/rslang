import { UserWord } from '@/types/response.types';

const token = <string>localStorage.getItem('token');

const deleteUserWord = async (userId: string, wordId: string): Promise<UserWord> => {
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <UserWord> await rawResponse.json();

  return content;
};

// how to call this method:
// deleteUserWord(606057e692e7e3001521564b, 573877e692e7e3001521564b).then(content => {
//
// })
//   .catch(err => {
//   });

export default deleteUserWord;
