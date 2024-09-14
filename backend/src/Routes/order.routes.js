import express from "express";
import { createOrder, 
    getOrders,
    getMyOrders,
    updateOrderToDelivered,
    getOrdersByUser,
    getOrdersByProduct,
    getOrdersByCategory,
    getOrdersByRating
} from "../Controllers/order.controllers.js";


const router = express.Router();

router.post('/create', createOrder);
router.get('/getOrders', getOrders);
router.get('/getMyOrders', getMyOrders);
router.put('/update/:id', updateOrderToDelivered);
router.get('/user/:id', getOrdersByUser);
router.get('/product/:id', getOrdersByProduct);
router.get('/category/:category', getOrdersByCategory);
router.get('/rating/:rating', getOrdersByRating);

export default router;