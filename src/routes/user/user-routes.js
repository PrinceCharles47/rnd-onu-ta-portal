import UserLayout from "../../pages/user/UserLayout";
import UsersListPage from "../../pages/user/UsersListPage";
import SettingsPage from "../../pages/user/SettingsPage";

export const userRoutes = {
  path: "/user",
  children: [
    {
      Component: UserLayout,
      children: [
        {
          path: "users-list",
          Component: UsersListPage,
        },
        {
          path: "settings",
          Component: SettingsPage,
        },
      ],
    },
  ],
};
