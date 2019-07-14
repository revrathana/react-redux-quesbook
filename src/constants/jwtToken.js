import cookie from 'js-cookie';

export function getJwtToken() {
  if (cookie.get('jwt') == null) {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMjg2OTMiLCJleHAiOjE1MjM1Mjg2MDAsIm5iZiI6MTUyMDkzNjYwMH0.F4m-RNqDNmz6knoAvK-WoCiZgTergq0g7DIG5475mLc';
  }
  return cookie.get('jwt');
}
