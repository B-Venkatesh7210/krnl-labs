let counter = 0;

export const getCounter = () => counter;
export const increaseCounter = () => {
  counter += 1;
  return counter;
};
