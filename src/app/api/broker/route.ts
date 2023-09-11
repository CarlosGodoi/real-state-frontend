import { NextRequest, NextResponse } from "next/server";
import api from "@/services/api";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const response = await api.post("/users", {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      perfil: data.perfil,
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

    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("response =>", error);
      return NextResponse.json(
        { error: error.response?.data.error },
        { status: error.response?.status }
      );
    }
  }
}
