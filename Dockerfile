FROM public.ecr.aws/docker/library/node:18

WORKDIR /usr/src/

COPY . .
COPY package*.json ./

RUN npm install
RUN pwd

EXPOSE 80
ENV NODE_ENV=production
CMD ["npm", "run", "start"]