# NITK SportsMate

NITK SportsMate is a web-based Sports Facility Booking and Management Platform built to simplify the booking of sports infrastructure at NITK. It provides an efficient user interface for users to book infrastructure and admins to manage bookings.

## 🚀 Project Overview
NITK SportsMate allows users to book various sports facilities on campus and provides admins with tools to manage bookings, view statistics, and handle infrastructure requests.

## ✅ Features
- **User Authentication & Authorization** (Using Clerk)
- **Role Based Authentication** (Using Clerk)
- **Booking Infrastructure** (Infrastructure-specific booking slots)
- **Admin Dashboard** (Booking management, statistics view)
- **Reminders via Email** (Using Resend API)

## 🔧 Tech Stack
### Frontend
- **React** (Vite, JavaScript, Tailwind CSS v4)
- **UI Libraries:** ShadCN, Asternity UI, Lucide React, Recharts
- **State Management:** Redux Toolkit
- **Forms Handling:** React Hook Form

### Backend
- **Node.js**, **Express**
- **MongoDB**
- **Authentication:** Clerk
- **Mailing Service:** Resend

## 📁 Folder Structure
```
NITK_SportsMate/
├── Backend/
|    ├──src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── utils/
│       ├── index.js
│       ├── app.js
│       ├── dbConnect.js
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   ├── index.css
│   └── public/
├── package.json
├── README.md
```

## 🖥️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Locally or via MongoDB Atlas)
- [NPM](https://www.npmjs.com/)

### Backend Setup
1. Clone the repository
```
git clone https://github.com/Devgambo/IRIS_Web_Rec25_231CV240.git
```
2. Navigate to the backend folder
```
cd NITK_SportsMate/Backend
```
3. Install dependencies
```
npm install
```
4. Create a `.env` file with the following variables:
```
PORT=5000
MONGO_URI=<Your_MongoDB_URI>
CORS_ORIGIN=<localhost where forntend is running>
CLERK_SECRET_KEY=<Your_Clerk_Secret_Key>
RESEND_API_KEY=<Your_Resend_API_Key>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<api key>
CLOUDINARY_API_SECRET=<api secret>
```
5. Start the server
```
npm run dev
```

### Frontend Setup
1. Navigate to the frontend folder
```
cd ../Frontend
```
2. Install dependencies
```
npm install
```
3.create a `.env` file
```
VITE_CLERK_PUBLISHABLE_KEY=<clerk_api_key>
```
4. Start the React development server
```
npm run dev
```

## 📊 Usage
- Users can book sports facilities for specific timeslots, and Equipments for any perticular day on anytime.
- Admins can manage bookings, and view statistics.
- Reminder will be sent 30 mins before the booked infrastructure timeslote
- Users can cancel their req any time.
- All the pending and approved requests will be shown in student dashboard
- All the cancelled , rejected and completed requests will be shown in history tab.

## Future features
- Waitlist for booking infrastructure
- Improving the admin statistics page
- Panelty system for students damaging the infra or equipments

## Schema relation diagram:
![Screenshot 2025-03-31 183029](https://github.com/user-attachments/assets/a00b4ed2-b5fd-40ff-9ce3-101f7c40fa78)

## Vedio of me explaining all the features:)
### [Watch this video on YouTube](https://youtu.be/i9yWtDvJu_0)

## Screenshots:)
![Screenshot 2025-03-31 221826](https://github.com/user-attachments/assets/e7ccffec-e2a8-4232-8c61-559de034af35)
![Screenshot 2025-03-31 222006](https://github.com/user-attachments/assets/9a5865fd-511a-4e04-91d0-2341aa237914)

## BUGS
- I haven't deployed the project , so the reminder is not working as RESEND needs domane name and can't work in localhost.
- 



