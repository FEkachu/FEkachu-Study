// const wait = (ms) => {
//   const start = Date.now();
//   let now = start;
//   while (now - start < ms) {
//     now = Date.now();
//   }
// }

const getDivisors = (n) => {
  const divisorsList = [];
  for (let i = 1; i < n ** (1 / 2) + 1; i ++) {
    if (n % i === 0) {
      divisorsList.push(i)
      if ((i ** 2) !== n) {
        divisorsList.push(n / i)
      }
    }
  }
  const answerList = new Set(divisorsList);
  return [...answerList].length;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const resolveAfter3Seconds = async () => {
  await delay(3000);
  return await getDivisors(1000000000);
}

console.time('Performance');
resolveAfter3Seconds()
  .then((res) => console.log(res))
  .then(() => console.timeEnd('Performance'));
