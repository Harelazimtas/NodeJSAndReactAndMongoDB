const express = require("express");
const router = express.Router();
const Signature = require("../public-private-keys/signature");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const signatureContent = require("../model/signatureSchema");
const updateSign = require("../DB/updateSignature");
const id = "signature";
const SHA256 = require("crypto-js/sha256");

router.get("/signature/initSignature", async (req, res) => {
  const key = ec.genKeyPair();

  const signature = new Signature(
    "",
    key.getPrivate("hex"),
    key.getPublic("hex"),
    ""
  );

  const content = new signatureContent({
    ...signature,
    id: id,
  });
  content.save().catch(() => {
    updateSign(signature, id);
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    prKey: signature.prKey,
    puKey: signature.puKey,
  });
});

router.post("/signature/sign", async (req, res) => {
  const message = req.body.message;
  const privateKey = req.body.prKey;
  const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

  const hashMsg = SHA256(message).toString();
  const messageSign = ec
    .keyFromPrivate(privateKey)
    .sign(hashMsg, "base64")
    .toDER("hex");

  const signature = new Signature(message, privateKey, publicKey, messageSign);

  updateSign(signature, id);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: message,
    puKey: publicKey,
    signature: messageSign,
  });
});

router.post("/signature/verify", async (req, res) => {
  const message = req.body.message;
  const publicKey = req.body.puKey;
  const messageSign = req.body.signature;
  let ifVerify;
  try {
    const hashMsg = SHA256(message).toString();

    ifVerify = ec.keyFromPublic(publicKey, "hex").verify(hashMsg, messageSign);
  } catch (error) {
    ifVerify = false;
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    ifVerify: ifVerify,
    message: message,
    puKey: publicKey,
    signature: messageSign,
  });
});

module.exports = router;
