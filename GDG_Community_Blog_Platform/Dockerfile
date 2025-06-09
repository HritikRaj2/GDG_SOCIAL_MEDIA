# Build stage
FROM maven:3-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-alpine
WORKDIR /app
COPY --from=build /app/target/GDG_Community_Blog_Platform-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5050
ENTRYPOINT ["java", "-jar", "app.jar"] 