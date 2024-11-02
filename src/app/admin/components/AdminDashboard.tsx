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
  const dataProvider = postgrestRestProvider({
    apiUrl: POSTGREST_API_URL,
    httpClient: fetchUtils.fetchJson,
    defaultListOp: "eq",
    primaryKeys: defaultPrimaryKeys,
    schema: defaultSchema,
  });

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="todolist"
        list={ListGuesser}
        edit={EditGuesser}
        create={PostCreate}
      />
    </Admin>
  );
};

export default AdminDashboard;
