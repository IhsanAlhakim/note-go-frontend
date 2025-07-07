import { responseStatusOK } from "../errors/http_error";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface signUpData {
  email: string;
  username: string;
  password: string;
}

interface signUpAPIResponseBody {
  message: string;
}

export async function signUp(data: signUpData): Promise<{
  status: number;
  message: string;
}> {
  const response = await fetch(`${VITE_API_BASE_URL}/create/user`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseStatusCode = response.status;
  const responseJson: signUpAPIResponseBody = await response.json();
  return {
    status: responseStatusCode,
    message: responseJson.message,
  };
}

interface loginData {
  username: string;
  password: string;
}

interface loginAPIResponseData {
  username: string;
  email: string;
}

interface loginAPIResponseBody {
  message: string;
  data: loginAPIResponseData;
}

export async function login(data: loginData): Promise<{
  status: number;
  message: string;
  data: loginAPIResponseData;
}> {
  const response = await fetch(`${VITE_API_BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  const responseStatusCode = response.status;
  const responseJson: loginAPIResponseBody = await response.json();
  return {
    status: responseStatusCode,
    message: responseJson.message,
    data: responseJson.data,
  };
}

export async function logout(): Promise<{ status: number }> {
  const response = await fetch(`${VITE_API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  return {
    status: response.status,
  };
}

export async function deleteUser(): Promise<{ status: number }> {
  const response = await fetch(`${VITE_API_BASE_URL}/delete/user`, {
    method: "DELETE",
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  return {
    status: response.status,
  };
}

type getUserAPIResponseData = loginAPIResponseData;
type getUserAPIResponseBody = loginAPIResponseBody;

export async function getUser(): Promise<{
  data: getUserAPIResponseData | null;
  status: number;
}> {
  const response = await fetch(`${VITE_API_BASE_URL}/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return {
      data: null,
      status: response.status,
    };
  }

  const responseJson: getUserAPIResponseBody = await response.json();

  return {
    data: {
      username: responseJson.data.username,
      email: responseJson.data.email,
    },
    status: responseStatusOK,
  };
}
