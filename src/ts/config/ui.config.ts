const ui = {
  login: {
    formLogin: document.forms[0],
    inputEmailLogin: <HTMLInputElement>document.querySelector('#emailLogin'),
    inputPasswordLogin: <HTMLInputElement>document.querySelector('#passwordLogin'),
  },
  signUp: {
    formSignUp: document.forms[1],
    inputEmailSignUp: <HTMLInputElement>document.querySelector('#emailSignUp'),
    inputPasswordSignUp: <HTMLInputElement>document.querySelector('#passwordSignUp'),
    inputNicknameSignUp: <HTMLInputElement>document.querySelector('#nicknameSignUp'),
    inputFirstNameSignUp: <HTMLInputElement>document.querySelector('#firstNameSignUp'),
    inputLastNameSignUp: <HTMLInputElement>document.querySelector('#lastNameSignUp'),
    inputPhoneSignUp: <HTMLInputElement>document.querySelector('#phoneSignUp'),
    selectGenderSignUp: <HTMLSelectElement>document.querySelector('#genderSignUp'),
    inputCountrySignUp: <HTMLInputElement>document.querySelector('#countrySignUp'),
    dataListCoutrySignUp: <HTMLDataListElement>document.querySelector('#countriesDataList'),
    selectCitySignUp: <HTMLSelectElement>document.querySelector('#citySignUp'),
    inputDateSignUp: <HTMLInputElement>document.querySelector('#dateSignUp'),
  },
  submitButton: <HTMLButtonElement>document.querySelector('.submit-btn'),
}
export default ui;