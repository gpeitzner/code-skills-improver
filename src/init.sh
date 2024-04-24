#!/bin/bash

# Prompt the user for the environment variables
read -p "Enter the value for REACT_APP_API_URL: " REACT_APP_API_URL
read -p "Enter the value for DB_USER: " DB_USER
read -p "Enter the value for DB_PASSWORD: " DB_PASSWORD
read -p "Enter the value for DB_NAME: " DB_NAME

# Write the environment variables to the .env file
echo "REACT_APP_API_URL=${REACT_APP_API_URL}" > .env
echo "DB_USER=${DB_USER}" >> .env
echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
echo "DB_NAME=${DB_NAME}" >> .env
