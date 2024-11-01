# Setup

## Setting Keycloak container

```sh
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.0.5 start-dev
```

## Configuring Keycloak

1. Login to your keycloak (http://localhost:8080 if local)
2. Create realm (top left button) and give it a name

![realm creation](./public/setups/realm_creation.png)

3. Clients > create client
   - General Settings
     - Client type = OpenID Connect
     - Client ID = whatever you want
   - Capability config
     - enable **Client authentication**
     - enable **Standard flow**
   - Login settings
     - Valid redirect URIs = "http://localhost:3000/\*"
4. Clients > <your_newly_created_client> > Credentials

   - Copy Client Secret and save it as **KEYCLOAK_SECRET** in .env file

5. Create user and set password

6. Update <realm_name> in .env file to your created realm name

7. npm i

8. npm run dev
