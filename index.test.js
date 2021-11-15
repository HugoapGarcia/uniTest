const { expect, assert } = require('chai');
const Index = require('./index');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

describe('Index', () => {
  // Call an example function, to demonstrate overall structure
  it('Example', () => {
    expect(Index.exampleFunction('test')).to.equal('test');
  });

  // Test that "sum" function can add two arguments
  it('sum works on two arguments', () => {
    expect(Index.sum(3, 4)).to.equal(7);
    expect(Index.sum(-15, 5)).to.equal(-10);
    expect(Index.sum(-30.5, 45.5)).to.equal(15);
  });

  // Test that same "sum" function can add any number of arguments
  it('sum works on many arguments', () => {
    expect(Index.sum(4, 5, 6)).to.equal(15);
    expect(Index.sum(1,2,3,4,5,6,7,8,9,10)).to.equal(55);
    expect(Index.sum(-5,-4,-3,-2,-1,0,1,2,3,4,5)).to.equal(0);
  });

  // Test that same "sum" function understands corner cases
  it('sum works on a single argument, or zero args', () => {
    expect(Index.sum(12)).to.equal(12);
    expect(Index.sum()).to.equal(0);
  });

  // test the function "vowelize" (vowels are “a”, “e”, “i”, “o”, and “u”)
  it('the vowelize function', () => {
    expect(Index.vowelize(['cornhole', 'waistcoat', 'tumblr'])).to.deep.equal(['ooe', 'aioa', 'u']);
    expect(Index.vowelize(['bacon', 'ham', 'pork'])).to.deep.equal(['ao', 'a', 'o']);
  });

  // should return nothing for words without vowels
  it('the vowelize function for words without vowels', () => {
    expect(Index.vowelize(['sky', 'rhythm', 'nymph'])).to.deep.equal([]);
  });

  // test the "combineAndSort" function, which should combine and alphabetize
  it('combineAndSort function', () => {
    expect(Index.combineAndSort(['kiwi', 'apple', 'banana'], ['orange', 'coconut'])).to.deep.equal(['apple', 'banana', 'coconut', 'kiwi', 'orange']);
    expect(Index.combineAndSort([], ['zucchini', 'cauliflower'])).to.deep.equal(['cauliflower', 'zucchini']);
    expect(Index.combineAndSort(['beta', 'alpha'], [])).to.deep.equal(['alpha', 'beta']);
    expect(Index.combineAndSort([], [])).to.deep.equal([]);

  });

  it('don\'t modify combineAndSort arguments', () => {
    const arr1 = ['kombucha', 'scooter', 'snowboard'];
    const arr2 = ['macbook', 'iphone', 'airpods'];
    Index.combineAndSort(arr1, arr2);

    expect(arr1).to.deep.equal(['kombucha', 'scooter', 'snowboard']);
    expect(arr2).to.deep.equal(['macbook', 'iphone', 'airpods']);
  });


  // test the "anagramTester" function (an anagram is a word with the letters rearranged)
  it('anagramTester function for two words', () => {
    expect(Index.anagramTester('stressed', 'desserts')).to.equal(true);
    expect(Index.anagramTester('The Morse code', 'Here come dots')).to.equal(true);
    expect(Index.anagramTester('hipster', 'mustache')).to.equal(false);
    expect(Index.anagramTester('O Draconian devil', 'Leonardo da Vinci')).to.equal(true);
    expect(Index.anagramTester('the eyes', 'hey tess')).to.equal(false);
  });

  // Write our own version of objectForEach(), which should take an object and a
  // callback function and invoke the callback on each key,value pair in the passed
  // object
  it('objectForEach', () => {
    const squares = {
      'one': 1,
      'two': 4,
      'three': 9,
      'four': 16,
      'five': 25,
    };

    let sumOfSquares = 0;
    Index.objectForEach(squares, (value) => {
      sumOfSquares += value;
    });

    expect(sumOfSquares).to.equal(1 + 4 + 9 + 16 + 25);
  });

  // Write a updateAtPath(root, path, newVal) function that sets a value at a dotted path inside an object
  it('updateAtPath works on a nested object with dotted path', () => {
    const obj = {
      student123: {
        gpa: {
          inMajor: 3.5,
          total: 3.2,
        },
        birthday: '1997-02-21',
      },
      student124: {
        gpa: {
          inMajor: 3.6,
          total: 3.4,
        },
        birthday: '1998-04-12',
      },
    };

    Index.updateAtPath(obj, 'student123.gpa.inMajor', 3.55);
    expect(obj.student123.gpa.inMajor).to.equal(3.55);
    expect(obj.student124.gpa.inMajor).to.equal(3.6); // other student unchanged
    expect(obj.student123.gpa.total).to.equal(3.2); // other gpa unchanged
  });

  it('updateAtPath works with different path depths', () => {
    const obj = {
      student123: {
        gpa: {
          inMajor: 3.5,
          total: 3.2,
        },
        birthday: '1997-02-21',
      },
      student124: {
        gpa: {
          inMajor: 3.6,
          total: 3.4,
        },
        birthday: '1998-04-12',
      },
    };

    Index.updateAtPath(obj, 'student123.gpa.inMajor', 3.55);
    expect(obj.student123.gpa.inMajor).to.equal(3.55);
    expect(obj.student124.gpa.inMajor).to.equal(3.6); // other student unchanged
    expect(obj.student123.gpa.total).to.equal(3.2); // other gpa unchanged

    Index.updateAtPath(obj, 'student123.birthday', '1999-12-25');
    expect(obj.student123.birthday).to.equal('1999-12-25');
    expect(obj.student124.birthday).to.equal('1998-04-12'); // other student unchanged

    Index.updateAtPath(obj, 'teacher', { birthday: '1980-05-25' });
    expect(obj.teacher).to.deep.equal({ birthday: '1980-05-25' });
  });

  // Test new Class "Car" that initiates with "initialFuelLevel" and "fuelCapacity"
  // The "Car" can be filled with any number of gas, but no more than its tank size
  it('Car cannot be filled beyond capacity', () => {
    const camry = new Index.Car({ initialFuelLevel: 4.25, fuelCapacity: 13 });
    expect(camry.getFuelLevel()).to.equal(4.25);
    camry.addFuel(6);
    expect(camry.getFuelLevel()).to.equal(10.25);
    camry.addFuel(10);
    expect(camry.getFuelLevel()).to.equal(13);
  });

  // Make a "whatWouldYouLikeToCheckOut" function that accepts a library api.
  // the library api has methods for `favoriteAuthors` and `booksAvailableBy`.
  // return a list of all books available by one of your favorite authors
  it('Promises', async () => {
    const books = [
      { author: 'Barbara Kingsolver', title: 'The Poisonwood Bible' },
      { author: 'Dr Seuss', title: 'The Lorax' },
      { author: 'Hugh Howey', title: 'Wool' },
    ]
    const libraryApi = {
      favoriteAuthors() {
        return sleep(10).then(() => ([
          'Barbara Kingsolver',
          'Mary Doria Russell',
          'Vernor Vinge',
          'Hugh Howey',
        ]));
      },
      booksAvailableBy(author) { 
        return sleep(10).then(() => books.filter(b => b.author === author));
      }
    };
    const start = new Date();
    const titles = await Index.whatWouldYouLikeToCheckOut(libraryApi);
    expect(titles).to.deep.equal(['The Poisonwood Bible', 'Wool']);
    if (new Date() - start > 30) {
      assert.fail("correct answer, but took too long");
    }
  });

  // Test the "calc" function which will allow the following to work:
  // calc(10)('+')(12) >> 22
  // calc(90)('-')(10) >> 80
  it('the calc function', () => {
    expect(Index.calc(10)('+')(12)).to.equal(22);
    expect(Index.calc(90)('-')(10)).to.equal(80);
  });
});
