FROM node:14-alpine

WORKDIR /src

ADD package.json /src 

RUN npm i --silent

ADD . /src 

# RUN npm run build 

CMD npm run dev

# docker run -p 5000:5000 -v ${PWD}:/src socketbrick