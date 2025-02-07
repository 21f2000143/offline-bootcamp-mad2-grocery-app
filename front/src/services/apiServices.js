const API_BASE = 'http://127.0.0.1:5000';

function getHeader() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  };
}

async function addCategory(name) {
  return await fetch(`${API_BASE}/add/cat`, {
    method: 'POST',
    credentials: 'include',
    headers: getHeader(),
    body: JSON.stringify({ name })
  }).then(handleResponse);
}

async function addProduct(name, quantity, manufacture, expiry, rpu, unit, description, image, category_id) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('quantity', quantity);
  formData.append('manufacture', manufacture);
  formData.append('expiry', expiry);
  formData.append('rpu', rpu);
  formData.append('unit', unit);
  formData.append('description', description);
  formData.append('image', image);
  formData.append('category_id', category_id);
  return await fetch(`${API_BASE}/add/product`, {
    method: 'POST',
    credentials: 'include',
    headers: getHeader(),
    body: formData
  }).then(handleResponse);
}
async function fetchCategory(id) {
  return await fetch(`${API_BASE}/update/category/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function updateCategory(id, name) {
  return await fetch(`${API_BASE}/update/category/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getHeader(),
    body: JSON.stringify({ name })
  }).then(handleResponse);
}

async function fetchProduct(id) {
  return await fetch(`${API_BASE}/update/product/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function updateProduct(id, name, quantity, manufacture, expiry, rpu, unit, description, image, category_id) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('quantity', quantity);
  formData.append('manufacture', manufacture);
  formData.append('expiry', expiry);
  formData.append('rpu', rpu);
  formData.append('unit', unit);
  formData.append('description', description);
  formData.append('image', image);
  formData.append('category_id', category_id);
  return await fetch(`${API_BASE}/update/product/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getHeader(),
    body: formData
  }).then(handleResponse);
}

async function deleteCategory(id) {
  return await fetch(`${API_BASE}/update/category/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function deleteProduct(id) {
  return await fetch(`${API_BASE}/update/product/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchOreders() {
  return await fetch(`${API_BASE}/get/orders`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchCartItems() {
  return await fetch(`${API_BASE}/get/cart/items`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchProducts() {
  return await fetch(`${API_BASE}/get/products`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchAuthUser() {
  return await fetch(`${API_BASE}/auth/user`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchManagers() {
  return await fetch(`${API_BASE}/get/managers`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchNoti() {
  return await fetch(`${API_BASE}/get/all/noti`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function fetchCategories() {
  return await fetch(`${API_BASE}/get/categories`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function increaseQuantity(id) {
  return await fetch(`${API_BASE}/cart/item/increment/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function removeItem(id) {
  return await fetch(`${API_BASE}/cart/item/remove/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function payAndConfirm() {
  return await fetch(`${API_BASE}/cart/items/buy`, {
    method: 'POST',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}
async function deleteManager(id) {
  return await fetch(`${API_BASE}/delete/manager/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function decline(id) {
  return await fetch(`${API_BASE}/decline/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function approve(id) {
  return await fetch(`${API_BASE}/approve/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function rate(id, value) {
  return await fetch(`${API_BASE}/update/order/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getHeader(),
    body: JSON.stringify({ 'value': value })
  }).then(handleResponse);
}

async function fetchWarnings() {
  return await fetch(`${API_BASE}/send/alert`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

async function sendWarning() {
  return await fetch(`${API_BASE}/send/alert`, {
    method: 'POST',
    credentials: 'include',
    headers: getHeader()
  }).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return response.json().then(err => { throw new Error(err.msg); });
  }
  return response.json();
}

export {
  addCategory,
  addProduct,
  fetchCategory,
  updateCategory,
  deleteCategory,
  fetchProduct,
  updateProduct,
  deleteProduct,
  fetchOreders, // actions start here
  fetchCartItems,
  fetchProducts,
  fetchAuthUser,
  fetchManagers,
  fetchNoti,
  fetchCategories,
  increaseQuantity,
  removeItem,
  payAndConfirm,
  deleteManager,
  decline,
  approve,
  fetchWarnings,
  sendWarning,
  rate
};
