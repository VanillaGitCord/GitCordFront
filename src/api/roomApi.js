export async function getNewRoomId(newRoomInfo) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/room/newRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newRoomInfo)
  });

  return await response.json();
}
