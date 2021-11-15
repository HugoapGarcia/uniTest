/**
 * 
 * @param {*} array 
 * @returns array of vowels
 */
function vowel(array) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return array.filter((item, i) => {
    if (vowels.includes(item)) {
      return item;
    }
  })
}


/**
 * 
 * @param {*} string 
 * @returns object of characters
 */
function getCharMap(string) {
  let charMap = {}
  for (let char of string) {
    charMap[char] = charMap[char] + 1 || 1
  }
  return charMap
}



module.exports = {
  exampleFunction: function (message) { return message; },



  /**
   * 
   * @param  {...any} a 
   * @returns {*} number 
   * @description "sum" function can add two arguments.
   */
  sum: function (...a) {
    let sum = 0;
    a.forEach((item) => {
      sum += item;
    });
    return sum;
  },



  /**
   * 
   * @param {*} array 
   * @returns {*} array
   * @description "vowelize" should return (vowels are “a”, “e”, “i”, “o”, and “u”).
   */
  vowelize: function (array) {
    let totalChart = [];
    for (let i = 0; i < array.length; i++) {

      let _vowels = vowel(array[i].split('')).join('') !== [] ? vowel(array[i].split('')).join('') : false;

      if (_vowels) {
        totalChart.push(_vowels)
      }

    }
    return totalChart;
  },



  /**
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {*} array
   * @description "combineAndSort" function, which should combine and alphabetize.
   */
  combineAndSort: function (a, b) {
    let newArray = a.concat(b);
    return newArray.sort();
  },



  /**
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {*} boolean
   * @description "anagramTester" function (an anagram is a word with the letters rearranged)
   */
  anagramTester: function (a, b) {
    a = a.replace(/[^\w]/g, "").toLowerCase();
    b = b.replace(/[^\w]/g, "").toLowerCase();

    const chartMapA = getCharMap(a);
    const chartMapB = getCharMap(b);

    for (let char in chartMapA) {
      if (chartMapA[char] !== chartMapB[char]) {
        return false
      }
    }

    return true
  },



  /**
   * 
   * @param {*} obj 
   * @param {*} callback 
   * @description Writen our own version of objectForEach(), which should take an object and a
   * callback function and invoke the callback on each key,value pair in the passed
   * object
   */
  objectForEach: function (obj, callback) {
    for (let i in obj) {
      callback(obj[i])
    }
  },



  /**
   * 
   * @param {*} root 
   * @param {*} path 
   * @param {*} newVal 
   * @returns {*} object
   * @description Write a updateAtPath(root, path, newVal) function that sets a value at a dotted path inside an object
   */
  updateAtPath: function (root, path, newVal) {
    //console.log(root, ' ', path, ' ', newVal)
    let segments = path.split('.');
    let cursor = root;

    for (var i = 0; i < segments.length - 1; ++i) {
      cursor = cursor[segments[i]] || {};
    }

    cursor[segments[segments.length - 1]] = newVal;
    //console.log(cursor)
    return cursor;
  },



  /**
   * Test new Class "Car" that initiates with "initialFuelLevel" and "fuelCapacity"
   * The "Car" can be filled with any number of gas, but no more than its tank size
   */
  Car: class {
    initialFuelLevel = 0;
    fuelCapacity = 0;

    constructor(vehicle) {
      this.initialFuelLevel = vehicle.initialFuelLevel;
      this.fuelCapacity = vehicle.fuelCapacity
    }
    addFuel(fuel) {
      let currrentFuelLever = this.initialFuelLevel + fuel;
      if (currrentFuelLever < this.fuelCapacity) {
        this.initialFuelLevel = currrentFuelLever;
      } else {
        this.initialFuelLevel = this.fuelCapacity;
      }


    }
    getFuelLevel() {
      return this.initialFuelLevel;
    }
  },



  /**
   * 
   * @param {*} param 
   * @returns {*} array
   * @description "whatWouldYouLikeToCheckOut" function that accepts a library api.
   * the library api has methods for `favoriteAuthors` and `booksAvailableBy`.
   * return a list of all books available by one of your favorite authors
   */
  whatWouldYouLikeToCheckOut: function (param) {
    let books = [];

    function sleep(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    return param.favoriteAuthors().then((arr) => {
      arr.filter(async (value, i) => {
        await param.booksAvailableBy(value).then(b => {
          for (let i of b) {
            return books.push(i.title)
          }
        })
      })

      return sleep(10).then(() => books)
    })

  },



  /**
   * 
   * @param {*} x 
   * @returns {*} number
   * @description The "calc" function which will allow the following to work:
   * calc(10)('+')(12) >> 22
   * calc(90)('-')(10) >> 80
   * 
   * @notes calling outer and inner fuction.
   */
  calc: function (x) {
    let outerValue = x;

    function operator(y) {
      let innerSymbolValue = y;

      function sum(z) {
        let innerNumberValue = z;
        //The eval function takes a string and then returns the value of that string considered as a math operation
        return eval(`${outerValue} ${innerSymbolValue} ${innerNumberValue}`)
      }

      return sum;
    }

    //return sum base on params
    return operator;
  }

}
