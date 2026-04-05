from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import re
import pdfplumber

app = FastAPI()

# ---------------------------
# Skill Keywords (extendable)
# ---------------------------
SKILL_KEYWORDS = [
    "python", "java", "c", "c++", "javascript", "html", "css",
    "react", "node", "sql", "mysql", "machine learning",
    "ai", "deep learning", "git"
]

# ---------------------------
# Utility Functions
# ---------------------------

def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.lower()


def extract_email(text):
    match = re.findall(r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+", text)
    return match[0] if match else None


def extract_phone(text):
    match = re.findall(r"\b\d{10}\b", text)
    return match[0] if match else None


def extract_skills(text):
    found = []
    for skill in SKILL_KEYWORDS:
        if skill in text:
            found.append(skill)
    return found


def extract_experience(text):
    return "experience" in text or "intern" in text or "work" in text


# ---------------------------
# Local AI Feedback Generator
# ---------------------------

def generate_local_feedback(parsed_data, analysis):
    feedback = []

    skills = parsed_data.get("skills", [])
    has_experience = parsed_data.get("has_experience_section", False)
    email = parsed_data.get("email")
    phone = parsed_data.get("phone")

    # Skill-based suggestions
    if len(skills) < 5:
        feedback.append("Add more technical skills relevant to your field.")

    # Experience
    if not has_experience:
        feedback.append("Include work experience or internship details.")

    # Contact
    if not email:
        feedback.append("Add a valid email address.")
    if not phone:
        feedback.append("Add a phone number.")

    # ATS score-based suggestions
    final_score = analysis.get("final_score", 0)

    if final_score < 50:
        feedback.append("Resume is weak. Improve structure and include more keywords.")
    elif final_score < 75:
        feedback.append("Resume is moderate. Add more achievements and project details.")
    else:
        feedback.append("Resume is strong and ATS-friendly.")

    return feedback


# ---------------------------
# Resume Analysis
# ---------------------------

def analyze_resume(text):
    skills = extract_skills(text)

    skill_score = (len(skills) / len(SKILL_KEYWORDS)) * 100

    has_experience = extract_experience(text)
    experience_score = 100 if has_experience else 0

    email = extract_email(text)
    phone = extract_phone(text)

    contact_score = 0
    if email:
        contact_score += 50
    if phone:
        contact_score += 50

    completeness_score = 0
    if len(text.split()) > 100:
        completeness_score += 50
    if has_experience:
        completeness_score += 50

    final_score = (
        skill_score * 0.4 +
        experience_score * 0.25 +
        contact_score * 0.15 +
        completeness_score * 0.2
    )

    final_score = int(final_score)

    return {
        "skills_found": skills,
        "skill_score": int(skill_score),
        "experience_score": experience_score,
        "contact_score": contact_score,
        "completeness_score": completeness_score,
        "final_score": final_score
    }


# ---------------------------
# Upload Endpoint
# ---------------------------

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    try:
        # Read file
        contents = await file.read()

        # Save temporarily
        with open("temp_resume.pdf", "wb") as f:
            f.write(contents)

        # Extract text
        with open("temp_resume.pdf", "rb") as f:
            text = extract_text_from_pdf(f)

        # Parse data
        parsed_data = {
            "name": "Unknown",
            "email": extract_email(text),
            "phone": extract_phone(text),
            "skills": extract_skills(text),
            "has_experience_section": extract_experience(text)
        }

        # Analysis
        analysis = analyze_resume(text)

        # Local AI feedback
        ai_feedback = generate_local_feedback(parsed_data, analysis)

        return JSONResponse({
            "filename": file.filename,
            "parsed_data": parsed_data,
            "analysis": analysis,
            "ai_feedback": ai_feedback
        })

    except Exception as e:
        return JSONResponse({
            "error": str(e)
        }, status_code=500)


# ---------------------------
# Root Endpoint
# ---------------------------

@app.get("/")
def home():
    return {"message": "Resume Analyzer API is running"}