from pypdf import PdfReader
import json
import os

# Read Primary Resume PDF (Ankit-Pramanik-DevOps-5Y-Resume.pdf)
resume_paths = [
    "./data/Ankit-Pramanik-DevOps-5Y-Resume.pdf",
    "./data/resume.pdf",
    "./data/linkedin.pdf"
]

resume = ""
for path in resume_paths:
    if os.path.exists(path):
        try:
            reader = PdfReader(path)
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    resume += text + "\n"
            if resume.strip():
                break
        except Exception as e:
            print(f"Error reading {path}: {e}")

if not resume:
    resume = "Resume details not available"

linkedin = resume  # backwards-compatible alias

# Read other data files
with open("./data/summary.txt", "r", encoding="utf-8") as f:
    summary = f.read()

with open("./data/style.txt", "r", encoding="utf-8") as f:
    style = f.read()

with open("./data/facts.json", "r", encoding="utf-8") as f:
    facts = json.load(f)