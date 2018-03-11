FROM ruby:2.4

RUN mkdir -p /home/rails/SoloMess
WORKDIR /home/rails/SoloMess

RUN apt-get update && apt-get install -y nodejs mysql-client mysql-server