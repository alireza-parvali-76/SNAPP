const neighborhoods = [
  "میدان شهرداری",
  "سبزه میدان",
  "علی‌آباد",
  "پیربازار",
  "گلزاران",
  "پیرسرا",
  "تختی",
  "تازه‌آباد",
  "استادسرا",
  "خمام",
  "رودبارتان",
  "پل‌ عراق",
  "جانبازان",
  "رازی",
  "سعدی",
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hour}:${minute}`;
}

export function generateRandomData() {
  const origin = getRandomElement(neighborhoods);
  let destination;
  do {
    destination = getRandomElement(neighborhoods);
  } while (destination === origin);
  
  const distance = (Math.random() * 50 + 1).toFixed(1);
  const time = generateRandomTime();
  
  const weatherOptions = ["بارانی", "ابری", "آفتابی", "گرم", "خیلی گرم", "باران زیاد"];
  const weather = getRandomElement(weatherOptions);
  
  const trafficOptions = ["روان", "سبک", "معمولی", "نیمه سنگین", "سنگین", "شدید"];
  const traffic = getRandomElement(trafficOptions);
  
  return {
    origin,
    destination,
    distance: parseFloat(distance),
    time,
    weather,
    traffic
  };
}
