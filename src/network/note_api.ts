export async function getNotes() {
  const response = await fetch(
    "http://localhost:9000/notes?userId=680f440987ebc6d2ed945b1c",
    {
      method: "GET",
    }
  );
  return response.json();
}
