import React from 'react';
import { useLocation } from 'react-router-dom';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';

export default function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {pathname === '/meals' ? <Meals /> : <Drinks />}
    </div>
  );
}
