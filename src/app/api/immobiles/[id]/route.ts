import api from "@/services/api";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, { params }: IParams) {
  const data = await req.json();
  const token = req.cookies.get("token")?.value;

  try {
    const response = await api.put(
      `/imovel/${params.id}`,
      {
        preco: data.preco,
        tipoContrato: data.tipoContrato,
        status: data.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const refresh = response.headers["set-cookie"]?.toString().split(";")[0].split("=")[1] as string

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
      console.log("response =>", error);
      return NextResponse.json(
        { error: error.response?.data.error },
        { status: error.response?.status }
      );
    }
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  const token = req.cookies.get("token")?.value;
  console.log(token);

  try {
    const response = await api.delete(`/imovel/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // const refresh = response.headers["set-cookie"]?.toString().split(";")[0].split("=")[1] as string

    const result = NextResponse.json({
      status: 200,
    });

    result.cookies.set("usuario", JSON.stringify(response.data.usuario));
    result.cookies.set("token", response.data.token);
    // result.cookies.set("refresh",refresh)

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
