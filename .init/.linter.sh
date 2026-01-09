#!/bin/bash
cd /home/kavia/workspace/code-generation/mobile-phone-specs-hub-197169-197178/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

