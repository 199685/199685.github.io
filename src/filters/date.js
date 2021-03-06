export default function (num) {
  const newDate = new Date(num * 1000);
  const year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  if (month < 10) {
    month = 0 + String(month);
  }
  if (day < 10) {
    day = 0 + String(day);
  }

  return `${year}/${month}/${day}`;
}
