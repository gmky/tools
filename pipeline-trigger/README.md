# TRIGGER - a tool to create Gitlab pipeline via API

## Prerequisite
  + jq
  + git
  + curl

## Usage
  ```shell
  trigger -h "http://gitlab.dsc.com" \
    -a "${CI_BOT_ACCESS_TOKEN}" \
    -u "/api/v4/projects" \
    -p "${TRIGGER_TOKEN}" \
    -o 1 \
    -b dev \
    -i 63 \
    -e STAGE=build \
    -e DOCKER_TAG=${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHORT_SHA}
  ```
## Options
  + h: Gilab host
  + a: Gitlab access token
  + u: API's endpoints
  + p: Trigger token
  + o: Toggle pipeline's output
  + b: branch to run pipeline
  + i: Gitlab group ID
  + e: passing variable to pipeline context