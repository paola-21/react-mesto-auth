import React from 'react';
import { Link } from 'react-router-dom';
import * as apiAuth from '../utils/apiAuth.js';


function Register({onRegister}) {

const [formValue, setFormValue] = React.useState({
  email: '',
  password: '',
})


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValue({
    ...formValue,
    [name]: value
  });
}

const handleSubmit = (e) => {
  e.preventDefault();
  const { email, password } = formValue;

  onRegister(email, password);
}

// onClick={onRegister} required minLength="4" maxLength="16"

  return (
      <div className="login__container">
        <h2 className="login__header">Регистрация</h2>
        <form className="form__login" onSubmit={handleSubmit} noValidate>
        <input className="login__input" type="email"
          placeholder="Email" name="email" autoComplete="email" onChange={handleChange} value={formValue.email} required />
          <span className="form__input-error"></span> 

          <input className="login__input" type="password" placeholder="Пароль"  
          name="password"  autoComplete="new-password" onChange={handleChange} value={formValue.password}/>
          <span className="form__input-error"></span>
          <button className="form__input-button" type="submit">Зарегистрироваться</button>
        </form>
        <h2 className="login__text">Уже зарегистрированы? <Link className='login__link' to={"/sign-in"}>Войти</Link></h2>
      </div>
  );
}
  
  export default Register;