// Listen for submit
document.getElementById("pizza-form").addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";

  calculateResults();

  e.preventDefault();
});

// toggle
const checkBox = document.querySelector(".toggle");
checkBox.addEventListener("change", function () {
  if (this.checked) {
    swapToInch();
  } else {
    swapToCm();
  }
});

// Calculate results
function calculateResults() {
  // UI vars
  const table = document.getElementById("table"),
    UIdiameter = document.getElementById("diameter"),
    UIprice = document.getElementById("price");
  let diameter = parseFloat(UIdiameter.value);
  let price = parseFloat(UIprice.value);
  let pricepersqr = document.getElementById("pricepersqr");

  // Compute price per square
  const radius = diameter / 2;
  const area = Math.PI * Math.pow(radius, 2);

  if (isFinite(area)) {
    pricepersqr.value = (price / area).toFixed(3);
    //Show results
    document.getElementById("results").style.display = "block";
    //Add results to table
    addToTable(diameter, price, pricepersqr.value);
    showTable();
    //Clear fields and move focus to first item
    UIdiameter.value = "";
    UIprice.value = "";
    UIdiameter.focus();
  } else {
    console.log("something went wrong");
  }
}

// Add data to table
function addToTable(d, p, pps) {
  let rows = "";
  rows += "<td>" + d + "</td><td>" + p + "</td><td>" + pps + "</td>";
  const tbody = document.querySelector("#table tbody");
  const tr = document.createElement("tr");

  tr.innerHTML = rows;
  tbody.appendChild(tr);
}

// Squap to inch
function swapToInch() {
  // Change diameter prefix
  let units = document.getElementById("diameterUnits");
  units.innerHTML = "in";
  // Change result display
  let resultUnits = document.getElementById("resultUnits");
  resultUnits.innerHTML = "$ per sq in<sup>2</sup>";

  // Change table title
  let pricePer = document.getElementById("pricePer");
  pricePer.innerHTML = "Price per in<sup>2</sup>";
  let Tdiameter = document.getElementById("Tdiameter");
  Tdiameter.innerHTML = "Diameter in";

  // Change table content
  i = 0;
  let rows = document.getElementsByTagName("tr");
  const table = document.getElementById("table");
  while (i < rows.length - 1) {
    let current = table.children[1].children[i];

    let d = parseFloat(current.children[0].innerHTML);
    let p = parseFloat(current.children[1].innerHTML);
    let pps = parseFloat(current.children[2].innerHTML);

    d = (d / 2.54).toFixed(3);
    const radius = d / 2;
    const area = Math.PI * Math.pow(radius, 2);
    pps = (p / area).toFixed(3);

    let row = "";
    row += "<td>" + d + "</td><td>" + p + "</td><td>" + pps + "</td>";

    current.innerHTML = row;

    i++;
  }
}

// Squap to cm
function swapToCm() {
  // Change diameter prefix
  let units = document.getElementById("diameterUnits");
  units.innerHTML = "cm";
  // Change result display
  let resultUnits = document.getElementById("resultUnits");
  resultUnits.innerHTML = "$ per sq cm<sup>2</sup>";

  // Change table title
  let pricePer = document.getElementById("pricePer");
  pricePer.innerHTML = "Price per cm<sup>2</sup>";
  let Tdiameter = document.getElementById("Tdiameter");
  Tdiameter.innerHTML = "Diameter cm";

  // Change table content
  i = 0;
  let rows = document.getElementsByTagName("tr");
  const table = document.getElementById("table");
  while (i < rows.length - 1) {
    let current = table.children[1].children[i];

    let d = parseFloat(current.children[0].innerHTML);
    let p = parseFloat(current.children[1].innerHTML);
    let pps = parseFloat(current.children[2].innerHTML);

    d = (d * 2.54).toFixed(3);
    const radius = d / 2;
    const area = Math.PI * Math.pow(radius, 2);
    pps = (p / area).toFixed(3);

    let row = "";
    row += "<td>" + d + "</td><td>" + p + "</td><td>" + pps + "</td>";

    current.innerHTML = row;

    i++;
  }
}

// Show table
function showTable() {
  document.getElementById("table").style.display = "block";
}
