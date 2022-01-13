function AssignValues(){
    var script = document.createElement('script');
    script.src = './js/sodium.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    console.log(window.sodium);
    var key_pair = window.sodium.crypto_box_keypair();
    var texto = document.getElementById("texto").value;


    //Criptografando
    var nonceSecretBox = window.sodium.randombytes_buf(window.sodium.crypto_secretbox_NONCEBYTES);
    var nonceSecretBoxHex = window.sodium.to_hex(nonceSecretBox);
    var cipherTexNonceSecretBobPubToAlicePrivBox = window.sodium.crypto_box_seal(nonceSecretBoxHex, key_pair.publicKey);
    var kB = window.sodium.crypto_scalarmult(key_pair.privateKey, key_pair.publicKey);
    var encryptedSecretBox = window.sodium.crypto_secretbox_easy(texto, nonceSecretBox, kB);

    console.log("Chave publica",window.sodium.to_hex(key_pair.publicKey));
    console.log("Chave privada",window.sodium.to_hex(key_pair.privateKey));
    console.log("Payload cryptografado a ser mandado ao servidor",encryptedSecretBox);

    //Descriptografando
    var nonce_secretbox = nonceSecretBox;
    var encrypted_secretbox = encryptedSecretBox;
    var kB = window.sodium.crypto_scalarmult(key_pair.privateKey, key_pair.publicKey );
    var decrypted = window.sodium.crypto_secretbox_open_easy(encrypted_secretbox, nonce_secretbox, kB);

    console.log("Payload decrypt:",window.sodium.to_string(decrypted));

    //Substituindo Valores
    document.getElementById("pubkey").innerHTML = window.sodium.to_hex(key_pair.publicKey);
    document.getElementById("privkey").innerHTML = window.sodium.to_hex(key_pair.privateKey);
    document.getElementById("resultcripto").innerHTML = encryptedSecretBox;
    document.getElementById("resultdescripto").innerHTML = window.sodium.to_string(decrypted);
    
}


window.sodium = {
    onload: function (sodium) {
    console.log("Sodium loaded");
    window.sodium = sodium;
    }
};



