//@ts-ignore
export const handleLogout = (navigate) => {
  try {
    localStorage.removeItem("token");
    navigate("/");
  } catch (e) {
    console.error("Error while logging out", e);
  }
};
