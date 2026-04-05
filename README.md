# 🧠 AI Resume Builder

AI-powered full-stack resume builder that allows users to create, edit, optimize, and download resumes with intelligent suggestions and scoring.

---

## 🚀 Live Demo

- 🌐 Frontend: https://ai-resume-9yo0fd1z3-maitri08-clouds-projects.vercel.app/
- ⚙️ Backend: https://resumebackend-lpe7.onrender.com

---

## ✨ Features

- Create and edit resumes with multiple sections:
  - Personal Details
  - Education
  - Experience
  - Projects
  - Skills
  - Achievements
- 🤖 AI-based suggestions:
  - Bullet point improvements
  - Skill recommendations
  - Resume summary generation
- 📊 Resume scoring system
- 📥 Download resume as PDF
- 💾 Auto-save using local storage
- 🎨 Multiple templates (Classic, Modern)
- 🧩 Real-time preview

---

## 🛠 Tech Stack

Frontend: React (Vite), TypeScript, Tailwind CSS, ShadCN UI, React Router  
Backend: FastAPI (Python)

---

## 📦 Project Structure

ai-resume-pro/
├── frontend/ # React Vite app
├── backend/ # FastAPI backend
├── vercel.json


---

## ⚙️ Setup Instructions

cd ai-resume-pro

---

### Clone the repository

git clone https://github.com/maitri08-cloud/ai-resume-pro.git

---

### Frontend setup

cd frontend
npm install
npm run dev

---

### Backend setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload


---

## 🚀 Deployment

- Frontend deployed on Vercel
- Backend deployed on Vercel (FastAPI)
- Routing handled via `vercel.json`

---

## 📌 Notes

- AI suggestions are mock-based (no external AI API required)
- Resume data is stored locally in the browser
- No environment variables required for frontend in current setup
- Backend endpoints are routed via Vercel experimental services

---

## 👨‍💻 Author

Maitri Kulkarni

---

## 📄 License
MIT License
