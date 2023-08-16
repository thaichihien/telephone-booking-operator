#!/bin/sh

npm run build
npx prisma generate
npx prisma db push
node dist/main.js