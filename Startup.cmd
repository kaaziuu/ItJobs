ECHO =======START IT JOBS=======
cd Docker 
START docker-compose -f ./ItJobsDocker.yml up
timeout 10
cd ..
cd ItJobs
START mvnw spring-boot:run
cd ..
cd JsApps/it-jobs
START npm run start:dev