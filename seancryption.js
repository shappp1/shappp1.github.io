const form = document.getElementById("input");
const output = document.getElementById("output");

const msg_in = document.getElementById("msg");
const key_in = document.getElementById("key");
const ovr_in = document.getElementById("ovr");
const pat_in = document.getElementById("pat");
const dir_in = document.getElementById("dir");
const b64_in = document.getElementById("b64");

let msg, key, ovr, pat, dir, b64;

const mod = (n, m) => ((n % m) + m) % m;

function vigenere(msg, key, dir = "encode") {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    if (!msg || !key) return "";

    let d;
    if (dir === "encode") {
        d = 1;
    } else if (dir === "decode") {
        d = -1;
    } else {
        return "";
    }

    let ret = "";

    for (let i = 0; i < msg.length; i++) {
        let ki = i % key.length;

        let mai = alphabet.indexOf(msg[i]);
        let kai = alphabet.indexOf(key[ki]);

        ret += alphabet[mod(mai + d * kai, alphabet.length)];
    }

    return ret;
}

form.addEventListener("input", _ => {
    msg = msg_in.value.replaceAll("\n", "");
    key = key_in.value;
    ovr = ovr_in.value.replaceAll(" ", "");
    pat = pat_in.value;
    dir = dir_in.value;
    b64 = b64_in.checked;

    if (!msg || (key.length !== 7 && !ovr)) {
        output.value = "";
        return;
    }

    let key_pat = "";
    for (let c of pat) {
        if (c === " ") continue;

        key_pat += key[+c];
    }

    let decrypted = vigenere(msg, ovr ? ovr : key_pat, dir);

    decrypted = decrypted.replace(/[^A-Za-z0-9+/]/g, "");

    output.value = b64 ? atob(decrypted) : decrypted;
});