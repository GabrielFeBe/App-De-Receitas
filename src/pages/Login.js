import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import tomate from '../svg/tomate.svg';
import logo from '../svg/logo.svg';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const history = useHistory();

  const validateEmail = () => {
    const number = 6;
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    return regex.test(emailInput) && passwordInput.length > number;
  };

  const handleClick = () => {
    const obj = { email: emailInput };

    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/meals');
  };

  return (
    <>
      {/* expect to use the same properties since i'm doing a overwrite in case the dvh is available */}
      <header
        className="h-[50vh] h-[50dvh] relative bg-[#41197F]
      flex justify-center"
      >
        <img
          src={ logo }
          alt="Logo"
          className="h-[157.25px] w-[198px] mt-[79.17px]"
        />
        <img
          src={ tomate }
          alt="Tomate"
          className="absolute h-[279px] w-[458px] bottom-[-110px]"
        />
      </header>
      <main className="h-[50vh] h-[50dvh] flex items-center justify-center">

        <form action="" className="flex flex-col gap-[9px]">

          <input
            data-testid="email-input"
            type="text"
            value={ emailInput }
            onChange={ ({ target }) => setEmailInput(target.value) }
            placeholder="Email"
            className="w-[276px] h-[40px] rounded-[5px] pl-[20px] pt-[14px] pb-[12px]
           text-[14px] leading-[14.35px] placeholder:text-[#41197F]
          border-[#41197F] text-[#41197F] border-2 outline-none"
          />
          <input
            data-testid="password-input"
            type="password"
            value={ passwordInput }
            placeholder="Password"
            onChange={ ({ target }) => setPasswordInput(target.value) }
            className="w-[276px] h-[40px] rounded-[5px] pl-[20px] pt-[14px] pb-[12px]
          text-[14px] leading-[14.35px] placeholder:text-[#41197F]
         border-[#41197F] text-[#41197F] border-2 outline-none"

          />
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ !validateEmail() }
            onClick={ handleClick }
            className="w-[276px] h-[40px] rounded-[5px] bg-[#FCC436]
         text-[#fff] font-bold text-[14px] leading-[14.35px] text-center"
          >
            ENTER
          </button>
        </form>
      </main>

    </>
  );
}

export default Login;
