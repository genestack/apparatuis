# Setting SHELL to bash allows bash commands to be executed by recipes.
# Options are set to exit when a recipe line exits non-zero or a piped command fails.
SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

# CI sets IMAGE_VERSION in every build. Nothing here reads it: npm publishes the library at
# package.json's version.
IMAGE_VERSION          ?= 1.0.0
# The S3 folder of the styleguide site: the git ref of the checkout, such as refs/heads/develop.
BRANCH                 ?= $(shell git symbolic-ref HEAD 2>/dev/null)

.PHONY: main
main: push

##@ General

# The help target prints out all targets with their descriptions organized
# beneath their categories. The categories are represented by '##@' and the
# target descriptions by '##'. The awk command is responsible for reading the
# entire set of makefiles included in this invocation, looking for lines of the
# file as xyz: ## something, and then pretty-format the target and help. Then,
# if there's a line with ##@ something, that gets pretty-printed as a category.
# More info on the usage of ANSI control characters for terminal formatting:
# https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters
# More info on the awk command:
# http://linuxcommand.org/lc3_adv_awk.php

.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Build

.PHONY: push
push: libraries ui-kit ## Publish the library to Nexus and the styleguide site to S3, without tests.

# In CI the Vault step writes every secret to .secret and the Nexus repositories to .arg in
# the checkout (teamcity-main's templates/Vault.kt).
.PHONY: libraries
libraries: ## Publish @genestack/ui at package.json's version to NPM_REGISTRY_RELEASES from .arg, with NEXUS_USER and NEXUS_PASSWORD from .secret.
	@if [ -f .secret ]; then set -a; . ./.secret; set +a; fi; \
	if [ -f .arg ]; then set -a; . ./.arg; set +a; fi; \
	docker buildx build \
	--target=libraries-upload \
	--build-arg=NEXUS_REPOSITORY_URL \
	--build-arg=NPM_REGISTRY_RELEASES \
	--secret=id=NEXUS_USER,env=NEXUS_USER \
	--secret=id=NEXUS_PASSWORD,env=NEXUS_PASSWORD \
	--no-cache-filter=libraries-upload \
	--output=type=cacheonly \
	.

.PHONY: ui-kit
ui-kit: ## Sync the styleguide site to s3://gs-public-resources/ui_kit/BRANCH, with AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from .secret.
	@if [ -f .secret ]; then set -a; . ./.secret; set +a; fi; \
	docker buildx build \
	--target=ui-kit-upload \
	--build-arg=BRANCH=$(or $(BRANCH),$(error BRANCH is not set)) \
	--secret=id=AWS_ACCESS_KEY_ID,env=AWS_ACCESS_KEY_ID \
	--secret=id=AWS_SECRET_ACCESS_KEY,env=AWS_SECRET_ACCESS_KEY \
	--no-cache-filter=ui-kit-upload \
	--output=type=cacheonly \
	.

.PHONY: test
test: ## Build the library and the styleguide site, then run npm run test on them.
	docker buildx build \
	--target=test \
	--output=type=cacheonly \
	.
