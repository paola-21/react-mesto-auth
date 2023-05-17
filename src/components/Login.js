
function Login({onRegister}) {
  return (
    <>
      <div className="login__container">
        <h2 className="login__header"> Вход</h2>
        <form className='' noValidate>
        <input className="login__input" type="email" 
          placeholder="Email" name="email" required/>
          <span className="form__input-error"></span> 

          <input className="login__input" type="text" placeholder="Пароль"  
          name="password" required minLength="8" maxLength="16"/>
          <span className="form__input-error"></span>
          <button className="form__input-button" type="submit" onClick={onRegister}>Войти</button>
        </form>
      </div>
    </>
  );
}
  
  export default Login;