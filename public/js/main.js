// display add product form when you click on +UPLOAD PRODUCT button
function displayAddProduct() {
  document.getElementById("add-product-container").style.display = "block";
}

// remove add product form when you click when you click anywhere inside the products-container
function removeAddProduct() {
  document.getElementById("add-product-container").style.display = "none";
}

// display QRcode on QRcode-generator page when page loads
function displayQRcode() {
  var qrc = new QRCode(
    document.getElementById("qrcode"),
    "http://product/111223"
  );
}
