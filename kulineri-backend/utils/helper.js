const generateImage = (name) => {
  return `https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&format=svg&bold=true`;
};

const generateRandomCode = () => {
  // Karakter yang diizinkan untuk digunakan dalam kode
  const allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let randomCode = "";

  // Generate 6 digit huruf kapital secara acak
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
    randomCode += allowedCharacters.charAt(randomIndex);
  }

  return randomCode;
};

module.exports = { generateImage, generateRandomCode };
