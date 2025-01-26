# Base image
FROM node:20-alpine

RUN apk add --no-cache libreoffice

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# Expose the Express port
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]