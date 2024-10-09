let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Pulsanti per aggiungere i prodotti al carrello
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);

        addToCart(productName, productPrice);
    });
});

// Funzione per aggiungere prodotti al carrello
function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Funzione per aggiornare il conteggio e i dettagli del carrello
function updateCart() {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItemsElement.innerHTML = ''; // Pulisce gli articoli precedenti

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.textContent = `${item.name} - €${item.price} x ${item.quantity}`;
        cartItemsElement.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `Totale: €${total.toFixed(2)}`;
}

// Gestione della finestra modale
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeBtn = document.querySelector('.close-btn');

// Mostra il carrello
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

// Chiudi la finestra modale
closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Chiudi la finestra se clicchi fuori dalla finestra
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
