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
// function printQRcode() {
//   const { jsPDF } = window.jspdf;
//   let doc = new jsPDF({
//   });
// }
// document.getElementById("print-btn").onclick(printQRcode());

function printQRcode() {
  const { jsPDF } = window.jspdf;
  var pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [84, 40],
  });

  pdf.setFontSize(15);
  pdf.text("CraveCookie", 43, 20);

  pdf.setFontSize(10);
  pdf.text("Scan For Menu", 43, 25);

  let base64Image = document.getElementById("qrcode");
  console.log(base64Image);

  // pdf.addImage(base64Image, "png", 0, 0, 40, 40);
  pdf.save(base64Image, "generated.pdf");
}
