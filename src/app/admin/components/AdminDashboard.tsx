"use client";

import {
  Admin,
  Create,
  EditGuesser,
  fetchUtils,
  ListGuesser,
  Resource,
  SimpleForm,
  TextInput,
} from "react-admin";
import postgrestRestProvider, {
  defaultPrimaryKeys,
  defaultSchema,
} from "@raphiniert/ra-data-postgrest";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="task" />
    </SimpleForm>
  </Create>
);

const AdminDashboard = ({
  POSTGREST_API_URL,
}: {
  POSTGREST_API_URL: string;
}) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.access_token) {
      localStorage.setItem("jwtToken", session.ac);
    }
  }, [session]);

  const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    // Set up headers if they don't exist yet
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }

    // Retrieve the JWT token from localStorage or other storage
    const token = localStorage.getItem("jwtToken");

    // If the token exists, add it to the Authorization header
    if (token) {
      // @ts-expect-error header prop
      options.headers.set("Authorization", `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
  };

  const dataProvider = postgrestRestProvider({
    apiUrl: POSTGREST_API_URL,
    httpClient,
    defaultListOp: "eq",
    primaryKeys: defaultPrimaryKeys,
    schema: defaultSchema,
  });

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="todos"
        list={ListGuesser}
        edit={EditGuesser}
        create={PostCreate}
      />
    </Admin>
  );
};

export default AdminDashboard;
