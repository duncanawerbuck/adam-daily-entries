const { processFileContents } = require('./utils');

console.clear();

console.log(typeof cleanse);

/**
 * TODO (next):
 * - manually tidy up data
 *   - correct date typos
 *   - add missing entries so that "new box" entries have 20 or 27 entries between them
 *   - interpolate and extract "new box started" entries to separate file
 *   - extract purchase dates/amounts to separate file
 * TODO (later):
 * - convert dates and times to UTC timestamps
 * - Data validation
 *   - better regexes for dates/times, e.g. we consider 99:99 to be a valid time
 * - spit out initial report showing all bad values (we'd rather have our initial data be as
 *   clean/simple as possible)
 */
const fileContents = require('fs').readFileSync('./data.txt', 'utf8');
const linesFromFile = fileContents.split('\n');

const result = processFileContents(linesFromFile);

console.log(result);

/**
Iteration 0
[]

Iteration 1
[{ '31/01/2020': [] }]

Iteration 2
[{ '31/01/2020': ['10:00'] }]

Iteration 3
[{ '31/01/2020': ['10:00', '11:00'] }]

Iteration 4
[{ '31/01/2020': ['10:00', '11:00', 'a12:00'] }]

Iteration 5
[{ '31/01/2020': ['10:00', '11:00', 'a12:00', '13:00b'] }]

Iteration 6 - it's a blank row, which we won't add
[{ '31/01/2020': ['10:00', '11:00', 'a12:00', '13:00b'] }]

Iteration 7
[
  { '31/01/2020': ['10:00', '11:00', 'a12:00', '13:00b'], }
  { '01/02/2020': ['10:00', '11:00', 'a12:00', '13:00b'], }
]

 */
