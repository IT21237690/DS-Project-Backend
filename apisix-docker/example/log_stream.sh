#!/bin/bash

while true; do
    docker exec -it e8bb6e1d085b tail -f /usr/local/apisix/logs/file.log >> /home/minidu-tissera/Desktop/Qbitum/apisix-docker/example/logfile.log
    sleep 1  # Adjust sleep duration if needed
done
