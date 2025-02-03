import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 

// Fetch random math fact
async function getMathFact(num) {
  try {
    const result = await fetch(`http://numbersapi.com/${num}/math`);
    const data = await result.text();
    return data;
  } catch (error) {
    return "Math fact unavailable.";
  }
}

// Check if a number is prime
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Check if a number is a perfect number
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

// Check if a number is an Armstrong number
function isArmstrong(num) {
  const digits = num.toString().split("");
  const numDigits = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), numDigits),
    0
  );
  return sum === num;
}

// Sum of individual number digits
function digitSum(num) {
  return Math.abs(num)
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Check if a number is odd or even
function isOddOrEven(num) {
  return num % 2 === 0 ? "even" : "odd";
}

// Function to classify number properties
function checkProperties(n) {
  let properties = [];
  if (isArmstrong(n)) properties.push("armstrong");
  properties.push(isOddOrEven(n));
  return properties;
}

app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;


  if (!/^[-]?\d+$/.test(number)) {
    return res.status(400).json({
      number: "alphabet",
      error: true,
    });
  }

  const parsedNum = parseInt(number);
  const jsonObj = {
    number: parsedNum,
    is_prime: isPrime(parsedNum),
    is_perfect: isPerfectNumber(parsedNum),
    properties: checkProperties(parsedNum),
    digit_sum: digitSum(parsedNum),
    fun_fact: await getMathFact(parsedNum),
  };

  res.status(200).json(jsonObj);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
