const products = [
  {
    name: "Mini Bluetooth Speaker",
    price: 499,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "LED Strip Light",
    price: 299,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "samsung watch with airpods",
    price: 1199,
    discription:"track your fitness and notifications on the go"
    image: "image/samsung watch with airpods.jpg",
  }
];

const phoneNumber = "919744340057"; // Replace with your WhatsApp number

const container = document.getElementById("product-list");

products.forEach(product => {
  const productEl = document.createElement("div");
  productEl.className = "product";
  productEl.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>Price: ₹${product.price}</p>
    <a class="whatsapp-btn" target="_blank"
      href="https://wa.me/${phoneNumber}?text=I want to order: ${encodeURIComponent(product.name)}">
      Order on WhatsApp
    </a>
  `;
  container.appendChild(productEl);
});

