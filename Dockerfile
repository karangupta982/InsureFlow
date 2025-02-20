# Use an official Python 3.10 image from Docker Hub
FROM python:3.10-slim-buster

# Set the working directory inside docker image
WORKDIR /app

# Copy all your application code inside working image of docker
COPY . /app

# Install the dependencies install
RUN pip install -r requirements.txt

# Expose the port FastAPI will run on
EXPOSE 5000

# Command to run the FastAPI app
CMD ["python3", "app.py"]
# CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]