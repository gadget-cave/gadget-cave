const db = firebase.firestore();

// Fetch all products from the database on page load
db.collection("products").get().then((querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        products.push(product);
    });
    displayProducts(products);
});

// All other functions remain the same as before
function displayProducts(productList) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    productList.forEach((product) => {
        const productBox = document.createElement("div");
        productBox.classList.add("product");
        productBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="buy-button" onclick="buyNow('${product.id}')">Buy Now</button>
        `;
        container.appendChild(productBox);
    });
}

function filterCategory(category) {
    db.collection("products").get().then((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        if (category === "All") {
            displayProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            displayProducts(filtered);
        }
    });
}

function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    db.collection("products").get().then((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
}

function buyNow(productId) {
    db.collection("products").doc(productId).get().then((doc) => {
        if (doc.exists) {
            const product = doc.data();
            const productName = encodeURIComponent(product.name);
            const productPrice = product.price;
            window.location.href = `buy.html?id=${productId}&product=${productName}&amount=${productPrice}`;
        }
    });
}
