#!/bin/bash

##################################################################################################################
# Build and upload ui kit to S3
#
# This script builds style guide and uploads the bundle to S3, generating a public URL similar to this:
# "https://gs-public-resources.s3.amazonaws.com/ui-kit/dev/branch_name/index.html".
#
# This script uses AWS CLI (`aws`) and assumes that AWS CLI is already configured.
#
# These variables are required in order to build and upload ui kit bundle:
# * AWS_S3_UIKIT_BUCKET — name of the bucket on AWS S3
# * AWS_S3_UIKIT_PATH — remote path to a directory where ui kit should be uploaded (e.g. ui-kit)
# * Other variables required by AWS CLI to operate
#   (see https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
##################################################################################################################

set -eu

BUNDLE_SUBDIR="styleguide"
DEV_PATH_INFIX="dev"

# deploy to s3://gs-public-resources/ui_kit/ by default
AWS_S3_UIKIT_BUCKET="${AWS_S3_UIKIT_BUCKET:-gs-public-resources}"
AWS_S3_UIKIT_PATH="${AWS_S3_UIKIT_PATH:-ui_kit}"

# if $BRANCH isn't defined, default to "refs/heads/master"
BRANCH="$(git symbolic-ref HEAD)"
if [[ "$BRANCH" == "refs/heads/master" ]]; then
    TARGET_PATH="$AWS_S3_UIKIT_PATH/master"
else
    TARGET_PATH="$AWS_S3_UIKIT_PATH/$DEV_PATH_INFIX/$BRANCH"
fi

TARGET_S3_URL="s3://$AWS_S3_UIKIT_BUCKET/$TARGET_PATH"
HTML_URL="https://$AWS_S3_UIKIT_BUCKET.s3.amazonaws.com/$TARGET_PATH/index.html"

npm ci
npm run build

echo "Syncing '$BUNDLE_SUBDIR' to '$TARGET_S3_URL'..."

aws s3 sync "$BUNDLE_SUBDIR" "$TARGET_S3_URL" \
    --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers \
    --delete

echo "Synced successfully, see $HTML_URL"
