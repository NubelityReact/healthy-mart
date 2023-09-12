// 1.- Exercise: Create a function that returns a Promise which resolves after a given number of milliseconds.
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
// 2.- Exercise: Create a function that takes an array of URLs and returns a Promise that resolves with an array of responses when all the URLs have been fetched using the fetch API.
function fetchAll(urls) {
  const requests = urls.map(url => fetch(url));
  return Promise.all(requests);
}
// 3.- Exercise: Implement a retry mechanism using Promises. Create a function that takes a function and retries executing it a given number of times if it rejects, with a delay between retries.
function retry(fn, retries, delay) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      fn()
        .then(resolve)
        .catch(error => {
          if (retries === 0) {
            reject(error);
          } else {
            retries--;
            setTimeout(attempt, delay);
          }
        });
    };

    attempt();
  });
}
// 4.- Exercise: Create a constructor function called Person that takes name and age as arguments and creates a person object with those properties.
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 5.- Exercise: Add a method to the Person prototype called introduce that logs a message introducing the person.
Person.prototype.introduce = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};
// 6.- Exercise: Create a function called mergeObjects that takes two objects as arguments and merges their properties into a new object. If there are overlapping properties, the second object should overwrite the first.
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}
// 7.- Exercise: Create a function called sumArray that takes an array of numbers and returns the sum of all the numbers.
function sumArray(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}
// 8.- Exercise: Create a function called filterArray that takes an array of numbers and a callback function. It should return a new array containing only the numbers for which the callback returns true.
function filterArray(numbers, callback) {
  return numbers.filter(callback);
}
// 9.- Exercise: Create a function called mapArray that takes an array of numbers and a callback function. It should return a new array with the result of applying the callback to each element of the original array.
function mapArray(numbers, callback) {
  return numbers.map(callback);
}
// 10.- Exercise: Create a function called findMax that takes an array of numbers and returns the largest number in the array.
function findMax(numbers) {
  return Math.max(...numbers);
}
// 11.- Exercise: Create a function called removeDuplicates that takes an array and returns a new array with duplicate elements removed.
function removeDuplicates(array) {
  return [...new Set(array)];
}
// 12.- Exercise: Create a function called shuffleArray that takes an array and returns a new array with the elements randomly shuffled.
function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
// 13.- Exercise: Create a function called sortArray that takes an array of strings and returns a new array with the strings sorted in alphabetical order.
function sortArray(array) {
  return array.slice().sort();
}
// 14.- Exercise: Create a function called flattenArray that takes a nested array and returns a new array with all the elements flattened into a single level.
function flattenArray(nestedArray) {
  return nestedArray.flat();
}
// 15.- Exercise: Create a function called countOccurrences that takes an array of values and returns an object with the count of each unique value in the array.
function countOccurrences(array) {
  const occurrences = {};
  for (const value of array) {
    occurrences[value] = occurrences[value] + 1 || 1;
  }
  return occurrences;
}