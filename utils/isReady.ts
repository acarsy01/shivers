let ready = false;

const isReady = {
  get: ((): boolean => {
    return ready;
  }),
  set: ((data: boolean): any => {
    ready = data;
  })
};

export default isReady;