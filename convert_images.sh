#!/bin/bash
cd "$(dirname "$0")/images" || exit 1
mkdir -p ../images_new
for f in *.png *.PNG *.jpg *.JPG *.jpeg *.JPEG; do
  [ -e "$f" ] || continue
  base="${f%.*}"
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  if [ "$w" -gt 2000 ]; then
    sips --resampleWidth 2000 "$f" >/dev/null
  fi
  sips -s format jpeg -s formatOptions 80 "$f" --out "../images_new/$base.jpg" >/dev/null
  echo "done: $base.jpg"
done
echo "ALL DONE ✅"
