const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '1mb' })); // Limit request size
app.use(express.json({ limit: '1mb' }));

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30000, () => {
    res.status(408).json({
      is_success: false,
      error: "Request timeout"
    });
  });
  next();
});

// CORS middleware for cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Helper Functions
const isNumber = (str) => {
  return !isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str);
};

const isAlphabet = (char) => {
  return /^[a-zA-Z]$/.test(char);
};

const isSpecialCharacter = (char) => {
  return !/^[a-zA-Z0-9]$/.test(char);
};

const processNumbers = (data) => {
  const numbers = data.filter(item => {
    // Handle edge cases: null, undefined, empty string, non-string types
    if (item === null || item === undefined || item === '') return false;
    if (typeof item !== 'string') return false;
    
    // Check if it's a valid number (including handling of very large numbers)
    const trimmed = item.trim();
    if (trimmed === '') return false;
    
    return isNumber(trimmed);
  }).map(item => item.trim()); // Trim whitespace from valid numbers
  
  const oddNumbers = numbers.filter(num => {
    const parsed = parseInt(num);
    return !isNaN(parsed) && parsed % 2 !== 0;
  });
  
  const evenNumbers = numbers.filter(num => {
    const parsed = parseInt(num);
    return !isNaN(parsed) && parsed % 2 === 0;
  });
  
  return { oddNumbers, evenNumbers, numbers };
};

const processAlphabets = (data) => {
  const alphabets = [];
  
  data.forEach(item => {
    // Handle edge cases: null, undefined, non-string types
    if (item === null || item === undefined) return;
    
    // Convert to string if it's not already (handles numbers, booleans, etc.)
    const str = String(item);
    
    // Check if the entire string contains only alphabetic characters
    if (str.length > 0 && /^[a-zA-Z]+$/.test(str)) {
      // If entire string is alphabetic, add it as one item (converted to uppercase)
      alphabets.push(str.toUpperCase());
    } else {
      // If string contains mixed characters, process character by character
      for (let char of str) {
        if (isAlphabet(char)) {
          alphabets.push(char.toUpperCase());
        }
      }
    }
  });
  
  return alphabets;
};

const processSpecialCharacters = (data) => {
  const specialChars = [];
  
  data.forEach(item => {
    // Handle edge cases: null, undefined, non-string types
    if (item === null || item === undefined) return;
    
    // Convert to string if it's not already
    const str = String(item);
    
    for (let char of str) {
      if (isSpecialCharacter(char)) {
        specialChars.push(char);
      }
    }
  });
  
  return specialChars;
};

const calculateSum = (numbers) => {
  if (numbers.length === 0) return "0";
  
  try {
    const sum = numbers.reduce((acc, num) => {
      const parsed = parseInt(num);
      // Handle very large numbers that might overflow
      if (isNaN(parsed) || !isFinite(parsed)) return acc;
      return acc + parsed;
    }, 0);
    
    return sum.toString();
  } catch (error) {
    console.error('Error calculating sum:', error);
    return "0";
  }
};

const createConcatString = (alphabets) => {
  if (alphabets.length === 0) return "";
  
  // Join all alphabets
  const joined = alphabets.join('');
  
  // Reverse the string
  const reversed = joined.split('').reverse().join('');
  
  // Apply alternating caps (first upper, next lower, etc.)
  let result = '';
  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      result += reversed[i].toUpperCase();
    } else {
      result += reversed[i].toLowerCase();
    }
  }
  
  return result;
};

// GET route for basic health check
app.get('/', (req, res) => {
  res.json({
    message: "BFHL API is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Main POST route: /bfhl
app.post('/bfhl', async (req, res) => {
  try {
    // Input validation
    if (!req.body) {
      return res.status(400).json({
        is_success: false,
        error: "Request body is required"
      });
    }

    const { data } = req.body;

    // Check if data exists and is an array
    if (!data) {
      return res.status(400).json({
        is_success: false,
        error: "Missing 'data' field in request body"
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "'data' must be an array"
      });
    }

    // Handle very large arrays (prevent memory issues)
    if (data.length > 10000) {
      return res.status(400).json({
        is_success: false,
        error: "Array too large. Maximum 10,000 elements allowed."
      });
    }

    // Check for malformed JSON or circular references
    try {
      JSON.stringify(data);
    } catch (jsonError) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid data format. Cannot serialize input."
      });
    }

    // Process the data
    const { oddNumbers, evenNumbers, numbers } = processNumbers(data);
    const alphabets = processAlphabets(data);
    const specialCharacters = processSpecialCharacters(data);
    const sum = calculateSum(numbers);
    const concatString = createConcatString(alphabets);

    
    const userInfo = {
      user_id: "aaryaa_vit_14022004", 
      email: "aaryaanagarajasastry@gmail.com", 
      roll_number: "22BRS1179"
    };

    // Construct response
    const response = {
      is_success: true,
      user_id: userInfo.user_id,
      email: userInfo.email,
      roll_number: userInfo.roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum,
      concat_string: concatString
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing request:', error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid JSON format"
      });
    }
    
    if (error instanceof RangeError) {
      return res.status(400).json({
        is_success: false,
        error: "Input data out of range"
      });
    }
    
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
      message: error.message
    });
  }
});

// Handle 404 for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Route not found"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    is_success: false,
    error: "Internal server error",
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`BFHL API Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

// Export for serverless platforms like Vercel
module.exports = app;