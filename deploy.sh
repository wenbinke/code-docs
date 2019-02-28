#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build docs

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:wenbinke/code-docs.git master:gh-pages

cd -