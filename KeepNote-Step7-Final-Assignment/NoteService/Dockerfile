FROM java:8-jre
WORKDIR /usr/src
ENV MONGO_HOST=localhost
ADD ./target/NoteService-0.0.1-SNAPSHOT.jar /usr/src/NoteService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "NoteService-0.0.1-SNAPSHOT.jar"]
