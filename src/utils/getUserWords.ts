import { UserWords } from '@/types/response.types';

const token = <string>localStorage.getItem('token');

const getUserWords = async (userId: string): Promise<UserWords> => {
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/words`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <UserWords> await rawResponse.json();

  return content;
};

// how to call this method:
// getUserWords(606057e692e7e3001521564b).then(content => {
//
// })
//   .catch(err => {
//   });

export default getUserWords;
