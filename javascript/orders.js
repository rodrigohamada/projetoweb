document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    function updateTotalPrice() {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function addProductToOrder(product) {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `R$ ${product.price.toFixed(2)}`;

        productInfo.appendChild(productName);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(productPrice);

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const quantityInput = document.createElement('div');
        quantityInput.classList.add('quantity-input');

        const quantityLabel = document.createElement('label');
        quantityLabel.textContent = 'Quantidade:';

        const quantityField = document.createElement('input');
        quantityField.type = 'number';
        quantityField.value = 1;
        quantityField.min = 1;

        quantityInput.appendChild(quantityLabel);
        quantityInput.appendChild(quantityField);

        quantityField.addEventListener('change', function () {
            const quantity = parseInt(quantityField.value);
            const productTotal = quantity * product.price;
            totalPrice = totalPrice - (product.price * product.quantity) + productTotal;
            product.quantity = quantity;
            updateTotalPrice();
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remover';

        removeButton.addEventListener('click', function () {
            orderList.removeChild(orderItem);
            totalPrice -= product.price * product.quantity;
            updateTotalPrice();
        });

        orderItem.appendChild(productImage);
        orderItem.appendChild(productInfo);
        orderItem.appendChild(quantityInput);
        orderItem.appendChild(removeButton);

        orderList.appendChild(orderItem);

        product.quantity = 1;
        totalPrice += product.price;
        updateTotalPrice();
    }


});
