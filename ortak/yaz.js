document.body.style.background = "black";
document.body.style.color = "white";
document.body.style.fontSize = "2em";
document.body.style.fontFamily = '"Courier New", monospace';

function yaz(html = "") {
    document.body.innerHTML += html + "<br>";
}

function ciz(html = "") {
    document.body.innerHTML += html + "<hr>";
}

function temizle() {
    document.body.innerHTML = "";
}