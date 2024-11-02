# Setup

### Run postgrest, postgres, keycloak services by running docker-compose file

```sh
docker-compose up
```

## Configuring Keycloak

1. Login to keycloak
2. Create a new realm (top left button)

![realm creation](./public/setups/realm_creation.png)

3. **Clients** > **create client**
   - General Settings
     - Client type = **OpenID Connect**
     - Client ID = **<your_client_id>**
   - Capability config
     - enable **Client authentication**
     - enable **Standard flow**
   - Login settings
     - Valid redirect URIs = **"http://localhost:3000/\*"**
4. **Clients** > **<your_newly_created_client>** > **Credentials**

   - Copy Client Secret and save it as **KEYCLOAK_SECRET** in .env file

5. Create user and set password

6. Update <realm_name> in .env file to your created realm name

7. npm i

8. npm run dev
