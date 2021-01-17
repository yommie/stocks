export default function (value) {
  const valueFloat = parseFloat(value);
  const sign = '$';

  const valueString = Math.abs(valueFloat).toFixed(2);

  return `${sign}${valueString}`;
}
