import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import './CartItem.css' 
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";


const CartItem=()=>{
    const {cart, addToCart, decreaseQty,getTotalPrice}=useContext(CartContext);
    const totalPrice=getTotalPrice();

    const navigate=useNavigate()
    

    return(
      <Flex className="shopping-cart-summary" >
        <Heading size='xl'>CART DETAIL</Heading>
        <table className="items-table">
          <thead>
          <tr>
            <th>PRODUCT</th>
            <th></th>
            <th>TOTAL</th>
          </tr>
          </thead>
          <tbody>
          {cart.map((product)=>(
            <tr key={product.id}>
              <td><img src={product.images[0]} alt={product.description}/></td>
              <td>
                <div className="items-details">
                    <b>{product.title}</b> 
                    <p>${product.price} u</p>
                    <div className="qty-input-bin-button">
                        <div className="qty-input">
                            <button onClick={()=>decreaseQty({product})}>-</button>
                            <p>{product.quantity}</p>
                            <button onClick={()=>addToCart({product})}>+</button>
                        </div>
                    </div>
                </div>
              </td>
              <td>${product.price*product.quantity}</td>
            </tr>
          ))}
          </tbody>
          <tfoot><tr>
            <th colSpan={3}>Total: ${totalPrice}</th>
            </tr>
          </tfoot>
          
        </table>
        <Button variant='outline' className="linen-btn" onClick={()=>{navigate('/checkout')}}>Checkout</Button>
      </Flex>
    )
}

export default CartItem;