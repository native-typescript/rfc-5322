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
USER developer
