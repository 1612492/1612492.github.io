export function format(date: string) {
  const datestring = new Date(date).toDateString();
  const [, month, day, year] = datestring.split(' ');

  return `${month} ${day}, ${year}`;
}
