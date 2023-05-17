import { Link } from 'react-router-dom'; 
function Register({onsetIsInfoTooltip}) {
  return (
      <div className="login__container">
        <h2 className="login__header">Регистрация</h2>
        <form className="form__login" noValidate>
        <input className="login__input" type="email" 
          placeholder="Email" name="email" required/>
          <span className="form__input-error"></span> 

          <input className="login__input" type="text" placeholder="Пароль"  
          name="password" required minLength="8" maxLength="16"/>
          <span className="form__input-error"></span>
          <button className="form__input-button" type="button" onClick={onsetIsInfoTooltip}>Зарегистрироваться</button>
        </form>
        <h2 className="login__text">Уже зарегистрированы? <Link className='login__link' to={"/sign-up"}>Войти</Link></h2>
      </div>
  );
}
  
  export default Register;