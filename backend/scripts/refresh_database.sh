#!/bin/bash          
echo Start Executing Fit Nest SQL create commands.

cockroach sql --database=fit_nest_db --insecure < refresh_database.sql