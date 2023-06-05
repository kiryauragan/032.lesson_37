const categoriesContainer = document.querySelector(".categories");
const productsContainer = document.querySelector(".products");
const productDetailsContainer = document.querySelector(".product-detail");
const dataTable = document.getElementById("dataTable");

const categories = [
  { id: 1, name: "Спорт" },
  { id: 2, name: "Косметика" },
  { id: 3, name: "Путешествия" },
];

const products = [
  { id: 1, name: "Футболка", price: 11, categoryId: 1 },
  { id: 2, name: "Кроссовки", price: 12, categoryId: 1 },
  { id: 3, name: "Мяч", price: 13, categoryId: 1 },
  { id: 4, name: "Помада", price: 13, categoryId: 2 },
  { id: 5, name: "Крем", price: 15, categoryId: 2 },
  { id: 6, name: "Шампунь", price: 16, categoryId: 2 },
  { id: 7, name: "Рюкзак", price: 17, categoryId: 3 },
  { id: 8, name: "Палатка", price: 18, categoryId: 3 },
  { id: 9, name: "Чайник", price: 19, categoryId: 3 },
];

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryElement = document.createElement("div");
    categoryElement.innerText = category.name;
    categoryElement.addEventListener("click", () => {
      renderProducts(category.id);
    });
    categoriesContainer.appendChild(categoryElement);
  });
};

const renderProducts = (categoryId) => {
  productsContainer.innerHTML = "";
  if (!categoryId) {
    return;
  }
  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );
  filteredProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerText = product.name;
    productElement.addEventListener("click", () => {
      renderProductDetails(product);
    });
    productsContainer.appendChild(productElement);
  });
};

const renderProductDetails = (product) => {
  productDetailsContainer.innerHTML = "";
  if (!product) {
    return;
  }
  const productDetailsElement = document.createElement("div");
  productDetailsElement.innerHTML = `
        <h3>${product.name}</h3>
        <div>$ ${product.price}</div>
        <button class="btn_buy">Купить</button>
    `;
  productDetailsElement
    .querySelector(".btn_buy")
    .addEventListener("click", () => {
      showOrderForm();
    });
  productDetailsContainer.appendChild(productDetailsElement);
};

function addDataToTable() {
  let name = document.getElementById("username").value;
  let city = document.getElementById("city").value;
  let postOffice = document.getElementById("post-office").value;
  let payment = document.getElementById("payment-method").value;
  let quantity = document.getElementById("quantity").value;
  let comment = document.getElementById("comment").value;

  let table = document.getElementById("dataTable");
  let newRow = table.insertRow();
  let nameCell = newRow.insertCell();
  let cityCell = newRow.insertCell();
  let postOfficeCell = newRow.insertCell();
  let paymentCell = newRow.insertCell();
  let quantityCell = newRow.insertCell();
  let commentCell = newRow.insertCell();
  let deleteCell = newRow.insertCell();

  nameCell.innerHTML = name;
  cityCell.innerHTML = city;
  postOfficeCell.innerHTML = postOffice;
  paymentCell.innerHTML = payment;
  quantityCell.innerHTML = quantity;
  commentCell.innerHTML = comment;
  deleteCell.innerHTML = `<button class="btnDelete">Удалить</button>`;

  document.getElementById("username").value = "";
  document.getElementById("city").value = "";
  document.getElementById("post-office").value = "";
  document.getElementById("payment-method").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("comment").value = "";

  addDeleteEventListener(deleteCell);
}

function addDeleteEventListener(cell) {
  const deleteButton = cell.querySelector(".btnDelete");
  deleteButton.addEventListener("click", () => {
    const rowIndex = cell.parentNode.rowIndex;
    deleteOrder(rowIndex);
  });
}

function saveOrderToLocalStorage(order) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getOrdersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function renderOrders() {
  const orders = getOrdersFromLocalStorage();
  const table = document.getElementById("dataTable");
  table.innerHTML = "";

  orders.forEach((order) => {
    const newRow = table.insertRow();
    const nameCell = newRow.insertCell();
    const cityCell = newRow.insertCell();
    const postOfficeCell = newRow.insertCell();
    const paymentCell = newRow.insertCell();
    const quantityCell = newRow.insertCell();
    const commentCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    nameCell.innerHTML = order.username;
    cityCell.innerHTML = order.city;
    postOfficeCell.innerHTML = order.postOffice;
    paymentCell.innerHTML = order.payment;
    quantityCell.innerHTML = order.quantity;
    commentCell.innerHTML = order.comment;
    deleteCell.innerHTML = `<button class="btnDelete">Удалить</button>`;

    addDeleteEventListener(deleteCell);
  });
}

function showOrderForm() {
  const orderForm = document.querySelector(".orderForm");
  orderForm.style.display = "block";
  dataTable.style.display = "block";
  renderOrders();
}

function showOrderList() {
  const orderForm = document.querySelector(".orderForm");
  orderForm.style.display = "none";
  dataTable.style.display = "block";
  renderOrders();
}

function deleteOrder(index) {
  const orders = getOrdersFromLocalStorage();
  orders.splice(index - 1, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

document.addEventListener("DOMContentLoaded", () => {
  const myForm = document.getElementById("myForm");
  const btnOrder = document.getElementById("submit");
  const myOrdersBtn = document.createElement("button");
  myOrdersBtn.innerText = "Мои заказы";
  myOrdersBtn.addEventListener("click", showOrderList);

  document.body.insertBefore(
    myOrdersBtn,
    document.querySelector(".categories")
  );

  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const city = document.getElementById("city").value;
    const postOffice = document.getElementById("post-office").value;
    const payment = document.getElementById("payment-method").value;
    const quantity = document.getElementById("quantity").value;
    const comment = document.getElementById("comment").value;

    const order = {
      username,
      city,
      postOffice,
      payment,
      quantity,
      comment,
    };

    addDataToTable();
    saveOrderToLocalStorage(order);
    myForm.reset();
  });

  renderCategories();
  renderProducts();
  renderProductDetails();
});
