ARG DOCKER_REGISTRY_GROUP

FROM ${DOCKER_REGISTRY_GROUP}/genestack-base-node16-builder:latest

COPY . .

RUN npm publish
