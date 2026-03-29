# 📐 Quantity Measurement Application – Frontend  
## Modern UI for Conversion, Comparison, and Quantity Operations

---

## 📖 About the Project

The **Quantity Measurement Application – Frontend** is built to provide a simple, clean, and user-friendly interface for working with measurement-based operations.

Using this application, users can perform:

- Quantity comparison  
- Quantity conversion  
- Mathematical operations on measurable values  

This frontend is implemented in **two separate ways** to explore different development styles:

- **Vanilla HTML, CSS, and JavaScript**
- **Angular with TypeScript**

---

## 🎯 Main Goals

This project is created to focus on:

- Writing clean and readable frontend code  
- building reusable and maintainable UI modules  
- improving core frontend fundamentals  
- understanding both basic and framework-based frontend development  
- organizing code in a scalable way  

---

## 🏗️ Working Flow

```text
User Action
   │
   ▼
Frontend Input Processing
   │
   ▼
Event / Function Execution
   │
   ▼
API Request / Mock Server Call
   │
   ▼
Response Received
   │
   ▼
DOM / UI Rendering
```

---

## 🌿 Branch Strategy

This repository contains multiple frontend implementations of the same application.

### Available branches

- `main` → stable production-ready code
- `dev` → active development branch
- `feature/frontend-vanilla-html-css-js` → frontend built using core web technologies
- `feature/frontend-angular` → frontend built using Angular

---

# 🌐 Vanilla Frontend Implementation

## Branch
`feature/frontend-vanilla-html-css-js`

### Purpose

This branch is used to build the application with **plain HTML, CSS, and JavaScript**.  
The main idea is to strengthen frontend basics and understand UI behavior without any framework abstraction.

### Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- JSON Server

### Sample Folder Structure

```text
frontend/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── api.js
│   └── utils.js
└── data/
    └── db.json
```

### Core Features

- quantity conversion interface
- comparison handling
- arithmetic operation support
- fetch-based API communication
- input validation
- responsive layout support
- dynamic content updates

### Run Instructions

```bash
git checkout feature/frontend-vanilla-html-css-js
npx json-server --watch data/db.json --port 3000
```

Then open `index.html` in your browser.

### Learning Outcomes

- DOM manipulation
- browser event handling
- modular JavaScript coding
- API calls using Fetch
- frontend structure without frameworks

---

# ⚡ Angular Frontend Implementation

## Branch
`feature/frontend-angular`

### Purpose

This branch focuses on building the same project using **Angular** for a more structured, scalable, and component-driven frontend architecture.

### Technologies Used

- Angular
- TypeScript
- RxJS
- Angular CLI
- REST API integration

### Sample Folder Structure

```text
src/
│
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── app-routing.module.ts
│   └── app.module.ts
│
├── assets/
└── environments/
```

### Core Features

- component-based UI structure
- service-based API communication
- reusable modules
- unit conversion workflow
- reactive handling with RxJS
- maintainable code organization

### Run Instructions

```bash
git checkout feature/frontend-angular
npm install
ng serve
```

Open in browser:

```text
http://localhost:4200
```

### Learning Outcomes

- Angular component design
- TypeScript-based frontend development
- service architecture
- observable-based data flow
- scalable application structure

---

## ✅ Engineering Practices Followed

- Clean Code
- Reusability
- Modular Development
- Separation of Concerns
- Feature-Oriented Branching
- Maintainable Folder Structure

---

## 🚀 Possible Improvements

Future versions of this frontend can include:

- JWT authentication
- OAuth2 login support
- Angular route guards
- improved UI styling
- state management integration
- advanced validation
- performance tuning
- better accessibility support

---

## 📌 Summary

This repository is a frontend-focused implementation of the **Quantity Measurement Application**, built in two different ways for learning and real project structuring:

- one with **Vanilla Web Technologies**
- one with **Angular**

The goal is not only to build the same UI in two styles, but also to understand how frontend architecture changes with different tools and approaches.