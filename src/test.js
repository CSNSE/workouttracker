// Define your marketplace data
function test(){
const marketplaceData = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 7.99 },
  // Add more products as needed
];

// Render the marketplace
function renderMarketplace() {
  const marketplaceContainer = document.getElementById("marketplace-container");

  // Clear the container
  marketplaceContainer.innerHTML = "";

  // Render each product
  marketplaceData.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;

    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);

    marketplaceContainer.appendChild(productElement);
  });
}

// Call the renderMarketplace function to initially render the marketplace
return(renderMarketplace());
}
export default test();