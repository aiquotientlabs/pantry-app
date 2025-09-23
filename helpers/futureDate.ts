export default function futureDate(daysAhead: number) {
  const today = new Date();
  const daysLater = new Date(today);
  daysLater.setDate(today.getDate() + daysAhead);
  const DLmonth = (daysLater.getMonth() + 1).toString().padStart(2, '0');
  const DLday = daysLater.getDate().toString().padStart(2, '0');
  const DLyear = daysLater.getFullYear().toString();
  const DLdate = `${DLmonth}/${DLday}/${DLyear}`;
  return DLdate;
}