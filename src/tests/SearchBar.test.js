import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';
import App from '../App';

import SearchBar from '../components/SearchBar';
import fetch from '../../cypress/mocks/fetch';

const toogleSearchButtonID = 'search-top-btn';

describe('Verifica o componente "SearchBar"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('Verifica se ao ser clicado no botao de busca, o Searchbar é exibido', () => {
    const { store } = renderWithRouterAndRedux(<App />, {}, '/meals');
    console.log(store.getState());
    const toogleSearchButton = screen.getByTestId(toogleSearchButtonID);

    expect(toogleSearchButton).toBeInTheDocument();

    userEvent.click(toogleSearchButton);

    const searchBar = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('Verifica se é possivel fazer uma busca', () => {
    const { store } = renderWithRouterAndRedux(<SearchBar />, { search: { search: 'Chicken' } }, '/meals');
    console.log(store.getState());

    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });

  it('Verifica se é possivel fazer uma busca com o filtro por nome', () => {
    const { store } = renderWithRouterAndRedux(<SearchBar />, { search: { search: 'soup' } }, '/meals');

    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
    console.log(store.getState());
  });

  it('Verifica se é possivel fazer uma busca com o filtro pela primeira letra', () => {
    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'a' } }, '/meals');

    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Verifica se ao digitar mais de uma letra com o filtro de Primeira letra, é emitido um alerta', () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'ad' } }, '/meals');

    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalled();
  });
});

describe('Verifica se no caminho "/drinks" é possivel fazer buscas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('Verifica se ao ser clicado no botao de busca, o Searchbar é exibido', () => {
    renderWithRouterAndRedux(<App />, {}, '/drinks');
    console.log('test1');
    const toogleSearchButton = screen.getByTestId(toogleSearchButtonID);

    expect(toogleSearchButton).toBeInTheDocument();

    userEvent.click(toogleSearchButton);

    const searchBar = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
  it('Verifica se é possivel fazer uma busca', () => {
    console.log('test2');

    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'Light rum' } }, '/drinks');

    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });

  it('Verifica se é possivel fazer uma busca com o filtro por nome', () => {
    console.log('test3');

    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'gin' } }, '/drinks');

    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  it('Verifica se é possivel fazer uma busca com o filtro pela primeira letra', () => {
    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'a' } }, '/drinks');
    console.log('test4');

    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('Verifica se ao digitar mais de uma letra com o filtro de Primeira letra, é emitido um alerta', () => {
    console.log('test5');
    global.alert = jest.fn();

    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'ad' } }, '/drinks');

    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalled();
  });
});

describe('Verifica se ao fazer a busca e retornar apenas um resultado, o usuario é redirecionado para a paginade detalhes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('Verifica o redirecionamento', async () => {
    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'Arrabiata' } }, '/meals');

    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });
});
