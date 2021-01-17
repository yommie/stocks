export default function (number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}
