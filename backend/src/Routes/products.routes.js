import express from 'express';
import { createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsByRating,
    getProducts,
    getProductById

} from '../Controllers/product.controller.js';

const router = express.Router();

router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/category/:category', getProductsByCategory);
router.get('/rating/:rating', getProductsByRating);
router.get('/getProducts', getProducts);
router.get('/getProductById/:id', getProductById);

export default router;
