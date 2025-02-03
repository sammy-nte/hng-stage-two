import express, { response } from "express";

const app = express();
const PORT = 3300;

app.use(express.json());

// Fetch random math fact
async function getMathFact(num) {
  const result = await fetch(`http://numbersapi.com/${num}/math`);
  const data = await result.text();

  return data;
}

// Check if number is prime
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }

  return true;
}

// Check if number is a perfect number
function isPerfectNumber(n) {
  if (n <= 1) return false;
  let sum = 0;

  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }

  return sum === n;
}

// Check if isArmStrong
function isArmstrong(num) {
  const digits = num.toString().split("");
  const numDigits = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), numDigits),
    0
  );
  if (sum === num) return "armstrong";
}

// Sum of individual number digits
function digitSum(num) {
  const totalSum = num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  return totalSum;
}

// Check if number is odd or even
function isOddOrEven(num) {
  const result = num % 2 === 1 ? "odd" : "even";
  return result;
}

let properties;

function checkProperties(n) {
  const armstrong = isArmstrong(n);
  const oddOrEven = isOddOrEven(n);
  if (armstrong) {
    properties.push(armstrong);
  }
  if (oddOrEven) {
    properties.push(oddOrEven);
  }
}

app.get("/api/classify-number", async (req, res) => {
  properties = [];
  const { query } = req;
  const numStr = query.number;
  if (!/^\d+$/.test(numStr)) {
    return res.status(400).json({ number: "alphabet", error: true });
  }
  const parsedNum = parseInt(query.number);
  checkProperties(parsedNum);
  const jsonObj = {
    number: query.number,
    is_prime: isPrime(parsedNum),
    is_perfect: isPerfectNumber(parsedNum),
    properties: properties,
    digit_sum: digitSum(parsedNum),
    fun_fact: await getMathFact(parsedNum)
  };
  res.status(200).json(jsonObj);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost/3300`);
});
