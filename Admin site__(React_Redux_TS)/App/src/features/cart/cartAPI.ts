import axios from "axios";

export function fetchProducts() {
  const SERVER = "https://super-django-1.onrender.com/products"
  return axios.get(SERVER)
}