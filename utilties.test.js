const utilities = require('./utilities');

test('A correct start and end date format is generated', () => {

    //notice the hardcoding of year - this would need to be changed in the real world to avoid a yearly breakage of tests
    //additionally, we'd add a specific leap year test
    expect(utilities.getFormattedDateRange(1)).toBe('20240101/20240131');
    expect(utilities.getFormattedDateRange(9)).toBe('20240901/20240930');

    //test the error situation -> https://medium.com/@afolabiwaheed/how-to-test-a-function-thats-expected-to-throw-error-in-jest-2419cc7c6462
    expect(() => { utilities.getFormattedDateRange('foobar')}).toThrow('The value foobar is not a valid month');
   
});

test('A valid month can be determined', () => {

    //notice the hardcoding of year - this would need to be changed in the real world to avoid a yearly breakage of tests
    //additionally, we'd add a specific leap year test
    expect(utilities.isValidMonth('foo')).toBe(false);
    expect(utilities.isValidMonth()).toBe(false);
    expect(utilities.isValidMonth(1)).toBe(true);
    expect(utilities.isValidMonth(12)).toBe(true);
    expect(utilities.isValidMonth(100)).toBe(false);
});


