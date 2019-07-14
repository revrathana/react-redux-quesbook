export const snakeToCamelParams = (params) => {
  let newParams = {}
  for (var key in params) {
    newParams[key.replace(/(\_\w)/g, matches => matches[1].toUpperCase())] = params[key];
  }
  return newParams;
}

export const fn_ParsePercentage = (denominator, numerator, decimalPlaces = 2) => {
  let d = Number(denominator);
  let n = Number(numerator);
  let dp = Number(decimalPlaces);
  if (isNaN(d) || isNaN(n) || isNaN(dp)) {
      return null;
  }
  let ret = (n / d) * 100;
  let re = /^[0-9]+\.[0-9]{3,}$/;
  return re.test(String(ret))
      ? `${ret.toFixed(dp)}`
      : `${ret}`;
}

export function fn_GetPartTestState({answered_questions, finished}) {
  if (finished) {
      return 'finished';
  }
  if (answered_questions === 0) {
      return 'unstarted';
  }
  return 'unfinished';
}

export function fn_GetFinalTestState(part1Obj, subject) {
  let part1State = fn_GetPartTestState(part1Obj);
  if (part1State === 'unstarted') {
      return {
          forGetStarted: 'start',
          forDiagnostic: {
              subject: subject,
              state: 'unstarted',
              part: 1,
              btnText: 'Start the test!'
          }
      };
  }
  if (part1State === 'unfinished') {
      return {
          forGetStarted: 'continue',
          forDiagnostic: {
              subject: subject,
              state: 'unfinished',
              part: 1,
              btnText: 'Continue'
          }
      };
  }
  return {
      forGetStarted: 'retake',
      forDiagnostic: {
          subject: subject,
          state: 'finished',
          part: 1,
          btnText: 'Retake'
      }
  };
}

export function getUnique(arr, comp) {
  const unique = arr
  .map(e => e[comp])
  .map((e, i, final) => final.indexOf(e) === i && i)
  .filter(e => arr[e]).map(e => arr[e]);
  return unique;
}


export const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
export const getOnlyCapitals = (string) => string.replace(/[a-z\s]/g, '');
