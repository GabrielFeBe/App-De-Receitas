export const SEARCH_INPUT = 'SEARCH_INPUT';

export const searchInputAction = (payload) => ({
  type: SEARCH_INPUT,
  payload,
});

export const SEND_DATA = 'SEND_DATA';

export const sendDataAction = (payload) => ({
  type: SEND_DATA,
  payload,
});

export const REQUEST_API = 'REQUEST_API';

export const requestApi = () => ({
  type: REQUEST_API,
});

export const fetchApiIngredient = (payload) => async (dispatch) => {
  dispatch(requestApi);
  console.log(payload);
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${payload}`);
  const data = await response.json();
  dispatch(sendDataAction(data.meals));
};

export const fetchApiName = (payload) => async (dispatch) => {
  dispatch(requestApi);
  console.log(payload);
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${payload}`);
  const data = await response.json();
  dispatch(sendDataAction(data.meals));
};
