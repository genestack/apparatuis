VERSION 0.7

ARG --global --required DOCKER_REGISTRY_GROUP
ARG --global --required NPM_REGISTRY_GROUP
ARG --global --required NPM_REGISTRY_RELEASES
ARG --global --required NPM_REGISTRY_SNAPSHOTS
ARG --global --required NEXUS_REPOSITORY_URL

deps:
    ARG --required BASE_IMAGES_VERSION
    FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:${BASE_IMAGES_VERSION}

    COPY package.json package-lock.json ./
    RUN \
        --secret NEXUS_PASSWORD \
        --secret NEXUS_USER \
            npm-login.sh && \
            npm install

build:
    FROM +deps

    COPY . .
    RUN \
        --secret NEXUS_PASSWORD \
        --secret NEXUS_USER \
            npm-login.sh && \
            npm run test && \
            npm run build && \
            npm run build:bundle

publish-ui:
    FROM +build

    RUN --push \
        --secret NEXUS_PASSWORD \
        --secret NEXUS_USER \
            npm-login.sh && \
            npm publish

publish-preview:
    FROM +build

    ARG BUNDLE_SUBDIR=styleguide
    ARG DEV_PATH_PREFIX=dev
    ARG AWS_S3_UIKIT_BUCKET=gs-public-resources
    ARG AWS_S3_UIKIT_PATH=ui_kit
    ARG BRANCH=$(git symbolic-ref HEAD)

    ARG TARGET_PATH=${AWS_S3_UIKIT_PATH}/${BRANCH}
    ARG TARGET_S3_URL=s3://${AWS_S3_UIKIT_BUCKET}/${TARGET_PATH}
    ARG HTML_URL=https://${AWS_S3_UIKIT_BUCKET}.s3.amazonaws.com/${TARGET_PATH}/index.html

    RUN --push \
        --secret AWS_ACCESS_KEY_ID \
        --secret AWS_SECRET_ACCESS_KEY \
            aws s3 sync ${BUNDLE_SUBDIR} ${TARGET_S3_URL} \
            --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers \
            --delete && \
            echo "Synced successfully, see ${HTML_URL}"


main:
    BUILD +publish-ui
    BUILD +publish-preview
