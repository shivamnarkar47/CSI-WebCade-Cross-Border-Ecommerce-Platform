import Order from '../Models/order.model.js';
import Product from '../Models/product.model.js';

export const createOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
}

export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}

export const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}

export const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
}

export const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');

    res.json(orders);
}

export const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}

export const getOrdersByUser = async (req, res) => {
    const orders = await Order.find({ user: req.params.id });

    res.json(orders);
}

export const getOrdersByProduct = async (req, res) => {
    const orders = await Order.find({ 'orderItems.product': req.params.id });

    res.json(orders);
}

export const getOrdersByCategory = async (req, res) => {
    const products = await Product.find({ category: req.params.category });

    const orders = await Order.find({ 'orderItems.product': { $in: products } });

    res.json(orders);
}

export const getOrdersByRating = async (req, res) => {
    const products = await Product.find({ rating: req.params.rating });

    const orders = await Order.find({ 'orderItems.product': { $in: products } });

    res.json(orders);
}

export const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        await order.remove();
        res.json({ message: 'Order removed' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}

export const updateOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;

    const order = await Order.findById(req.params.id);

    if (order) {
        order.orderItems = orderItems;
        order.shippingAddress = shippingAddress;
        order.paymentMethod = paymentMethod;
        order.itemsPrice = itemsPrice;
        order.shippingPrice = shippingPrice;
        order.taxPrice = taxPrice;
        order.totalPrice = totalPrice;

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}

export const deleteOrderItem = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.orderItems = order.orderItems.filter((item) => item._id.toString() !== req.params.itemId);

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}