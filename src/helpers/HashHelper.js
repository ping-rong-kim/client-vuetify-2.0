import CryptoJS from "@/plugins/crypto-aes";
export default {
  encode(payload = {}, JWT_KEY = false) {
    JWT_KEY = JWT_KEY || process.env.VUE_APP_JWT_KEY;
    const encryptedMessage = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      JWT_KEY
    );
    return encryptedMessage.toString();
  },
  decode(payload = "", JWT_KEY = false) {
    JWT_KEY = JWT_KEY || process.env.VUE_APP_JWT_KEY;
    const decryptedBytes = CryptoJS.AES.decrypt(payload, JWT_KEY);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return decryptedMessage && JSON.parse(decryptedMessage);
  }
};
