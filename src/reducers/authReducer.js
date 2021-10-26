const initialState = {
  nombre: "andres",
  nacimiento: new Date().getTime(),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
