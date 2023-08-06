import User from "@/models/User";
import connect from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export async function POST(request: Request, res: NextApiResponse<any>) {
  const body = await request.json();
  const newUser = new User(body);
  try {
    await connect();
    await newUser.save();
    return NextResponse.json({message:"Signup completed!"},{ status:201})
  } catch (err: any) {
    return NextResponse.json({error: err}, {status: 500})
  }
};
export const GET = async (request: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await connect();
    User.collection.dropIndex("id_1");
    const allPost = await User.collection.find({}).toArray();
    return  NextResponse.json({allPost}, {status: 201})
  } catch (err) {
    return NextResponse.error()
  }
};
