import { CartContext } from "@/context/CartContext";
import { Image, Text, Button, Card, Box, Badge, HStack, Flex } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import './ItemContainer.css'

const ItemContainer=({product})=>{
    const [i, setI]=useState(0);
    const {addToCart}=useContext(CartContext);
    return(
         <Card.Root key={product.id} variant={'elevated'}  maxW="xl" className="product-card">
            <Flex>
                <button onClick={()=>{i==0 ? setI(product.images.length-1) : setI(i-1)}}><IoIosArrowBack className={product.images.length>1 ? 'arrows-enabled' : 'arrows-disabled'}/></button>
                <Image 
                    src={product.images[i]}
                    alt={product.description}
                />
                <button onClick={()=>{i<product.images.length-1 ? setI(i+1) : setI(0)}}><IoIosArrowForward className={product.images.length>1 ? 'arrows-enabled' : 'arrows-disabled'}/></button>
            </Flex>
            <Flex className='product-card-body'>
                <Card.Body gap="2">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Description>{product.description}</Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" mt="2">
                    ${product.price}
                    </Text>
                </Card.Body>
                <Card.Footer gap="2" >
                    <Button className="linen-btn" variant="solid" size='md' onClick={()=>{addToCart({product})}}>Agregar al carrito</Button>
                </Card.Footer>
            </Flex>
        </Card.Root>
    )
}

export default ItemContainer;