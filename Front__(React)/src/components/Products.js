import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProdDisp from './ProdDisp'
import { Row } from 'react-bootstrap'
import Cart from './Cart'


const Products = (props) => {
    const { catID } = useParams()
    const [prods, setprods] = useState([])
    const [cart, setcart] = useState([])
    const [refresh, setrefresh] = useState(false)
    const [total, settotal] = useState(0)
    const [clearCart, setclearCart] = useState(false)
    const [paynow, setpaynow] = useState(false)
    const SERVER = 'https://super-django-1.onrender.com/products'


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));//get cart from l. storage
        storedCart && setcart(storedCart);
        if (catID) {//get prods from a specific category when theres a catId param
            axios.get(`${SERVER}/${catID}`).then((res) => setprods(res.data));
        } else {//get all prods
            axios.get(SERVER).then((res) => setprods(res.data));
        }
    }, [catID]);//upd with every catId param changes

    useEffect(() => {
        let tempTotal = 0;
        cart.forEach((item) => { tempTotal += item.price * item.amount });
        settotal(parseFloat(tempTotal.toFixed(2)));
    }, [cart, refresh]);//upd total price with every change in cart

    useEffect(() => {
        if (cart.length > 0 || clearCart) {
            localStorage.setItem('cart', JSON.stringify(cart));//save cart to l. storage
        }
    }, [cart, refresh, clearCart]);

    const buy = (item, quantity = 1, del = null) => {
        const current_prod = cart.find(prod => prod.id === item.id)
        if (del) {
            setcart(cart.filter(prod => prod.id !== current_prod.id))//remove item from cart when function was called with some 'del' var
            setclearCart(!clearCart)
        }
        if (current_prod) {
            if (current_prod.amount + quantity === 0) {
                setcart(cart.filter(prod => prod.id !== current_prod.id))//remove item from cart when amount = 0
                setclearCart(!clearCart)
            } else {
                current_prod.amount += quantity//update item mount
                setrefresh(!refresh)
            }
        } else {
            let tempItem = { desc: item.desc, id: item.id, amount: 1, img: item.img, price: item.price }
            setcart([...cart, tempItem]);//create new item in cart when dosnt exist already
        }
    }

    return (
        <div style={{ display: 'flex', marginBottom: '55px' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
                <Row xs={1} md={2} className="g-4">
                    {prods.map(prod => <ProdDisp key={prod.id} prod={prod} buy={buy} />)}
                </Row>
            </div>
            <div style={{ borderLeft: '1px solid grey', height: '100hv', margin: '0 10px' }}></div>
            <div style={{ width: '400px' }}>
                <Cart cart={cart} total={total} setcart={setcart} setclearCart={setclearCart} buy={buy} Toast={props.Toast} setpaynow={setpaynow} paynow={paynow} />
            </div>
        </div>

    )
}

export default Products