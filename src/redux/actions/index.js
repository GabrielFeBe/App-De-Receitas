import fetchDrinksRecomendations from '../../services/DrinksRecommendation';
import fetchMealsRecomendations from '../../services/MealRecommendation';

export const requestFetchDrinks = () => ({
  type: 'REQUEST_DRINKS',
});

export const requestFetchMeals = () => ({
  type: 'REQUEST_MEALS',
});

export const responseDrinksSucess = (data) => ({
  type: 'RESPONSE_SUCESS_DRINKS',
  data,
});

export const responseMealsSucess = (data) => ({
  type: 'RESPONSE_SUCESS_MEALS',
  data,
});

export const responseDrinksError = (error) => ({
  type: 'RESPONSE_ERROR_DRINKS',
  error,
});

export const responseMealsError = (error) => ({
  type: 'RESPONSE_ERROR_MEALS',
  error,
});

export function recommendationDrinks() {
  return async (dispatch) => {
    dispatch(requestFetchDrinks());
    try {
      const response = await fetchDrinksRecomendations();
      dispatch(responseDrinksSucess(response));
    } catch (error) {
      dispatch(responseDrinksError(error));
    }
  };
}

export function recommendationMeals() {
  return async (dispatch) => {
    dispatch(requestFetchMeals());
    try {
      const response = await fetchMealsRecomendations();
      dispatch(responseMealsSucess(response));
    } catch (error) {
      dispatch(responseMealsError(error));
    }
  };
}
