// display add product form when you click on +UPLOAD PRODUCT button
function displayAddProduct() {
  document.getElementById("add-product-container").style.display = "block";
}

// close add product when you click on the close icon
function closeAddProduct() {
  document.getElementById("add-product-container").style.display = "none";
}

// display QRcode on QRcode-generator page when page loads
function displayQRcode() {
  // extract batch number and save to batchNum
  const batchNum = document.getElementById("QRcode-title").innerHTML.split(" ");
  const ip = "192.168.0.107";
  var qrc = new QRCode(
    document.getElementById("qrcode"),
    `http://${ip}:3030/product/${batchNum[2]}`
  );
}

// print QRcode
function printQRcode(elementId) {
  let printContent = document.getElementById(elementId).innerHTML;
  let originalContent = document.body.innerHTML;

  document.body.innerHTML = printContent;

  window.print();

  document.body.innerHTML = originalContent;
}
