import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logoutResponse = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    logoutResponse.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    // logoutResponse.cookies.delete("token");

    return logoutResponse;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
