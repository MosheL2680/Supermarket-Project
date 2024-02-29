import axios from "axios";
import { IProduct } from "./productsSlice";
const SERVER = "https://super-django-1.onrender.com/products"

export function fetchProducts() {
  return axios.get(SERVER)
}

export function    addProduct(prd: FormData) {
  console.log(prd);

  return axios.post(SERVER + '/', prd)
}

export function updateProduct(id: number, prd: IProduct) {

  return axios.put(SERVER + `/update/${id}`, prd)
}

export function delProducts(id: any) {
  return axios.delete(SERVER + `/delete/${id}`)
}