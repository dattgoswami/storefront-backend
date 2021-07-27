FROM node

WORKDIR .

COPY . .

RUN npm install

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
RUN ["npm","install","-g","db-migrate"]
CMD ["npm", "run", "watch"]