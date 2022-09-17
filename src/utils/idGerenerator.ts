export const idGenerator = (list: { id: number }[]) : number => {
  const randomNumber = Math.random() * 1000;
  const roundedNumber = Math.round(randomNumber);
  const projectsIds = list.map(item => item.id);
  if (projectsIds.includes(roundedNumber)) {
    let newRandomNumber: number;
    while (projectsIds.includes(roundedNumber)) {
      newRandomNumber = Math.round(randomNumber);
    }
    // @ts-ignore
    return newRandomNumber;
  } else {
    return roundedNumber;
  }
}