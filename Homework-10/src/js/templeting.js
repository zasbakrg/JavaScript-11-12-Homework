import menuData from '../menu.json';
import template from '../templates/food-item.hbs';

const refs = {
  menu: document.querySelector('.menu'),
};

buildFoodMenu(menuData, refs.menu);
function buildFoodMenu(menuData, menu) {
  menuData.map(e => {
    menu.insertAdjacentHTML('beforeend', template(e));
  });
}
