function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  return {
    hour,
    timeString: `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`,
  };
}

function roundUpToThousands(value) {
  return Math.ceil(value / 1000) * 1000;
}

export function calculateRandomPrice() {
 
  const distance = Math.random() * 20 + 1; 

  const weather = randomItem([
    "بارانی",
    "گرم",
    "آفتابی",
    "خیلی گرم",
    "باران زیاد",
  ]);

  const traffic = randomItem([
    "روان",
    "سبک",
    "معمولی",
    "نیمه سنگین",
    "سنگین",
  ]);

  const { hour } = randomTime();

  // ✅ قیمت پایه
  const basePrice = Math.ceil(distance / 5) * 15000;

  // ✅ درصدها (دقیقاً طبق دستور شما)
  const weatherPercentMap = {
    'بارانی': 0.08,
    'گرم': 0.1,
    'آفتابی': 0.2,
    "خیلی گرم": 0.17,
    "باران زیاد": 0.15,
  };

  const trafficPercentMap = {
    'روان': 0,
    'سبک': 0.05,
    'معمولی': 0.1,
    "نیمه سنگین": 0.15,
    'سنگین': 0.25,
  };

  let timePercent = 0;

  if (hour >= 6 && hour < 8) timePercent = 0.2;
  else if (hour >= 8 && hour < 11) timePercent = 0.05;
  else if (hour >= 11 && hour < 15) timePercent = 0.15;
  else if (hour >= 15 && hour < 18) timePercent = 0.2;
  else if (hour >= 18 && hour < 20) timePercent = 0.25;
  else if (hour >= 20 && hour < 22) timePercent = 0.15;
  else if (hour >= 22) timePercent = 0.1;
  else timePercent = 0.05;

  // ✅ جمع درصدها (فقط روی قیمت پایه)
  const totalPercent =
    weatherPercentMap[weather] +
    trafficPercentMap[traffic] +
    timePercent;

  const rawFinalPrice = basePrice + basePrice * totalPercent;

  // ✅ رند به هزارگان رو به بالا
  const finalPrice = roundUpToThousands(rawFinalPrice);

  return finalPrice;
}
