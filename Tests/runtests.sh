#!/usr/bin/env bash
echo -e "\nPython tests:\n" && python3 Tests/postTest.py && echo -e "\nJavascript tests:\n" && npx jest && echo -e "\nRuby tests:\n"&& ruby Tests/test_add_user.rb
