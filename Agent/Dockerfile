# Use the official Python image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY Agent/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/uploads

# Copy the Django project into the container
COPY . /app/

# Expose the Django development server port
EXPOSE 8000

# Run the Django development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
CMD [ "python", "main.py" ]
