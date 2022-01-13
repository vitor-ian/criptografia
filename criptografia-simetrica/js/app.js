function AssignValues(){
    var script = document.createElement('script');
    script.src = './js/sodium.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    console.log(window.sodium);
    var key_pair = window.sodium.crypto_box_keypair();
    let key = sodium.from_hex("724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed");
    var texto = document.getElementById("texto").value;


    //Criptografando
    var nonceSecretBox = window.sodium.randombytes_buf(window.sodium.crypto_secretbox_NONCEBYTES);
    var encryptedSecretBox = window.sodium.crypto_secretbox_easy(texto, nonceSecretBox, key);

    console.log("Chave",window.sodium.to_hex(key));
    console.log("Payload cryptografado a ser mandado ao servidor",encryptedSecretBox);

    //Descriptografando
    var nonce_secretbox = nonceSecretBox;
    var encrypted_secretbox = encryptedSecretBox;
    var decrypted = window.sodium.crypto_secretbox_open_easy(encrypted_secretbox, nonce_secretbox, key);

    console.log("Payload decrypt:",window.sodium.to_string(decrypted));

    //Substituindo Valores
    document.getElementById("pubkey").innerHTML = window.sodium.to_hex(key_pair.publicKey);
    document.getElementById("resultcripto").innerHTML = encryptedSecretBox;
    document.getElementById("resultdescripto").innerHTML = window.sodium.to_string(decrypted);
    
}


window.sodium = {
    onload: function (sodium) {
    console.log("Sodium loaded");
    window.sodium = sodium;
    }
};



