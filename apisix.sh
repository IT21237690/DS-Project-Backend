curl -X PUT http://127.0.0.1:9180/apisix/admin/upstreams/1 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
	  "type": "roundrobin",
	  "nodes": {
	    "service1:5000": 1
	  }
}'


curl -X PUT http://127.0.0.1:9180/apisix/admin/upstreams/2 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
	  "type": "roundrobin",
	  "nodes": {
	    "service2:5001": 1
	  }
}'


curl -X PUT http://127.0.0.1:9180/apisix/admin/upstreams/3 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
	  "type": "roundrobin",
	  "nodes": {
	    "service3:5002": 1
	  }
}'


curl -X PUT http://127.0.0.1:9180/apisix/admin/upstreams/4 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
	  "type": "roundrobin",
	  "nodes": {
	    "service4:5003": 1
	  }
}'





curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/1 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/user/login",
          "methods": ["POST", "OPTIONS"],
          "upstream_id": "1",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        
curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/2 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/user/register",
          "methods": ["POST", "OPTIONS"],
          "upstream_id": "1",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/3 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/user/getuser/*",
          "methods": ["GET", "OPTIONS"],
          "upstream_id": "1",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
               


 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/4 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/user/getins/*",
          "methods": ["GET", "OPTIONS"],
          "upstream_id": "1",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
 
             
             
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/5 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/user/enroll/*",
          "methods": ["POST", "OPTIONS"],
          "upstream_id": "2",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        

 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/6 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/course/add",
          "methods": ["POST", "OPTIONS"],
          "upstream_id": "3",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
                   
           
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/7 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/course/allCourses",
          "methods": ["GET", "OPTIONS"],
          "upstream_id": "3",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
           
           
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/8 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/course/get/*",
          "methods": ["GET", "OPTIONS"],
          "upstream_id": "3",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/9 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/course/update/*",
          "methods": ["PATCH", "OPTIONS"],
          "upstream_id": "3",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        
        
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/10 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/course/delete/*",
          "methods": ["DELETE", "OPTIONS"],
          "upstream_id": "3",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        
        
        
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/11 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/orders/*/capture/*",
          "methods": ["POST", "OPTIONS"],
          "upstream_id": "4",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
        
        
 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/12 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/orders/*",
          "methods": ["POST", "OPTIONS"],
          "upstream_id": "4",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'


 curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/13 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/user/admin/*/approve",
          "methods": ["PUT", "OPTIONS"],
          "upstream_id": "1",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'


curl -i -X PUT http://127.0.0.1:9180/apisix/admin/routes/14 \
     -H 'X-API-KEY: ds' \
     -H 'Content-Type: application/json' \
     -d '{
          "uri": "/api/course/download/*/*",
          "methods": ["GET", "OPTIONS"],
          "upstream_id": "3",
          "plugins": {
            "cors": {
              "allow_origin": ["http://localhost:3000"],
              "allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
              "allow_headers": "Content-Type,Authorization",
              "allow_credentials": true
            }
          }
        }'
           


           
           
           




