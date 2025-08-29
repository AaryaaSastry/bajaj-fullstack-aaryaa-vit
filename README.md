

# 🚀 BFHL Challenge REST API

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/aaryaanagarajasastry-1742s-projects/bajaj-fullstack-aaryaa-vit)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AaryaaSastry/bajaj-fullstack-aaryaa-vit)

![API Status](https://img.shields.io/badge/API-Live-success?style=flat-square)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-v18%2B-green?style=flat-square)

**🎯 Production-grade REST API for intelligent data processing and categorization**  
*Built for the Bajaj Finserv Health Limited Full Stack Developer Challenge*

[📖 Documentation](#api-specification) • [🚀 Quick Start](#quick-start) • [🌐 Live Demo](#live-deployment) • [🧪 Testing](#testing-guide) • [📊 Examples](#response-examples)


## 📊 Overview

This REST API processes mixed data arrays and returns **structured categorical results** with advanced string manipulation. It features **error handling, input validation**, and **optimized performance** for production environments.

### 🎯 Challenge Requirements Met
- ✅ **POST /bfhl endpoint** with structured request/response
- ✅ **Data categorization** (numbers, alphabets, special characters)
- ✅ **Mathematical operations** (sum, odd/even classification)
- ✅ **String manipulation** (concatenation with alternating case)
- ✅ **Error handling** and input validation
- ✅ **Production-ready deployment**

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔢 Smart Data Processing | Separates numbers, alphabets, and special characters with precision |
| 🧮 Mathematical Operations | Calculates sum of numbers and categorizes odd/even efficiently |
| 🔤 Advanced String Manipulation | Creates alternating-case concatenated strings |
| 🛡️ Robust Error Handling | Comprehensive validation with meaningful error responses |
| 🚀 Production Ready | Optimized for Vercel, Railway, and Render deployment |
| ⚡ High Performance | Handles large datasets efficiently |
| 🔒 Security Focused | Request size limits, timeout protection, and input sanitization |

---

## 📋 API Specification

### 🔗 Base URL
```

[https://your-app.vercel.app](https://your-app.vercel.app)

````

### 📡 Endpoint
```http
POST /bfhl
Content-Type: application/json
````

### 📥 Request Format

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### 📤 Response Format

```json
{
  "is_success": true,
  "user_id": "aaryaa_sastry_29082003",
  "email": "aaryaa.sastry2021@vitstudent.ac.in",
  "roll_number": "21BCE0389",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### 📋 Response Fields

| Field                | Type    | Description                                         |
| -------------------- | ------- | --------------------------------------------------- |
| `is_success`         | boolean | Indicates if the request was processed successfully |
| `user_id`            | string  | Unique identifier                                   |
| `email`              | string  | Student email address                               |
| `roll_number`        | string  | Student roll number                                 |
| `odd_numbers`        | array   | Numbers that are odd (as strings)                   |
| `even_numbers`       | array   | Numbers that are even (as strings)                  |
| `alphabets`          | array   | Alphabetic characters (uppercase)                   |
| `special_characters` | array   | Non-alphanumeric characters                         |
| `sum`                | string  | Sum of all numbers                                  |
| `concat_string`      | string  | Alphabets concatenated, reversed, alternating case  |

---

## 🚀 Quick Start

### 📋 Prerequisites

* Node.js v18+
* npm v8+
* Git

### ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/AaryaaSastry/bajaj-fullstack-aaryaa-vit.git
cd bajaj-fullstack-aaryaa-vit

# Install dependencies
npm install

# Start the development server
npm start
# or
npm run dev
```

Verify the server:

```bash
curl http://localhost:3000/bfhl -X POST \
  -H "Content-Type: application/json" \
  -d '{"data": ["test"]}'
```

---

## 📝 API Logic & Algorithms

### 🔢 Data Processing Rules

1. **Number Processing**: Odd/even categorization, sum calculation, returned as strings
2. **Alphabet Processing**: Uppercase conversion and storage in `alphabets` array
3. **Special Characters**: Extracted into `special_characters` array
4. **String Concatenation**: Concatenate all alphabets → reverse → alternating case

---

## 🛡️ Error Handling

| Error Type           | HTTP Code | Description                        |
| -------------------- | --------- | ---------------------------------- |
| Missing `data` field | 400       | Must include `data` in request     |
| Invalid data type    | 400       | `data` must be an array            |
| Null/undefined       | 400       | `data` cannot be null or undefined |
| Empty body           | 400       | Request body required              |
| Array too large      | 413       | Exceeds 10,000 elements            |
| Request too large    | 413       | Body exceeds 1MB                   |
| Timeout              | 408       | Request exceeds 30 seconds         |
| Internal error       | 500       | Unexpected server error            |

---

## 🧪 Testing Guide

### 📊 Test Cases

**Valid Input Example**

```bash
curl -X POST http://localhost:3000/bfhl \
-H "Content-Type: application/json" \
-d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

**Edge Case**

```bash
curl -X POST http://localhost:3000/bfhl \
-H "Content-Type: application/json" \
-d '{"data": ["a", null, "1", undefined, "", "R"]}'
```

**Error Case**

```bash
curl -X POST http://localhost:3000/bfhl \
-H "Content-Type: application/json" \
-d '{}'
```

---

## 🌐 Live Deployment

* **Vercel**: `vercel login` → `vercel`
* **Railway**: Connect GitHub → Deploy
* **Render**: Connect GitHub → Set build/start commands

---

## 📁 Project Structure

```
bajaj-fullstack-aaryaa-vit/
├── index.js          # Main Express server
├── package.json      # Dependencies and scripts
├── vercel.json       # Vercel config
├── test.js           # Test utilities
├── README.md         # Documentation
└── .gitignore        # Ignored files
```

---

## 📄 License

ISC License. See [LICENSE](LICENSE).

---

## 👨‍💻 Author

**Aaryaa Sastry**
*VIT University Student*
[GitHub](https://github.com/AaryaaSastry) • [Email](mailto:aaryaa.sastry2021@vitstudent.ac.in)
**Roll Number**: 21BCE0389
**Student ID**: aaryaa\_sastry\_29082003

---

<div align="center">

### 🎯 Built for Bajaj Finserv Health Limited Challenge

Made with ❤️ and ☕ for the Full Stack Developer Challenge

</div>
```

---

This version is **ready to paste directly** into your `README.md`.

It’s concise, professional, and formatted for **GitHub Markdown**, with badges, tables, and sections that render cleanly.

If you want, I can also **make a shorter “minimal” version** optimized for recruiters, so it’s easier to read in 1–2 minutes.

Do you want me to do that?


