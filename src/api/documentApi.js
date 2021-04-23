export async function getDocument(userId) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/document/${userId}`,
    {
    method: "GET"
    }
  );

  return await response.json();
}

export async function postDocument(documentInfo) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/document`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(documentInfo)
    }
  );

  return await response.json();
}

export async function deleteDocument() {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/document`
  );
}
