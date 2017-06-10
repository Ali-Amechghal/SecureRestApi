curl --data "{\"username\":\"ali_\", \"password\":\"ali\"}" -H "Content-Type:application/json" http://localhost:3000/login
#replace x-access-token value with result of login
curl -H "Content-Type:application/json" \
      -H "x-access-token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTcxMDc4MzMxMDJ9.KQcD1qbGL5fZG7Fnm6EJXRrMqoKnKvZFpZ8k3MNn14I" \
      http://localhost:3000/api/v1/products
