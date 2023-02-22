import { Router } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";


const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

//ANDA//
router.post("/", async (request, response) =>{
   let newProduct = await cartManager.addCart();
   response.send("Cart created with success");
});

router.get("/:cartId", async (request, response) =>{
    const cart = await cartManager.getCart();
    const cartId = cart.find(c => c.id == request.params.cartId);
    if(cartId){
        response.send(JSON.stringify(cartId));
    }else{
        response.status(400).send({error: "400", message: "El id ingresado es inválido o no existe"});
    }
})

router.post (`/:cid/product/:pid` , async (request, response) =>{
const cid= parseInt(request.params.cid);
const pid= parseInt(request.params.pid);
const product= await productManager.getProductById(pid);
const cart= await cartManager.getCartById(cid);

await cartManager.cartBuilder(cart, product);

  response.status(200).json(cart);

});











export default router;
