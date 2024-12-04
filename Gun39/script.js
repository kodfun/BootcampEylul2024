const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const treeImage = new Image();
treeImage.src = "tree.png";
const dinoImage = new Image();
dinoImage.src = "dino.png";
let skorMarjin = 10;
let basladi = false;
let basladiZaman;

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
    skoruCiz();
    let carpti = carptiMi();
    if (carpti) {
        oyunuBitir();
        return;
    }

    requestAnimationFrame(ciz);
}

function skoruCiz() {
    let simdi = new Date();
    let gecenSure = simdi - basladiZaman;
    let skor = Math.floor(gecenSure / 1000);
    let skorMetin = skorBicimle(skor);
    ctx.font = '24px Tiny5, sans-serif';
    ctx.fillStyle = "black";
    let metinBoyut = ctx.measureText(skorMetin);
    let metinGen = metinBoyut.width;
    let metinYuk = metinBoyut.actualBoundingBoxAscent 
                    + metinBoyut.actualBoundingBoxDescent;
    ctx.fillText(skorMetin, 
        canvas.width - metinGen - skorMarjin,   
        metinYuk + skorMarjin);
}

function skorBicimle(sayi) {
    let uz = sayi.toString().length;
    if (uz >= 5) return sayi.toString();
    return "0".repeat(5 - uz) + sayi;
}

function oyunuBitir() {
    basladi = false;
    let txt = "GAME OVER!";
    ctx.font = '28px Tiny5, sans-serif';
    const textWidth = ctx.measureText(txt).width;
    ctx.fillStyle = "black";
    ctx.fillText(txt, (canvas.width - textWidth) / 2, canvas.height / 4);

    let txt2 = ">>> Click to Play Again! <<<";
    ctx.font = '16px Tiny5, sans-serif';
    ctx.fillStyle = "red";
    const textWidth2 = ctx.measureText(txt2).width;
    ctx.fillText(txt2, 
        (canvas.width - textWidth2) / 2, 
        canvas.height / 4 * 3);
}

function carptiMi() {
    // dinazorun x/y düzlemindeki dikdörtgen alanları
    const d1 = {
        a: {
            x: dx,
            y: dy - jh
        },
        b: {
            x: dx + dw,
            y: dy - jh + dh
        }
    };

    // ağaçların x/y düzlemindeki dikdörtgen alanları
    const engeller = trees
        .filter(x => x > -tw && x < canvas.width)
        .map(e => ({
            a: {
                x: e,
                y: ty
            },
            b: {
                x: e + tw,
                y: ty + th
            }
        }));

    return engeller.some(e => kesisir(e, d1));
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
    trees = []; // yeniden başladığında eski ağaçları sil
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
    jd = 0; // zıplıyorsa dikey hareket yönünü sıfırla
    jh = 0; // havadaysa zıplama yüksekliğini sıfırla
    basladi = true;
    basladiZaman = new Date();
    loadTrees();
    requestAnimationFrame(ciz);
}

function yenidenBaslat() {
    // yeniden başlatırken yapacağınız ekstra işlemleri
    // burada yapabilirsiniz..
    baslat();
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

function mesafe(n1, n2) {
    return Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
}

function kesisir(d1, d2) {
    // orta noktaları arasındaki mesafe yarı çapları toplamından küçükse
    const o1 = { x: (d1.a.x + d1.b.x) / 2, y: (d1.a.y + d1.b.y) / 2};
    const o2 = { x: (d2.a.x + d2.b.x) / 2, y: (d2.a.y + d2.b.y) / 2};
    const mes = mesafe(o1, o2);
    const r1 = (dw + dh) / 4.8; // yük + gen / 4 => yaklaşık yarıçap
    const r2 = (tw + th) / 4.8; // yük + gen / 4 => yaklaşık yarıçap
    // oyunu esnetmek için 4'e bölmek yerine 4.8'e böldük

    return mes < r1 + r2;
}

// bunu kullanmadık, çünkü köşeleri keskin değil
// daire gibi düşüneceğiz dinozor ve kaktüsleri
// d1: dikdörtgen1  d2: dikdörtgen2
// örnek input: {a:{x:0,y:2},b:{x:2,y:0}}, {a:{x:1,y:3},b:{x:3,y:1}}
// function kesisir(d1, d2) {

//     return !(
//         -d1.b.y >= -d2.a.y ||  // d1, d2'nin üstündeyse
//         -d1.a.y <= -d2.b.y ||  // d1, d2'nin altındaysa
//         d1.b.x <= d2.a.x ||  // d1, d2'nin solundaysa
//         d1.a.x >= d2.b.x     // d1, d2'nin sağındaysa
//     );
// }

// EVENTS
dinoImage.onload = function() {
    baslat();
};

canvas.onclick = function() {
    if (basladi) {
        jump();
    }
    else {
        yenidenBaslat();
    }
};

window.onkeydown = function(event) {
    if (event.keyCode == 38)
        jump();
};

function jump() {
    if (jd == 0) jd = +1;
};