export const idGenerator = (): number => {
  const randomNumber = Math.random() * 1000
  return Math.round(randomNumber);
}