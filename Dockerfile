FROM node

ENV PORT 3000

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

# Build the Next.js application for production
RUN npm run build

COPY . .

EXPOSE $PORT

CMD [ "npm", "start" ]