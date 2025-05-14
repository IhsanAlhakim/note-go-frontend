interface signUpBody {
  email: string;
  username: string;
  password: string;
}

interface responseBody {
  message: string;
}

export async function signUp(data: signUpBody): Promise<{
  status: number;
  message: string;
}> {
  const response = await fetch("http://localhost:9000/create/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseStatusCode = response.status;
  const responseJson: responseBody = await response.json();
  return {
    status: responseStatusCode,
    message: responseJson.message,
  };
}
