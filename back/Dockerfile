# FROM openjdk:17-jdk-alpine as builder
# COPY ./tmp /app/tmp
# COPY ./target/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "/app.jar"]
# #

FROM openjdk:17-jdk-alpine as builder
RUN mkdir -p /app/source
COPY . /app/source
WORKDIR /app/source
RUN ./mvnw clean package

FROM eclipse-temurin:21-jdk-alpine
COPY ./tmp /tmp
COPY --from=builder /app/source/target/*.jar /app/app.jar
EXPOSE 8181
ENTRYPOINT ["java", "-jar", "/app/app.jar"]


# FROM openjdk:17-jdk-alpine as builder
# RUN mkdir -p /app/source
# COPY . /app/source
# WORKDIR /app/source
# RUN ./mvnw clean package
#
# FROM gcr.io/distroless/java21-debian12
# COPY ./tmp /app/tmp
# COPY --from=builder /app/source/target/*.jar /app/app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "/app/app.jar"]
