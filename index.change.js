/**
 * @author Hugo Garcia
 * @description FS Code assignment.
 */

const { couldStartTrivia } = require('typescript');
const util = require('util');
// Given this object...
const data = {
  a: 'foo',
  b: 'bar',
  c: null,
  d: undefined,
  e: 0,
  f: {
    a: 'fuz',
    b: null,
    c: {
      a: 'biz',
      b: 'buz',
      c: '123',
      d: [
        {
          a: 'foo',
          b: 'bar',
          c: null,
          d: undefined,
          e: 0,
          f: false,
          g: 12,
          h: '13',
          i: {},
          j: [],
          k: [[]]
        },
        {
          a: 'foo',
          b: 'bar',
          c: null,
          d: undefined,
          e: 0
        },
        {
          a: 'foo',
          b: 'bar',
          c: null,
          d: undefined,
          e: 0,
          f: '-7',
          g: '3.14159265358979323'
        }
      ]
    }
  },
  g: 123,
  h: '456',
  i: false,
  j: {},
  k: [],
  l: [[]],
  m: '3.14159265358979323'
};

// Challenge, refactor this cleanse function so it accomplishes the following criteria
// - data is not mutated
// - all `null` and `undefined` values are omitted from the returned data tree
// - all stringified numbers are converted to numbers. Example, '123' becomes 123.

// Time Complexity : O(n)^2
const cleanse = obj => {
  if (Array.isArray(obj)) {
    //iterate in array `object`
    return obj
      .map(value => (value && typeof value === 'object') ? cleanse(value) : value) //mapping array object & check if is object to do recursive call.
      .filter(value => !(value == null)); //filter and return value if is true
  } else {
    //iterate in object as array 
    return Object.entries(obj)
      .map(([key, value]) => [key, value && typeof value === 'object' ? cleanse(value) : value]) //mapping array object 
      .reduce((a, [key, value]) => (value == null || value == undefined ? a : (a[key] = parseFloat(value) ? parseFloat(value) : value, a)), {}); //set and return new object omitting null or undefined.
  }
};

let refactored = cleanse(data);
//console.log(JSON.stringify(refactored, null, 2));
//console.log(util.inspect(refactored, false, null, true))


// Time Complexity : O(n)
function removeEmpty(obj) {
  //iterate in object
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      //remove property if is `null` or `undefined`
      delete obj[propName];
    }
    else if (typeof obj[propName] === 'object') {
      //do recursive to tho through obj
      removeEmpty(obj[propName])
    }
    else if (parseFloat(obj[propName])) {
      // return && parse numbers if value string is number
      obj[propName] = parseFloat(obj[propName]);
    }
  }

  return obj
}
//let ref = removeEmpty(data);
//console.log(util.inspect(ref, false, null, true))

