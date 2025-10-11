import { CartContext } from "@/context/CartContext";
import { Card, Flex, Text, Button, Image } from "@chakra-ui/react"
import { useContext } from "react";
import { useNavigate } from "react-router";
import './ItemListContainer.css'

const ItemListContainer = ({title, products}) => {
    const navigate=useNavigate();
    const{addToCart}=useContext(CartContext)

    return(
        <>
        <h1 className="heading">{title}</h1>
        <Flex className="product-cards-container">
        { products.map((product)=>(
            <Card.Root key={product.id} variant={'elevated'} width="15rem" overflow="hidden" >
            <Image maxHeight='19rem' onClick={()=>navigate(`/product/${product.id}`)} cursor='pointer'
                src={product.images[0]}
                alt={product.description}
            />
            <Card.Body gap="1">
                <Card.Title>{product.title}</Card.Title>
                <Text textStyle="2xl" fontWeight="medium" mt="2">
                ${product.price}
                </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button className="linen-btn" variant="solid" size='md' onClick={()=>{addToCart({product})}}>Agregar al carrito</Button>
            </Card.Footer>
            </Card.Root>
        )) }
        </Flex>
        </>
    )
}

export default ItemListContainer