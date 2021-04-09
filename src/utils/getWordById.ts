import { Word } from '@/types/response.types';

const getWordById = async (wordId: string): Promise<Word> => {
  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/words/${wordId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <Word> await rawResponse.json();

  return content;
};

// how to call this method:
// getWordById(5e9f5ee35eb9e72bc21af70c).then(content => {
//
// })
//   .catch(er => {
//   });

export default getWordById;
