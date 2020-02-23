FROM java:8-jre
WORKDIR /usr/src
ENV HOST_NAME=localhost
ADD ./target/DiscoveryService-0.0.1-SNAPSHOT.jar /usr/src/DiscoveryService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "DiscoveryService-0.0.1-SNAPSHOT.jar"]
