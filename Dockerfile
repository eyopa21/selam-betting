# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.18.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION} as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

COPY package.json .
# Install pnpm.
RUN corepack enable
RUN corepack prepare
################################################################################
# Create a stage for building the application.

FROM base as deps

COPY pnpm-lock.yaml .npmrc ./


# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
pnpm install --frozen-lockfile





FROM deps as build 

COPY . . 


# FIXME: Temporary fix for `nuxt build` running out memory (i.e. Heap memory allocation limit)
ENV NODE_OPTIONS="--max-old-space-size=2560"
RUN pnpm run build

FROM base as final

# Use production node environment by default.
ENV NODE_ENV production
ENV NUXT_REST_API_ENDPOINT=http://162.55.223.95:8000/betting/api/v1
ENV NUXT_PUBLIC_FINANCE_API_ENDPOINT=http://162.55.223.95:8000/finance/api/v1
ENV NUXT_SERVER_API_KEY=RUDKb1iueBuAtFhYGKQxyXhSc2rVKYxe5TNIuTxtEDv6o2jcefPb6p7jXeZlu_LgHExd-_USDVruUS2LjHrSnTOXQnrhIrw9vHLlg7eJDNg
ENV NUXT_BASE_API_ENDPOINT=http://162.55.223.95:8000
ENV NUXT_PUBLIC_BASE_IMAGE_URL=http://162.55.223.95:8000
ENV NUXT_PUBLIC_WEB_SOCKET_ENDPOINT=ws://162.55.223.95:8000/user_notification/
# Run the application as a non-root user.
USER node


# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=build /usr/src/app/.output ./.output


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node", ".output/server/index.mjs"]
