#!/bin/bash

DATE=$(date +"%Y-%m-%d_%H-%M")

mkdir -p backups

tar -czf backups/coveweave-$DATE.tar.gz \
data \
public/uploads

echo "Backup finished: backups/coveweave-$DATE.tar.gz"
