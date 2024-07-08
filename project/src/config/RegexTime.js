export function convertHoursToMilliseconds(hourString) {
    if (!hourString) {
        throw new Error('Input string is null or undefined.');
    }

    // Use regex to find all numbers in the string
    const matches = hourString.match(/\d+/);
    if (!matches) {
        throw new Error('No numbers found in the input string.');
    }

    // Convert the number string to an integer
    const hours = parseInt(matches[0], 10);

    // Calculate the corresponding milliseconds (1 hour = 3600000 milliseconds)
    const milliseconds = hours * 3600000;

    return milliseconds;
}