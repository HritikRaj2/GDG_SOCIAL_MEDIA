# Use Java 17 as the base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Expose the port
EXPOSE 5050

# Run the application
CMD ["java", "-jar", "target/GDG_Community_Blog_Platform-0.0.1-SNAPSHOT.jar"] 