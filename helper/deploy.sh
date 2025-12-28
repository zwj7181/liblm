#!/bin/bash

# Parse arguments
RELEASE=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -r|--release) RELEASE=true ;;
    esac
    shift
done

# Build the project
if [ "$RELEASE" = true ]; then
    cargo build --release
    BUILD_MODE="release"
else
    cargo build
    BUILD_MODE="debug"
fi
echo BUILD_MODE $BUILD_MODE
DIST_PATH="dist"
mkdir -p $DIST_PATH

TARGET="target/$BUILD_MODE"
VERSION=$(cat $TARGET/version.txt)

for BIN in $TARGET/*; do
    BASENAME=$(basename $BIN)
    if [[ $BASENAME == *"client"* && -x $BIN ]]; then
        COPY_PATH="$DIST_PATH/${BASENAME}-$VERSION"
        cp $BIN $COPY_PATH
        # scp $COPY_PATH root@local:/root/.noah/lm-fe-libs/serve_pack
    fi
done