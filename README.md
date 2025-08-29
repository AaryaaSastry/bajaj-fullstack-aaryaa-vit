# BFHL REST API

![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![Express](https://img.shields.io/badge/Express-4.18.2-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

A robust REST API built with Node.js and Express that processes arrays of mixed data types and returns categorized results according to BFHL specifications.

## 🚀 Live Demo

**API Endpoint:** `POST /bfhl`  
**Status:** ✅ Production Ready

## 📋 Features

- **Data Processing**: Separates numbers, alphabets, and special characters
- **Mathematical Operations**: Calculates sum of numbers (returned as string)
- **String Manipulation**: Creates concatenated strings with reverse and alternating case
- **Robust Error Handling**: Comprehensive validation and graceful error responses
- **Security**: CORS support, request timeouts, and size limits
- **Scalability**: Handles arrays up to 10,000 elements
- **Deployment Ready**: Configured for Vercel, Railway, and Render

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Validation**: Custom input validation with edge case handling
- **Security**: CORS middleware, request size limits, timeouts
- **Deployment**: Vercel/Railway/Render compatible

## 📡 API Specification

### Endpoint
```
POST /bfhl
```

### Request Format
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### Response Format
```json
{
  "is_success": true,
  "user_id": "aaryaa_vit_14022004",
  "email": "aaryaanagarajasastry@gmail.com",
  "roll_number": "22BRS1179",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## 🧪 Example Usage

### Example A: Mixed Data
**Request:**
```json
{
  "data": ["a","1","334","4","R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "aaryaa_vit_14022004",
  "email": "aaryaanagarajasastry@gmail.com",
  "roll_number": "22BRS1179",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Example B: Complex Array
**Request:**
```json
{
  "data": ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "aaryaa_vit_14022004",
  "email": "aaryaanagarajasastry@gmail.com",
  "roll_number": "22BRS1179",
  "odd_numbers": ["5"],
  "even_numbers": ["2","4","92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

### Example C: Full Alphabetic Strings
**Request:**
```json
{
  "data": ["A","ABcD","DOE"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "aaryaa_vit_14022004",
  "email": "aaryaanagarajasastry@gmail.com",
  "roll_number": "22BRS1179",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A","ABCD","DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AaryaaSastry/bajaj-fullstack-aaryaa-vit.git
   cd bajaj-fullstack-aaryaa-vit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Server will be running at**
   ```
   http://localhost:3000
   ```

### Testing the API

#### Using curl:
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

#### Using Thunder Client (VS Code):
1. Install Thunder Client extension
2. Create POST request to `http://localhost:3000/bfhl`
3. Set Content-Type to `application/json`
4. Add request body with test data

## 📊 API Logic

### Data Processing Rules

1. **Numbers**: 
   - Extracted and categorized as odd/even
   - Always returned as strings
   - Sum calculated and returned as string

2. **Alphabets**: 
   - Individual characters converted to uppercase
   - Full alphabetic strings preserved as units
   - Processed for concatenation logic

3. **Special Characters**: 
   - Any non-alphanumeric characters
   - Extracted and preserved as-is

4. **Concatenation String**:
   - Join all alphabets → Reverse → Apply alternating caps
   - First character uppercase, second lowercase, etc.

### Error Handling

- **400 Bad Request**: Invalid input format or missing data
- **408 Request Timeout**: Request takes longer than 30 seconds
- **413 Payload Too Large**: Request body exceeds 1MB
- **500 Internal Server Error**: Server-side processing errors

## 🌐 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Railway
1. Connect GitHub repository to Railway
2. Deploy automatically on push

### Render
1. Connect GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`

## 🧪 Edge Cases Handled

- ✅ Null and undefined values
- ✅ Empty strings and whitespace
- ✅ Non-string data types
- ✅ Very large arrays (10,000+ elements)
- ✅ Very large numbers (overflow protection)
- ✅ Malformed JSON and circular references
- ✅ Request timeouts and size limits
- ✅ Mixed data types in single request

## 📁 Project Structure

```
bajaj-fullstack-aaryaa-vit/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lock file
├── vercel.json           # Vercel deployment config
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## 🔧 Environment Variables

No environment variables required for basic functionality. The server runs on:
- **PORT**: Defaults to 3000 locally, auto-configured on hosting platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Aaryaa Sastry**
- GitHub: [@AaryaaSastry](https://github.com/AaryaaSastry)
- Email: aaryaanagarajasastry@gmail.com
- Roll Number: 22BRS1179
- Institution: VIT

## 🙏 Acknowledgments

- Built for BFHL API requirements
- Optimized for production deployment
- Comprehensive error handling and edge case coverage

---

**⭐ Star this repository if you find it helpful!**
