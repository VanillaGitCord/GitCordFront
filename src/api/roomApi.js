export async function getNewRoomId(payload) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}
