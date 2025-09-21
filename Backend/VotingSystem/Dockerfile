# 1. Build stage
FROM maven:3.9.8-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# 2. Runtime stage
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built JAR from builder
COPY --from=builder /app/target/VotingSystem-0.0.1-SNAPSHOT.jar app.jar

# Expose port (match your application.properties, usually 8080)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
