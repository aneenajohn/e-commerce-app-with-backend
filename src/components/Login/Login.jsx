import { Header } from "../header";
import "./Login.css";
export function Login() {
  return (
    <>
      <Header />
      <div className="inputForm">
        <div class="form">
          <input
            class="form__input email"
            type="text"
            name="email"
            required
          ></input>
          <label class="form__label">email</label>
        </div>
        <div class="form">
          <input class="form__input" type="password" required></input>
          <label class="form__label">Password</label>
        </div>
        <div class="btn__container">
          <div class="btn btn--primary login ">Login</div>
        </div>
      </div>
    </>
  );
}
