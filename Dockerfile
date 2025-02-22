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


