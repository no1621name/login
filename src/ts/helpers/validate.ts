import {FormInput} from '../app';

interface RegExpDic {
  [key: string]: RegExp
}

const regExpDic: RegExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{4,}$/,
  date: /^\d{4}\-\d{2}\-\d{2}$/,
  textInfo: /^\w{1,}$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  select: /\S{1,}/
}

/**
 * Function validete. Check input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} Return true if input valid or doesn't has data-required attr
 */
export function validate(el: FormInput): boolean {
  const regExpName = <keyof RegExpDic>el.dataset.required;

  if(!regExpDic[regExpName]) return true

  return regExpDic[regExpName].test(el.value.trim());
}