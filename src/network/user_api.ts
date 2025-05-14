interface signUpBody {
  email: string;
  username: string;
  password: string;
}

interface loginBody {
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

interface loginResponseData {
  username: string;
  email: string;
}

interface loginResponseBody {
  message: string;
  data: loginResponseData;
}

export async function login(data: loginBody): Promise<{
  status: number;
  message: string;
  data: loginResponseData;
}> {
  const response = await fetch("http://localhost:9000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  const responseStatusCode = response.status;
  const responseJson: loginResponseBody = await response.json();
  return {
    status: responseStatusCode,
    message: responseJson.message,
    data: responseJson.data,
  };
}

export async function auth(): Promise<boolean> {
  const response = await fetch("http://localhost:9000/auth", {
    method: "GET",
    credentials: "include",
  });
  return response.ok;
}
