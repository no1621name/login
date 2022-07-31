interface NotifyOptions {
  msg: string,
  className: string,
  timeout?: number,
}

function getContainer(): HTMLDivElement{
  return <HTMLDivElement>document.querySelector('.notify-container');
}

function alertTemplate(msg: string, className: string, index: number): string{
  return `
    <div class="alert ${className}" data-index="${index}">
      ${msg}
    </div>
  `;
}

function notifyContainerTemplate(): string{
  return `
    <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 99;"></div>
  `;
}

function createNotifycontainer(): void{
  const template = notifyContainerTemplate();
  document.body.insertAdjacentHTML('afterbegin', template);
}

function getAlertIndex(): number{
  return document.querySelectorAll('.alert').length;
}
/**
 * Function notify. Show notification message
 * @param {NotifyOptions} settings
 */
export function notify({
  msg = 'Info message',
  className = 'alert-info',
  timeout = 2000}: NotifyOptions
): void{
  if(!getContainer()){
    createNotifycontainer();
  }

  const container = getContainer();
  const index = getAlertIndex();
  const template = alertTemplate(msg, className, index);

  container.insertAdjacentHTML('beforeend', template);

  setTimeout(() => closeNotify(index), timeout);
}

export function closeNotify(index: number){
  let alert;

  if(index === undefined){
    alert = document.querySelector('.notify-container .alert');
  } else{
    alert = document.querySelector(`.notify-container .alert[data-index="${index}"]`);
  }

  if(!alert){
    console.warn('Alert not found');
    return;
  }

  const container = getContainer();
  container.removeChild(alert);
}