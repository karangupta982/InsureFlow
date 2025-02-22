# # Use an official Python 3.10 image from Docker Hub
# FROM python:3.10-slim-buster

# # Set the working directory inside docker image
# WORKDIR /app

# # Copy all your application code inside working image of docker
# COPY . /app

# # Install the dependencies install
# RUN pip install -r requirements.txt

# # Expose the port FastAPI will run on
# EXPOSE 5000

# # Command to run the FastAPI app
# CMD ["python3", "app.py"]
# # CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]











# # Use Python 3.10 as base image
# FROM python:3.10-slim-buster

# # Install Node.js
# RUN apt-get update && apt-get install -y curl
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get install -y nodejs

# # Set working directory
# WORKDIR /app

# # Copy Python and Node.js requirement files
# COPY requirements.txt package*.json ./

# # Create and activate virtual environment
# RUN python -m venv venv
# ENV PATH="/app/venv/bin:$PATH"

# # Install Python dependencies in virtual environment
# RUN pip install --no-cache-dir -r requirements.txt

# # Install Node.js dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port your Express app runs on
# EXPOSE 5000

# # Command to run the Node.js server
# CMD ["npm", "start"]










## pandas not installed error since requirements were not 
## getting fulfilled 

# # Use Python 3.10 as base image
# FROM python:3.10-slim-buster

# # Install Node.js
# RUN apt-get update && apt-get install -y curl
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get install -y nodejs

# # Set working directory
# WORKDIR /app

# # Copy project configuration files first
# COPY setup.py pyproject.toml ./

# # Copy requirements and package files
# COPY requirements.txt package*.json ./

# # Copy the source code
# COPY src/ ./src/

# # Copy the rest of the application code
# COPY . .

# # Create and activate virtual environment
# RUN python -m venv venv
# ENV PATH="/app/venv/bin:$PATH"

# # Upgrade pip and install build tools
# RUN pip install --upgrade pip
# RUN pip install --no-cache-dir setuptools wheel

# # Install Python dependencies including the local package
# RUN pip install --no-cache-dir -e .

# # Install Node.js dependencies
# RUN npm install

# # Expose the port your Express app runs on
# EXPOSE 5000

# # Command to run the Node.js server
# CMD ["npm", "start"]










# Deepseek
# Use miniconda base image
FROM continuumio/miniconda3:latest

# Install Node.js and npm using n version manager
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y build-essential && \
    curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n -o n && \
    bash n lts && \
    npm install -g n && \
    n stable && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # Verify installations
    node --version && \
    npm --version

# Set working directory
WORKDIR /app

# Copy package files for Node.js
COPY package*.json ./

# Install Node.js dependencies first
RUN npm install

# Create Conda environment with Python 3.10
RUN conda create -n vehicle python=3.10 -y

# Copy Python requirement files
COPY requirements.txt setup.py pyproject.toml ./

# Install Python dependencies
SHELL ["conda", "run", "-n", "vehicle", "/bin/bash", "-c"]
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install -e .

# Copy the rest of the application
COPY . .

# Add Conda environment to PATH
ENV PATH=/opt/conda/envs/vehicle/bin:$PATH

# Add build arguments for environment variables
ARG MONGODB_URL
ENV MONGODB_URL=$MONGODB_URL

# Expose the port for Express.js server
EXPOSE 5000

# Command to start the Node.js server
CMD ["node", "server.js"]


