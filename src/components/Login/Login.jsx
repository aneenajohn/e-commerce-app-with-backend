import { Header } from "../header";

import "./Login.css";
export function Login() {
  return (
    <>
      <Header />
      <div className="inputForm">
        <div className="box">
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
            <label class="form__label">password</label>
          </div>
          <div class="btn__container">
            <div class="btn btn--primary login ">Login</div>
          </div>
          <p className="para">
            New to Lingokart? <span className="signup">SignUp</span>
          </p>
        </div>
      </div>
    </>
  );
}
