const db = firebase.firestore();

// Load all products on page load
loadProducts();

function loadProducts() {
    db.collection("products")
        .get()
        .then((querySnapshot) => {
            const products = [];

            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            displayProducts(products);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}

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

            <button
                class="buy-button"
                onclick="event.stopPropagation(); buyNow('${product.id}')">
                Buy Now
            </button>
        `;

        // Clicking product opens product details page
        productBox.style.cursor = "pointer";

        productBox.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        container.appendChild(productBox);
    });
}

function filterCategory(category) {
    db.collection("products")
        .get()
        .then((querySnapshot) => {

            const products = [];

            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            if (category === "All") {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(
                    product => product.category === category
                );

                displayProducts(filteredProducts);
            }
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}

function searchProducts() {
    const searchTerm = document
        .getElementById("search")
        .value
        .toLowerCase();

    db.collection("products")
        .get()
        .then((querySnapshot) => {

            const products = [];

            querySnapshot.forEach((doc) => {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );

            displayProducts(filteredProducts);
        })
        .catch((error) => {
            console.error("Error searching products:", error);
        });
}

function buyNow(productId) {
    db.collection("products")
        .doc(productId)
        .get()
        .then((doc) => {

            if (!doc.exists) {
                alert("Product not found.");
                return;
            }

            const product = doc.data();

            const productName = encodeURIComponent(product.name);
            const productPrice = product.price;

            window.location.href =
                `buy.html?id=${productId}&product=${productName}&amount=${productPrice}`;
        })
        .catch((error) => {
            console.error("Error fetching product:", error);
        });
}
