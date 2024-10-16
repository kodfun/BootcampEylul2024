
let n = 1;

// sonsuz döngü
while (true) {
    console.log(n++);

    // sonsuz döngüyü while içinden kırabiliyoruz
    if (n == 103)
        break; // döngüden kaçış
}

