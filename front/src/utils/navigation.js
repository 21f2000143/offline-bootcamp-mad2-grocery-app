function home(store, route, router) {
  const role = store.state.authenticatedUser.role;
  const targetRoute =
    role === "admin"
      ? "/admin"
      : role === "manager"
      ? "/manager"
      : role === "user"
      ? "/user"
      : "/";
  if (route.path !== targetRoute) {
    router.push(targetRoute);
  }
}

export default home;
