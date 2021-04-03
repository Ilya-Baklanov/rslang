import { AggregatedWords } from '@/types/response.types';

const getAggregatedWords = async (
  group: number | string,
  page: number | string,
  wordsPerPage: number | string,
  filter: string
): Promise<AggregatedWords> => {
  const token = <string>localStorage.getItem('token');
  const userId = <string>localStorage.getItem('userId');
  let emptyRequest: string;

  if (group || page || wordsPerPage || filter) {
    emptyRequest = '?';
  } else {
    emptyRequest = '';
  }

  const groupRequest: string = group === 'empty' ? '' : `group=${group}&`;

  const pageRequest: string = page === 'empty' ? '' : `page=${page}&`;

  const wordsPerPageRequest: string = wordsPerPage === 'empty' ? '' : `wordsPerPage=${wordsPerPage}&`;

  const filterRequest: string = filter === 'empty' ? '' : `filter=${filter}`;

  const rawResponse: Response = await fetch(
    `https://reat-learnwords.herokuapp.com/users/${userId}/aggregatedWords${emptyRequest}${groupRequest}${pageRequest}${wordsPerPageRequest}${filterRequest}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const content = <AggregatedWords[]> await rawResponse.json();

  return content[0];
};

export default getAggregatedWords;
