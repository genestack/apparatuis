ARG DOCKER_REGISTRY_GROUP

FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:latest

COPY . .

RUN npm publish
