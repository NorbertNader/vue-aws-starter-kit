#!/bin/bash
FILES="dist/client/**/*"
for f in $FILES
do
  filename=$(basename -- "$f")
  extension="${filename##*.}"

  if [ "$extension" = "js" ]
  then
    contenttype="text/javascript"
  fi

    if [ "$extension" = "css" ]
  then
    contenttype="text/css"
  fi

  case "$extension" in
    "css"|"js")
      aws s3api put-object \
        --bucket vue-presentation-nnader \
        --key $extension/$filename \
        --body $f \
        --content-type $contenttype
    ;;
  esac
done

