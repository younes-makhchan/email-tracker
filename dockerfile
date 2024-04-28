FROM node:20-alpine 



# Create a user with permission to run the app
# -S system user
# -G  add user too group

RUN addgroup app&& adduser -S -G app app

# set the user to run the app
USER app

#set the working directory where out app will be installed
WORKDIR /app

#copy the package.json and package-lock.json to the working directory
#for cache
COPY package*.json ./


#chnage it  to root user to avoid EACCESS
USER root 

#chane the owner of the app directory to the app user
RUN chown -R app:app /app

#change the use back
USER app 

#install the dependencies
RUN npm install

#copy the rest of the files to the working directory
COPY . .

#Export port 3000 to tell docker that the container listens 
EXPOSE 3000

# command to run the app
CMD npm run start