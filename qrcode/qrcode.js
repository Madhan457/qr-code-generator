const url = document.getElementById("url");
const Button = document.getElementById("qrcode");
const QrImage = document.getElementById("qrimage");
const Container = document.getElementById("container");
const Download = document.getElementById("download");
function generateQR() {
  if (url.value.trim() === "") {
    alert("Enter a valid URL");
    return;
  }
  QRCode.toDataURL(url.value)
    .then((dataUrl) => {
      QrImage.src = dataUrl;
      Container.style.height = "530px";
      Container.style.transition = " 0.3s ease";
      QrImage.style.padding = "40px";
      Download.style.display = "inline-block";
    })
    .catch((err) => console.log(err));
}
function DownloadPDF() {
  if (!QrImage.src) {
    alert("Generate QR Code First");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("QR Code", 90, 20,{align:"center"});
  doc.addImage(QrImage.src, "PNG", 50, 100, 100, 100);
  doc.text("BY Madhan", 100, 250);
  doc.save("new.pdf");
}

Button.addEventListener("click", generateQR);
url.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateQR();
  }
});
Download.addEventListener("click", DownloadPDF);
