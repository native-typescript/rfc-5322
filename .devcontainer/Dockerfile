ARG DEBIAN__DOCKER_IMAGE__TAG__DATE
FROM debian:stable-${DEBIAN__DOCKER_IMAGE__TAG__DATE}-slim AS developing
ARG DEBIAN__DOCKER_IMAGE__TAG__DATE
ENV DEBIAN__DOCKER_IMAGE__TAG__DATE=${DEBIAN__DOCKER_IMAGE__TAG__DATE}
USER root
RUN useradd -m -s /bin/bash developer
RUN mkdir /home/developer/rfc-5322
RUN chown developer:developer /home/developer/rfc-5322
RUN apt-get update && apt-get install -y --no-install-recommends git
RUN apt-get update && apt-get install -y --no-install-recommends openssh-client
RUN apt-get update && apt-get install -y --no-install-recommends curl xz-utils ca-certificates
ARG NODE_JS__VERSION
ENV NODE_JS__VERSION=${NODE_JS__VERSION}
RUN curl -fsSL https://nodejs.org/dist/v${NODE_JS__VERSION}/node-v${NODE_JS__VERSION}-linux-x64.tar.xz -o /tmp/node.tar.xz
RUN tar -xJf /tmp/node.tar.xz -C /tmp
RUN cp -r /tmp/node-v${NODE_JS__VERSION}-linux-x64/* /usr/local/
RUN rm -rf /tmp/node.tar.xz /tmp/node-v${NODE_JS__VERSION}-linux-x64
USER developer
