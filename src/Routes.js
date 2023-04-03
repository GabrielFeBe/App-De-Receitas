import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksDetails } />
      <Route path="/meals/:id-da-receita/in-progress" component={ MealsDetails } />
      <Route path="/drinks/:id-da-receita" component={ DrinksDetails } />
      <Route path="/meals/:id-da-receita" component={ MealsDetails } />
      <Route path="/profile" component={ Profile } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals" component={ Meals } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
