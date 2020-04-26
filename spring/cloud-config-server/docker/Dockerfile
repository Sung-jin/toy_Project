FROM openjdk:8-jdk-alpine
ARG BUILD_VERSION

ADD cloud-config-server-${BUILD_VERSION}.jar cloud-config-server.jar

EXPOSE 8888

ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /cloud-config-server.jar
