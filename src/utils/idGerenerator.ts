import type IProjetos from "@/interfaces/Projeto";

export const idGenerator = (projectList: IProjetos[]) : number => {
  const randomNumber = Math.random() * 1000;
  const roundedNumber = Math.round(randomNumber);
  const projectsIds = projectList.map(proj => proj.id);
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