const initValue = {
  isError: false
};

const createErrors = items => {
  const errors = {};
  for(const key in items) {
    errors[key] = initValue;
  }
  return errors;
};

export default createErrors;
