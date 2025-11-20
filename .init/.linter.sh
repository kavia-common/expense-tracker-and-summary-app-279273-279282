#!/bin/bash
cd /home/kavia/workspace/code-generation/expense-tracker-and-summary-app-279273-279282/expense_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

