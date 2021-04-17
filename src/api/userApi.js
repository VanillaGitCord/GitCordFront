export async function sendNewUser(newUser) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
  });

  return await response.json();
}
