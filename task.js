function calculateDiscount(cart, discounts) {
    const totalQuantity = Object.values(cart).reduce((acc, val) => acc + val.quantity, 0);
    const maxQuantity = Math.max(...Object.values(cart).map(item => item.quantity));
    const cartTotal = Object.entries(cart).reduce((acc, [key, val]) => acc + val.quantity * products[key], 0);

    let discountAmount = 0;
    let discountName = "";

    for (const [rule, condition] of Object.entries(discounts)) {
        if (eval(condition)) {
            if (discounts[rule] > discountAmount) {
                discountName = rule;
                discountAmount = discounts[rule];
            }
        }
    }

    return { discountName, discountAmount };
}

function calculateShippingAndWrap(cart, giftWrapFee, shippingFee) {
    const totalQuantity = Object.values(cart).reduce((acc, val) => acc + val.quantity, 0);
    const giftWrapTotal = Object.values(cart).reduce((acc, val) => acc + val.quantity * giftWrapFee, 0);
    const shippingFeeTotal = Math.floor(totalQuantity / 10) * shippingFee;

    return { giftWrapTotal, shippingFeeTotal };
}

const products = {
    "Product A": 20,
    "Product B": 40,
    "Product C": 50
};

const discounts = {
    "flat_10_discount": "cartTotal > 200",
    "bulk_5_discount": "maxQuantity > 10",
    "bulk_10_discount": "totalQuantity > 20",
    "tiered_50_discount": "totalQuantity > 30 && maxQuantity > 15"
};

const cart = {};
const giftWrapFee = 1;
const shippingFee = 5;

for (const product in products) {
    const quantity = parseInt(prompt(`Enter quantity for ${product}:`));
    const isGiftWrapped = prompt(`Is ${product} wrapped as a gift? (yes/no):`).toLowerCase() === "yes";

    if (isGiftWrapped) {
        cart[product] = { quantity, giftWrapFee };
    } else {
        cart[product] = { quantity, giftWrapFee: 0 };
    }
}

const { discountName, discountAmount } = calculateDiscount(cart, discounts);
const { giftWrapTotal, shippingFeeTotal } = calculateShippingAndWrap(cart, giftWrapFee, shippingFee);

const subtotal = Object.entries(cart).reduce((acc, [key, val]) => acc + val.quantity * products[key], 0);
const total = subtotal - discountAmount + giftWrapTotal + shippingFeeTotal;

for (const [product, info] of Object.entries(cart)) {
    console.log(`${product}: Quantity: ${info.quantity}, Total: ${info.quantity * products[product]}`);
}

console.log("\nSubtotal:", subtotal);
console.log("Discount Applied:", discountName, "-", discountAmount);
console.log("Gift Wrap Fee:", giftWrapTotal);
console.log("Shipping Fee:", shippingFeeTotal);
console.log("Total:", total);


