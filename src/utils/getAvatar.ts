/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const getAvatar = async (avatarForm: any) => {
  const rawResponse = await fetch('https://reat-learnwords.herokuapp.com/sendImage', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: new FormData(avatarForm),
  });
  const content = await rawResponse.json();
  return content;
};

export default getAvatar;
