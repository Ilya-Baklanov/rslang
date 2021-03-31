import { Words } from '@/types/response.types';

const getWords = async (page: number, group: number): Promise<Words> => {
  const rawResponse = await fetch(
    `https://reat-learnwords.herokuapp.com/words?page=${page}&group=${group}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <Words> await rawResponse.json();

  return content;
};

// how to call this method:
// getWords(0, 5).then(content => {

// })
//   .catch(er => {
//   });

export default getWords;
