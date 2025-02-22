---

# 🚀 **InsureFlow - MLOps & MERN Stack Project**

InsureFlow is an end-to-end vehicle insurance prediction system built using MLOps principles and the MERN stack. This project implements a fully automated machine learning pipeline integrated with a modern web interface, enabling users to input vehicle details and get accurate insurance predictions. It also includes a robust CI/CD pipeline for continuous integration and deployment.

---

## 📖 **Table of Contents**
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Setup Instructions](#setup-instructions)
5. [MongoDB Atlas Setup](#mongodb-atlas-setup)
6. [ML Pipeline Workflow](#ml-pipeline-workflow)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## 🌟 **Project Overview**

InsureFlow is designed to predict vehicle insurance eligibility based on multiple input features using machine learning models. The project follows an MLOps pipeline, covering data ingestion, data validation, data transformation, model training, model evaluation, model pusher,  deployment. The front end allows users to submit their details and view predictions in real-time, while the backend handles data processing and model inference.

---

## ⚙️ **Tech Stack**

### **MLOps (Python)**
- **Core Libraries:** ipykernel, pandas, numpy, matplotlib, plotly, seaborn, scikit-learn, pymongo, from_root, dill, certifi, PyYAML, imblearn, joblib, python-dotenv
- **Database:** MongoDB Atlas
- **Pipeline:** Docker Image, Docker Hub, GitHub Actions, CI/CD
- **Deployment:** Render, Docker Hub, Vercel

### **MERN Stack (Web App)**
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🚀 **Features**

- 📊 **End-to-End ML Pipeline:** Automated pipeline for data processing, model training, evaluation, and deployment.
- 🔄 **Continuous Integration & Deployment:** GitHub Actions trigger the CI/CD pipeline on every push to the main branch.
- 🌐 **MERN Web App:** User-friendly interface for inputting vehicle details and receiving insurance predictions.
- 📦 **Dockerized Deployment:** Both the app and model are containerized for consistent environments.
- 🔐 **Database Integration:** MongoDB Atlas for seamless data storage and retrieval.
- 📈 **Model Management:** Only the best-performing model is stored and used for prediction.

---

## 🛠️ **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/karangupta982/InsureFlow.git
cd insureflow
```

### **2. Create a Virtual Environment and Install Dependencies**

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate    # For Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```env
MONGODB_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"
```

### **4. MongoDB Atlas Setup**

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a project and cluster (M0 service).
3. Set up a DB user and IP access (`0.0.0.0/0`).
4. Get the connection string and update the `.env` file.

---

## 🔄 **ML Pipeline Workflow**

1. **Data Ingestion:** Extracts data from MongoDB into a DataFrame.
2. **Data Validation:** Checks schema consistency using `config.schema.yaml`.
3. **Data Transformation:** Prepares the data for model training.
4. **Model Training:** Builds and evaluates multiple models.
5. **Model Evaluation:** Compares models and selects the best one.
6. **Model Pusher:** Deploys the best model to `my-model-mlopsproj` for inference.

---

## 🚀 **CI/CD Pipeline**

1. **Dockerization:** Built Docker images for both the backend and ML pipeline.
2. **GitHub Actions:** Configured workflows in `.github/workflows/aws.yaml` to automate builds and deployments.
3. **Docker Hub:** Pushed Docker images to the Docker Hub repository.
4. **Pipeline Trigger:** Every push to the main branch triggers the CI/CD pipeline.

---

## 🌍 **Deployment**

- **Backend:** Deployed on [Render](https://render.com/) using `npm start` to launch the server.
- **Frontend:** Deployed on [Vercel](https://vercel.com/).
- **Database:** MongoDB Atlas stores all user inputs and predictions.

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit changes and push to your branch.
4. Create a pull request.

---

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🎬 **Live Demo**

- **Frontend:** [https://insureflow.vercel.app](https://insure-flow-frontend.vercel.app/)
- **Backend API:** [https://insureflow-api.onrender.com](https://insureflow-1.onrender.com)

---

💡 **Developed with ❤️ by [Karan gupta](https://github.com/karangupta982)**  
✉️ **Contact:** gupta.karan.gh@gmail.com

---
