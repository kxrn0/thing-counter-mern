export default async function count(amount, id, token, dispatch) {
  const response = await fetch(`http://localhost:9999/api/counters/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });
  const json = await response.json();
  const { counter } = json;

  if (response.ok) {
    dispatch({
      type: "COUNT",
      payload: { counterId: counter._id, count: counter.count },
    });

    return counter;
  } else {
    console.log("Error trying to count!");
    throw new Error("Error updating counter!");
  }
}
