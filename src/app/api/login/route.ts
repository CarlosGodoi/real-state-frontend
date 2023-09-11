import { NextRequest, NextResponse } from "next/server";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { decode } from "jsonwebtoken";
import { addHours } from "date-fns";

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  try {
    const response = await api.post("/sessions", {
      email: data.email,
      senha: data.senha,
    });

    const result = NextResponse.json(
      {
        ...response.data,
      },
      {
        status: 200,
      }
    );

    result.cookies.set("usuario", JSON.stringify(response.data.usuario));
    result.cookies.set("token", response.data.token);
    // result.cookies.set("refresh",refresh)

    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      // console.log("response =>",error.response?.data)
      return NextResponse.json(
        { error: error.response?.data.error },
        { status: error.response?.status }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  let token = req.cookies.get("token")?.value as string;
  let refreshToken = req.cookies.get("refresh")?.value as string;

  const decoded = decode(token) as {
    role: string;
    sub: string;
    iat: number;
    exp: number;
  };
  const now = Date.now();
  const expiresIn = new Date(
    addHours(new Date(decoded.exp * 1000), -3)
  ).getTime();

  if (expiresIn < now) {
    const refresh = await api.post(
      "token/refresh",
      {
        refreshTokenRequest: token,
      },
      {
        headers: {
          Cookies: `refreshToken=${refreshToken};`,
        },
      }
    );
    token = refresh.data.token;

    req.cookies.set("token", token);
  }

  try {
    const response = await api.get("/me", {
      ...data,
      headers: { Authorization: `Bearer ${token}` },
      params: searchParams,
    });
    console.log(response);

    const result = NextResponse.json(
      {
        ...response.data,
      },
      {
        status: 200,
      }
    );

    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      return NextResponse.json(
        { error: error.response?.data.error },
        { status: error.response?.status }
      );
    }
  }
}
