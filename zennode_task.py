def calculate_discount(cart, discounts):
    total_quantity = sum(cart.values())
    max_quantity = max(cart.values())
    cart_total = sum(cart[key] * products[key] for key in cart)

    discount_amount = 0
    discount_name = ""

    for rule, condition in discounts.items():
        if eval(condition):
            if discounts[rule] > discount_amount:
                discount_name = rule
                discount_amount = discounts[rule]

    return discount_name, discount_amount


def calculate_shipping_and_wrap(cart, gift_wrap_fee, shipping_fee):
    total_quantity = sum(cart.values())
    gift_wrap_total = sum(cart.values()) * gift_wrap_fee
    shipping_fee_total = (total_quantity // 10) * shipping_fee

    return gift_wrap_total, shipping_fee_total


products = {
    "Product A": 20,
    "Product B": 40,
    "Product C": 50
}

discounts = {
    "flat_10_discount": "cart_total > 200",
    "bulk_5_discount": "max_quantity > 10",
    "bulk_10_discount": "total_quantity > 20",
    "tiered_50_discount": "total_quantity > 30 and max_quantity > 15"
}

cart = {}
gift_wrap_fee = 1
shipping_fee = 5

for product in products:
    quantity = int(input(f"Enter quantity for {product}: "))
    is_gift_wrapped = input(f"Is {product} wrapped as a gift? (yes/no): ").lower() == "yes"

    if is_gift_wrapped:
        cart[product] = {"quantity": quantity, "gift_wrap_fee": gift_wrap_fee}
    else:
        cart[product] = {"quantity": quantity, "gift_wrap_fee": 0}

discount_name, discount_amount = calculate_discount(cart, discounts)
gift_wrap_total, shipping_fee_total = calculate_shipping_and_wrap(cart, gift_wrap_fee, shipping_fee)

subtotal = sum(cart[product]["quantity"] * products[product] for product in cart)
total = subtotal - discount_amount + gift_wrap_total + shipping_fee_total

for product in cart:
    print(f"{product}: Quantity: {cart[product]['quantity']}, Total: {cart[product]['quantity'] * products[product]}")

print("\nSubtotal:", subtotal)
print("Discount Applied:", discount_name, "-", discount_amount)
print("Gift Wrap Fee:", gift_wrap_total)
print("Shipping Fee:", shipping_fee_total)
print("Total:", total)
