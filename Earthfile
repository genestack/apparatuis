VERSION 0.6

ARG --required DOCKER_REGISTRY_GROUP

publish-preview:
  FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:latest
  COPY . .
  RUN ./scripts/build_and_s3upload.sh

publish-ui:
  FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:latest
  COPY . .
  RUN npm publish
