import { connect } from "@/database/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists!" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password!" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      password: user.password,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const loginResponse = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    loginResponse.cookies.set("token", token, {
      httpOnly: true,
    });

    return loginResponse;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
