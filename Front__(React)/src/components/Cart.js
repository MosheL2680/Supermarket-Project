import axios from 'axios'
import React, { useContext } from 'react'
import { Button, CardSubtitle, CardText, ListGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FaShekelSign } from 'react-icons/fa';
import Pay from './PayPal';
import { Context } from '../App';


const Cart = (props) => {
    const SERVER = 'https://super-django-1.onrender.com'
    const { tokenvalue } = useContext(Context)
    const [tokenData] = tokenvalue


    const CheckOut = () => {
        if (props.cart.length === 0) {
            toast('cart is empty')
            return
        }
        toast.promise(
            axios.post(SERVER + '/checkout', { cart: props.cart }, { headers: tokenData })
                .then((res) => {
                    props.setpaynow(true)
                    props.setcart([]);
                    props.setclearCart(true);
                    toast.success('Checkout successful! 👌 receipt sent to your email')
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        toast.error('Unauthorized: Please log in.')
                    } else {
                        console.error('Error during checkout:', error);
                        toast.error('Error during checkout 🤯')
                    }
                }),
            { pending: 'Processing checkout...', }
        );
    };

    if (props.paynow) {
        return (
            <div>
                <Pay total={props.total} />
                <Button onClick={() => props.setpaynow(false)}>Exit</Button>
            </div>
        );
    }
    else return (
        <div>
            <div style={{ display: 'flex', backgroundColor: 'rgb(100, 202, 202)', padding: '10px', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '2em' }} />
                <h3 style={{ marginLeft: '10px', fontSize: '1.5em' }}>Your cart ({props.cart.length})</h3>
                <Button className='bg-success' style={{ marginLeft: 'auto', fontSize: '1.2em' }} onClick={() => CheckOut()}>
                    {'CheckOut '}<span style={{ fontWeight: 'bolder' }}><FaShekelSign style={{ fontSize: '13px' }} />{props.total}</span>
                </Button>
            </div>

            <ListGroup>
                {props.cart.map(item => (
                    <ListGroup.Item style={{ marginTop: '10px', position: 'relative' }}
                        className="d-flex justify-content-between align-items-start"
                        key={item.id}
                    >
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            style={{ position: 'absolute', top: '0', left: '0', zIndex: '1' }}
                            onClick={() => props.buy(item, -1, 1)}
                        >
                            X
                        </button>
                        <img src={SERVER + item.img} alt={`Thumbnail for ${item.desc}`} style={{ width: '50px', marginRight: '10px' }} />
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.desc}</div>
                            <Button className='bg-success' onClick={() => props.buy(item, -1)}>-</Button>
                            Amount: {item.amount}
                            <Button className='bg-success' onClick={() => props.buy(item)}>+</Button>
                        </div>
                        <CardText style={{ color: 'blue', fontWeight: 'bolder', position: 'absolute', right: '25px ', bottom: '27px' }}>
                            <span style={{ color: 'blue', fontWeight: 'bolder' }}><FaShekelSign style={{ fontSize: '11px' }} />{parseFloat((item.price * item.amount).toFixed(2))}</span>
                        </CardText>
                        {item.amount > 1 && <CardSubtitle style={{ position: 'absolute', bottom: '15px', right: '25px', fontSize: '12px' }}>
                            <span style={{ color: 'blue', fontWeight: 'bolder' }}><FaShekelSign style={{ fontSize: '9px' }} />{item.price}</span> each
                        </CardSubtitle>}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default Cart