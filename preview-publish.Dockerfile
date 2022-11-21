ARG DOCKER_REGISTRY_GROUP

FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:latest

COPY . .

RUN ./scripts/build_and_s3upload.sh
