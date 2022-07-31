import '../scss/styles.scss';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { removeInputError, showInputError, generateCountriesDataOptions, generateCitiesOptions } from './views/form';
import { login } from './services/auth.service';
import { getNews } from './services/news.service';
import { Countries, countries } from './services/countries.service';
import { notify } from './views/notifications';
import initBoostrap from './plugins/bootstrap';
import { cities } from './services/cities.service';
import { signUp } from './services/signup.service';

let countriesList:Countries;

async function init(){
  initBoostrap();
  countriesList = await countries();
  generateCountriesDataOptions(countriesList);
}

document.addEventListener('DOMContentLoaded', init);

export type FormInput = (HTMLInputElement|HTMLSelectElement);


function formValidate(inputs: FormInput[]){
  return inputs.every((el: HTMLInputElement|HTMLSelectElement): boolean => {
    const isValidInput = validate(el);
    if(!isValidInput){
      showInputError(el);
    };
    return isValidInput;
  });
}

function removeInputErrorFactory(inputs: FormInput[]){
  inputs.forEach((el:FormInput) => el.addEventListener('focus', () =>  removeInputError(el)));
}

function addOnSubmit(form: HTMLFormElement, callback: Function){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    callback();
  })
}

//Login
const { formLogin, inputEmailLogin, inputPasswordLogin } = UI.login;
const inputsLogin = [inputEmailLogin, inputPasswordLogin];

addOnSubmit(formLogin, onSubmitLogin);

removeInputErrorFactory(inputsLogin);

async function onSubmitLogin() {
  const isValidFrom = formValidate(inputsLogin);

  if(!isValidFrom) return;

  try {
    await login(inputEmailLogin.value, inputPasswordLogin.value);
    await getNews();
    formLogin.reset();
    notify({msg: 'Login success', className: 'alert-success'})
  } catch (err) {
    notify({msg: 'Login failed', className: 'alert-danger', timeout: 5000})
  }
}

//Sign up
const {
  formSignUp,
  inputEmailSignUp,
  inputPasswordSignUp,
  inputNicknameSignUp,
  inputFirstNameSignUp,
  inputLastNameSignUp,
  inputPhoneSignUp,
  selectGenderSignUp,
  inputCountrySignUp,
  selectCitySignUp,
  inputDateSignUp,
} = UI.signUp;

const inputsSignUp = [
  inputEmailSignUp,
  inputPasswordSignUp,
  inputNicknameSignUp,
  inputFirstNameSignUp,
  inputLastNameSignUp,
  inputPhoneSignUp,
  selectGenderSignUp,
  inputCountrySignUp,
  selectCitySignUp,
  inputDateSignUp,
];

addOnSubmit(formSignUp, onSubmitSignUp);

removeInputErrorFactory(inputsSignUp);

inputCountrySignUp.addEventListener('change', async (e) => {
  const key: number = <number><unknown>Object.keys(countriesList).find((countryKey) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    };
    return countriesList[<keyof Countries><unknown>countryKey] === e.target.value;
  });
  generateCitiesOptions(await cities(key));
});

async function onSubmitSignUp() {
  const isValidFrom = formValidate(inputsSignUp);

  if(!isValidFrom) return;

  const formDataSignUp = new FormData(formSignUp);

  let requst: {[key: string]: string|number} = {};

  for(let [key, value] of formDataSignUp.entries()){
    if(key === 'date') {
      const [year, month, day] = value.toString().split('-');
      const serializeDate: {[key:string]: string} = { year, month, day };
      for(let key in serializeDate){
        requst[`date_of_birth_${key}`] = +serializeDate[key];
      }
    }
    requst[<string>key] = <string>value;
  }

  try {
    const res = await signUp(requst);
    if(!res.error){
      notify({msg: res.message, className: 'alert-dager'});
    }
    notify({msg: 'Sing up success', className: 'alert-success', timeout: 7000});
    formSignUp.reset();
  } catch (err) {
    notify({msg: 'Singingin went wrong, try later', className: 'alert-danger', timeout: 5000});
  }
}