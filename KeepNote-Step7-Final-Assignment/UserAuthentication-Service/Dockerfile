FROM java:8-jre
WORKDIR /usr/src

ENV MYSQL_USER=note_user \
    MYSQL_DATABASE=assignment \
    MYSQL_HOST=localhost \
    MYSQL_PASSWORD=user@1234


ADD ./target/UserAuthentication-Service-0.0.1-SNAPSHOT.jar /usr/src/UserAuthentication-Service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "UserAuthentication-Service-0.0.1-SNAPSHOT.jar"]
