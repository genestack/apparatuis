VERSION 0.6

ARG --required DOCKER_REGISTRY_GROUP
ARG --required NEXUS_USER
ARG --required NEXUS_PASSWORD
ARG --required NPM_REGISTRY_GROUP
ARG --required NEXUS_REPOSITORY_URL
ARG --required AWS_SECRET_ACCESS_KEY
ARG --required AWS_ACCESS_KEY_ID

deps:
    FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:latest

    ENV NEXUS_USER=${NEXUS_USER}
    ENV NEXUS_PASSWORD=${NEXUS_PASSWORD}
    ENV NPM_REGISTRY_GROUP=${NPM_REGISTRY_GROUP}
    ENV NEXUS_REPOSITORY_URL=${NEXUS_REPOSITORY_URL}
    ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}

    COPY package.json package-lock.json ./
    RUN npm-login.sh && npm install

    SAVE IMAGE --cache-hint

test:
    FROM +deps

    COPY . .
    RUN run build && npm test

    SAVE IMAGE --cache-hint

publish-ui:
    FROM +test

    RUN npm publish

    SAVE IMAGE --cache-hint

publish-preview:
  FROM +test

  RUN ./scripts/build_and_s3upload.sh
