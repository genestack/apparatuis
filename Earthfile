VERSION 0.6

IMPORT ./packages/ui-proxy AS ui-proxy

ARG --required DOCKER_REGISTRY_GROUP

publish-preview:
  COPY . .
  RUN ./scripts/build_and_s3upload.sh

publish-ui:
  COPY . .
  RUN npm publish
