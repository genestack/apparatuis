VERSION 0.6

ARG --required DOCKER_REGISTRY_GROUP
ARG --required NEXUS_USER
ARG --required NPM_REGISTRY_GROUP
ARG --required NEXUS_REPOSITORY_URL
ARG --required AWS_ACCESS_KEY_ID

deps:
    FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:2ce8405-SNAPSHOT

    COPY package.json package-lock.json ./
    RUN --secret NEXUS_PASSWORD \
        npm-login.sh && \
        npm install

    SAVE IMAGE --cache-hint

build:
    FROM +deps

    COPY . .
    RUN \
        npm run test && \
        npm run build && \
        npm run build:bundle

    SAVE IMAGE --cache-hint

publish-ui:
    FROM +build

    RUN --push \
        --secret NEXUS_PASSWORD \
        npm-login.sh && \
        npm publish

publish-preview:
  FROM +build

  ARG BUNDLE_SUBDIR=styleguide
  ARG DEV_PATH_PREFIX=dev
  ARG AWS_S3_UIKIT_BUCKET=gs-public-resources
  ARG AWS_S3_UIKIT_PATH=ui_kit
  ARG BRANCH=$(git symbolic-ref HEAD)

  IF [ ${BRANCH} == "refs/heads/master" ]
      ARG TARGET_PATH=${AWS_S3_UIKIT_PATH}/master
  ELSE
      ARG TARGET_PATH=${AWS_S3_UIKIT_PATH}/${DEV_PATH_PREFIX}/${BRANCH}
  END

  ARG TARGET_S3_URL=s3://${AWS_S3_UIKIT_BUCKET}/${TARGET_PATH}
  ARG HTML_URL=https://${AWS_S3_UIKIT_BUCKET}.s3.amazonaws.com/${TARGET_PATH}/index.html

  RUN --push --secret AWS_SECRET_ACCESS_KEY \
      aws s3 sync ${BUNDLE_SUBDIR} ${TARGET_S3_URL} \
      --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers \
      --delete && \
      echo "Synced successfully, see ${HTML_URL}"