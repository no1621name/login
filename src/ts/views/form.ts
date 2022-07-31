import UI from '../config/ui.config';
import { FormInput } from '../app';
import { Countries } from '../services/countries.service';
const { submitButton } = UI;
const { dataListCoutrySignUp, selectCitySignUp } = UI.signUp;

function inputErrorTemplate(msg: string): string{
  return `
    <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 * Function showInputError. Add input error
 * @param {HTMLInputElement} el
*/
export function showInputError(el: FormInput): void{
  const parent = el.parentElement;

  if(parent!.querySelector('.invalid-feedback')) return

  const msg = el.dataset.invalidMessage || 'Invalid input';
  const template = inputErrorTemplate(msg);
  el.classList.add('is-invalid');
  parent!.insertAdjacentHTML('beforeend', template);
  submitButton.disabled = true;
}
/**
 * Function removeInputError. Add remove error
 * @param {HTMLInputElement} el
*/
export function removeInputError(el: FormInput): void{
  const parent = el.parentElement;
  const err = <HTMLDivElement|null>parent!.querySelector('.invalid-feedback');
  if(!err){
    return;
  }
  el.classList.remove('is-invalid');
  parent?.removeChild(err);
  submitButton.disabled = false;
}


export function generateCountriesDataOptions(list: Countries): void{
  Object.values(list).forEach((country: string) => {
    const template = `
      <option value="${country}"></option>
    `;
    dataListCoutrySignUp.insertAdjacentHTML('beforeend', template);
  });
}

export function generateCitiesOptions(list: string[]): void{
  if(selectCitySignUp.disabled) selectCitySignUp.disabled = false;
  list.forEach((city: string) => {
    const template = `
      <option value="${city}">${city}</option>
    `;
    selectCitySignUp.insertAdjacentHTML('beforeend', template);
  });
}