# Build stage
FROM maven:3-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml first (for dependency caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/GDG_Community_Blog_Platform-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 5050

ENTRYPOINT ["java", "-jar", "app.jar"]