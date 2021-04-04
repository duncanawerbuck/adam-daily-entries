exports.processFileContents = (data) => reduceToArrayOfDateObjects(cleanse(data));

const reduceToArrayOfDateObjects = (input) =>
  input.reduce((acc, curr, i, origArray) => {
    if (isDate(curr)) {
      const newDateGroup = { [curr]: [] };
      return [...acc, newDateGroup];
    }

    if (isTime(curr)) {
      const lastDateGroupAdded = acc[acc.length - 1];
      const [currentDateString, dateItems] = Object.entries(lastDateGroupAdded)[0];
      const newRecordForCurrentDate = curr;

      const dateObjectsWithoutCurrentDate = acc.filter(
        (d) => Object.keys(d)[0] !== currentDateString
      );
      const currentDateObject = {
        [`${currentDateString}`]: [...dateItems, newRecordForCurrentDate]
      };

      return [...dateObjectsWithoutCurrentDate, currentDateObject];
    }

    // we haven't yet decided how to handle items that aren't a valid date or time entry
    throw Error(`I don't know how to deal with this value: "${curr}"`);
  }, []);

// helper functions /////////////

const cleanse = (input) => input.filter(isNonEmptyLine).filter(trim);
const isDate = (input) => /^\d\d\/\d\d\/\d{4}$/.test(input);
const isTime = (input) => /^\d\d:\d\d$/.test(input);
const isNonEmptyLine = (input) => input !== '';
const trim = () => (input) => input.trim();
