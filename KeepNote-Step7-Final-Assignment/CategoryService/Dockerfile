FROM java:8-jre
WORKDIR /usr/src
ENV MONGO_HOST=localhost
ADD ./target/CategoryService-0.0.1-SNAPSHOT.jar /usr/src/CategoryService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "CategoryService-0.0.1-SNAPSHOT.jar"]
