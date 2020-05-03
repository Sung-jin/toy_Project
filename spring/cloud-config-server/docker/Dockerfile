FROM openjdk:8-jdk-alpine
ARG BUILD_VERSION

ADD cloud-config-server-${BUILD_VERSION}.jar cloud-config-server.jar
ADD cloud-config-server /root/.ssh/id_rsa
ADD config /root/.ssh/config

RUN apk add --no-cache openssh-client && ssh-keyscan github.com > /root/.ssh/known_hosts

EXPOSE 8888

ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /cloud-config-server.jar
