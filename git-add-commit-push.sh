#!/bin/bash
# for adding, committing, and pushing to the origin

# get one argument from command line
# $1 is the commit message
# if no argument is given, then use the default message
if [ $# -eq 0 ]
  then
    echo "No commit message supplied"
    exit 1
fi

# add all files to git
git add .

# commit with the given message
git commit -m "$1"

# push to the origin
git push