let orders = [], // имитация пустого лога заказов
    orderContent = document.querySelector('[person-order="content"]'),
    orderFull = document.querySelector('[person-order="view"]'),
    orderEmpty = document.querySelector('[person-order="empty"]');

function downloadOrdersFromBD() { /// загрузка из БД \\\
  axios({
    method: 'post',
    url: 'back/orders.php',
    data: `type=select&hash=${localStorage.getItem('hash')}`
  }).then(function (response) {
    if (response.data != 'error') {
      orders = response.data;

      if (orderContent) {
        if (orders.length === 0) viewOrderBlocks(false); // нет orders - нет представления
        else if (orders.length > 0) {
          renderAllOrders(orders);
          viewOrderBlocks(true);
        }
      }
    }
  });
}

downloadOrdersFromBD();

function viewOrderBlocks(flag) {
  orderFull.setAttribute('state', `${flag ? 'view': 'empty'}`);
  orderEmpty.setAttribute('state', `${flag ? 'empty': 'view'}`);
}

function renderAllOrders(items) { // рендер заказов в профиль
  orderContent.innerHTML = '';
  items.map((el, index) => orderContent.appendChild(renderOneOrder(el, index)));
}

function renderOneOrder(elem, i) { // шаблон
  let orderTemplate = document.getElementById('order-template').content;
  let orderElement = orderTemplate.cloneNode(true).querySelector('.person_box_order_block');

  orderElement.querySelector('[order-number]').textContent = elem.num;
  orderElement.querySelector('[order-data]').textContent = elem.data;
  orderElement.querySelector('[order-cost]').textContent = elem.total;
  orderElement.querySelector('[order-url]').setAttribute('href', `/order#${elem.id}`);

  return orderElement;
}
