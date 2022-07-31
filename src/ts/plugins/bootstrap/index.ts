import { Tab } from 'bootstrap';

export default function() {
  const triggerTabList = document.querySelectorAll('#tabsNav button')
  triggerTabList.forEach(triggerEl => {
    const tabTrigger = new Tab(triggerEl);

    triggerEl.addEventListener('click', event => {
      event.preventDefault()
      tabTrigger.show()
    });
  });
}