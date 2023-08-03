1. Task: [link](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/eCommerce-Application/Sprints/Sprint%232.md)
2. Screenshot:
3. Deploy:
4. Done 21.08.2023 / deadline 21.08.2023
5. Score: 315 / 315

### 🖥️ Login Page Implementation (130 points - Total)

> Input Validation **(40 points)** 📝

- [ ] Implement client-side validation for the login form, including email and password fields. _(20 points)_
- [ ] Display clear error messages indicating any validation issues, such as an improperly formatted email. _(20 points)_

---

> Integration with Authentication Service **(45 points)** 🔗

- [ ] Integrate the login form with a chosen authentication service (CommerceTools) to handle user authentication. _(25 points)_
- [ ] Implement error handling for failed authentication attempts, such as incorrect email or password, and display user-friendly error messages. _(20 points)_

---

> State Management and Redirection **(30 points)** 🔄

- [ ] Redirect users to the application's main page upon successful login. _(15 points)_
- [ ] Redirect users who are already logged in to the main page if they try to access the login page. _(15 points)_

---

> Handle Authentication Token **(10 points)** 🔑

- [ ] Obtain the authentication token securely after a successful login attempt by sending a request to the token endpoint (e.g., https://auth.europe-west1.gcp.commercetools.com/oauth/project_key/customers/token), allowing for seamless user authentication across the application. _(10 points)_

---

> Navigation to Registration Page **(5 points)** ➡️

- [ ] Add a button or link on the login page that allows users to navigate to the registration page. _(5 points)_

### 🖊️ Registration Page Implementation (120 points - Total)

> Input Validation **(45 points)** 📝

- [ ] Implement client-side validation for all required fields in the registration form, such as email, password, first name, last name, date of birth, and address fields (e.g., street, city, postal code, and country) for proper use with CommerceTools. _(25 points)_
- [ ] Display clear error messages indicating any validation issues, such as an improperly formatted email or a weak password. _(20 points)_

---

> Integration with Authentication Service **(25 points)** 🔗

- [ ] Integrate the registration form with a chosen authentication service, such as commercetools, to handle user registration. _(10 points)_
- [ ] Implement error handling for failed registration attempts, and display user-friendly error messages. _(15 points)_

---

> State Management, Automatic Login, and Redirection **(15 points)** 🔄

- [ ] Redirect users to the application's main page upon successful account creation and automatic login. _(15 points)_

---

> Integration with commercetools for User Profiles and Addresses **(30 points)** 🛒

- [ ] Allow users to set a default address during registration. _(15 points)_
- [ ] Enable users to select different billing and shipping addresses or choose a single address for both billing and shipping during the registration process. _(15 points)_

---

> Navigation to Registration Page **(5 points)** ⬅️

- [ ] Add a button or link on the registration page that allows users to navigate to the login page. _(5 points)_

### 🖥️ Main Page Enhancements (10 points - Total)

> Centralized Navigation **(10 points)** 🌐

- [ ] Add links to all the functional pages of the application on the main page. These should include, but are not limited to, the login and registration pages. _(5 points)_
- [ ] Each link should redirect the user correctly to the corresponding page without any errors. _(5 points)_

### 🚦 Routing Implementation (30 points - Total)

- [ ] Implement routing for navigation between login, registration, and main pages. _(15 points)_
- [ ] Implement a 404 (Not Found) page for invalid route requests. _(15 points)_

### 🎯 Evaluation Criteria for Header (25 points - Total)

- [ ] Navigation to login and registration pages for unauthorized users. _(15 points)_
- [ ] Ability to access the main page for all users _(5 points)_
- [ ] Logout functionality for authorized users _(5 points)_
