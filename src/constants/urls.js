const getURL = () => {
  let URL;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:3000';
    //URL = 'https://app-stg.quesbook.com';
  } else {
    URL = 'https://app.quesbook.com';
  }
  console.log('getURL', process.env.NODE_ENV, URL);
  return URL;
};

export const API_URL = getURL();
export const GQL_URL = `${API_URL}/graphql`;
