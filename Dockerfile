# syntax=docker/dockerfile:1.28
#
# @genestack/ui, the Genestack UI kit library, and its styleguide site. The build context is
# this repo, filtered by .dockerignore. The Makefile builds these targets:
#
#   libraries-upload  publishes the library (dist/) to Nexus, with NEXUS_USER and NEXUS_PASSWORD
#   ui-kit-upload     syncs the styleguide site to S3, with AWS_ACCESS_KEY_ID and
#                     AWS_SECRET_ACCESS_KEY
#   test              the build plus `npm run test`
#
# The upload stages and test build on the same `build` stage, so `test` checks what the
# uploads ship. The uploads run no tests.

ARG NODE_IMAGE=node:22.23.5-alpine
ARG PYTHON_IMAGE=python:3.12.16-slim

FROM ${NODE_IMAGE} AS deps

WORKDIR /app

# The manifests come before the source, so a source-only change reuses the installed
# node_modules layer.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM deps AS build

COPY . .

# styleguidist builds the site into styleguide/, webpack the library into dist/.
RUN npm run build \
 && npm run build:bundle

FROM build AS test

RUN npm run test

FROM build AS libraries-upload

ARG NEXUS_REPOSITORY_URL
ARG NPM_REGISTRY_RELEASES

# Nexus takes the user and password as basic auth on every repository under
# NEXUS_REPOSITORY_URL. The .npmrc that holds them is removed before the layer is saved.
RUN --mount=type=secret,id=NEXUS_USER,env=NEXUS_USER \
    --mount=type=secret,id=NEXUS_PASSWORD,env=NEXUS_PASSWORD \
    : "${NEXUS_REPOSITORY_URL:?is not set}" "${NPM_REGISTRY_RELEASES:?is not set}" \
 && npm config set "//${NEXUS_REPOSITORY_URL}/:_auth=$(printf '%s:%s' "${NEXUS_USER}" "${NEXUS_PASSWORD}" | base64 | tr -d '\n')" \
 && npm publish --@genestack:registry="${NPM_REGISTRY_RELEASES}" \
 && rm ~/.npmrc

FROM ${PYTHON_IMAGE} AS ui-kit

WORKDIR /app

COPY requirements.txt ./
RUN --mount=type=cache,target=/root/.cache/pip \
    python3 -m pip install -r requirements.txt

COPY --from=build /app/styleguide styleguide

FROM ui-kit AS ui-kit-upload

ARG AWS_S3_UIKIT_BUCKET=gs-public-resources
ARG AWS_S3_UIKIT_PATH=ui_kit
# The git ref the site is built from, such as refs/heads/develop.
ARG BRANCH

RUN --mount=type=secret,id=AWS_ACCESS_KEY_ID,env=AWS_ACCESS_KEY_ID \
    --mount=type=secret,id=AWS_SECRET_ACCESS_KEY,env=AWS_SECRET_ACCESS_KEY \
    : "${BRANCH:?is not set}" \
 && target_path=${AWS_S3_UIKIT_PATH}/${BRANCH} \
 && aws s3 sync styleguide "s3://${AWS_S3_UIKIT_BUCKET}/${target_path}" \
    --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers \
    --delete \
 && echo "Synced successfully, see https://${AWS_S3_UIKIT_BUCKET}.s3.amazonaws.com/${target_path}/index.html"
