const millisecondsToMinutesAndSeconds = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} minutes and ${seconds} seconds`;
}
export default millisecondsToMinutesAndSeconds;