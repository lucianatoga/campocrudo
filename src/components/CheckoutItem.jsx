import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";

const CheckoutItem=({handleSubmit, setSaleForm, saleForm})=>{
    return(
        <Box>
            <Heading marginBottom='2rem'>Por favor complete el formulario para finalizar</Heading>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <Input type='text' required placeholder="Nombre completo" onChange={(e)=>setSaleForm({...saleForm, fullName: e.target.value})}/>
                <Input type='email' required placeholder="Email" onChange={(e)=>setSaleForm({...saleForm, email: e.target.value})}/>
                <Input type='number' required placeholder="Telefono" onChange={(e)=>setSaleForm({...saleForm, phoneNumber: e.target.value})}/>
                <Button variant='outline' className="linen-btn" type='submit' marginTop='1rem'>Finalizar compra</Button>
            </form>
        </Box>
    )
}

export default CheckoutItem;