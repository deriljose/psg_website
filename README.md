# PSG Fan Website

A modern web application built with React and Vite, developed during my internship at Orion Innovation.

> ⚠️ This is an unofficial fan website and has no affiliation with Paris Saint-Germain Football Club.

## Features

- Responsive and user-friendly interface  
- Fast performance with Vite bundler  
- Modular React component structure  
- Dynamic content rendering  
- Environment variable support  
- Admin panel to edit website content  
- Uses MongoDB Atlas to store and retrieve website content

## Getting Started

### Prerequisites

- Node.js (v16 or higher)  
- npm or yarn

### Installation

```bash
npm install
```

### Running the App
For development (with hot reload):
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).
 
For production build:
```bash
npm run build
```
### Running the Backend

```bash
node server.js
```

## Environment Variables

Create a `.env` file in the root directory with your MongoDB Atlas user password:

```
DB_PASSWORD=your_db_password
```

## Technologies Used

- React
- Vite
- MongoDB Atlas
