const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const treeImage = new Image();
treeImage.src = "tree.png";
const dinoImage = new Image();
dinoImage.src = "dino.png";
let basladi = false;

// ağaçların uzaklıkları (x koordinatında)
let trees = [];

// dinoX dinoY dinoWidth dinoHeight
let dw = 29, dh = 32;
let dx = 0, dy = canvas.height / 2 - dh;
let mjh = dh * 2; // maximum jump height
let jh = 0; // yerde oturuyor
let js = 2; // jump speed (atlama hızı katsayısı)
let sjs = .9; // slow jump speed (yükseklerdeki atlama hızı katsayısı)
let tw = 17, th = 32; // tree width & tree height
let ty = canvas.height / 2 - th;

// jump direction (zıplama yönü)
// 0: duruyor  +1: yukarı  -1: aşağı
let jd = 0; 


function ciz() {
    cizimiTemizle();
    zeminCiz();
    ziplamayiYonet();
    dinoCiz();
    agaclariCiz();
    sahneyiKaydir();
    requestAnimationFrame(ciz);
}

function sahneyiKaydir() {
    // tüm ağaçları 1 birim sola kaydır
    trees = trees.map(x => x - 1);
}

function agaclariCiz() {
    // sadece canvas'ın içine denk gelen ağaçları çiz
    const cizilecekler = trees.filter(x => x > -tw && x < canvas.width);

    for (const x of cizilecekler) 
        agacCiz(x);
}

function loadTrees() {
    // ilk ağaç canvas bitiminde
    trees.push(canvas.width);

    for (let i = 0; i < 1000; i++) {
        let otesi = rastgele(Math.floor(canvas.width / 3), canvas.width);
        let sonAgacUzakligi = trees[trees.length - 1];
        let yeniAgacUzakligi =  sonAgacUzakligi + otesi;
        trees.push(yeniAgacUzakligi);
    }
}

function rastgele(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function ziplamayiYonet() {
    if (jd == 0) return;

    // dino max yüksekliğin 5te 4ünün üstündeyse yavaş ilerlet
    if (jh < mjh * .8) 
        jh += jd * js; // yerden yüksekliğini arttır/azalt
    else
        jh += jd * sjs; // yerden yüksekliğini YAVAŞÇA arttır/azalt

    // yukarı zıplıyorsa ve max yük. ulaştıysa
    if (jd > 0 && jh >= mjh) {
        jd = -1; // düşmeye başla
    }

    // aşağı düşüyor ve yere çarptıysa
    if (jd < 0 && jh <= 0) {
        jd = 0; // zıplama bitti
    }
}

function cizimiTemizle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function baslat() {
    basladi = true;
    loadTrees();
    requestAnimationFrame(ciz);
}

function agacCiz(x) {
    ctx.drawImage(treeImage, x, ty, tw, th);
}

function dinoCiz() {
    ctx.drawImage(dinoImage, dx, dy - jh, dw, dh);
}

function zeminCiz() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#535353";
    ctx.stroke();
}

// EVENTS
dinoImage.onload = function() {
    baslat();
};

canvas.onclick = function() {
    if (jd == 0) jd = +1;
};