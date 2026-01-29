#!/bin/sh
set -eux

echo "Running load test data..."
/app/.venv/bin/python3 load_test_data.py

echo "Starting FastAPI..."
exec /app/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8080
