// now make a helper mtd for extract the information of token

import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfif"
connect();

export async function GET(request:NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({_id:userID}).select("-password -isAdmin") // find the user on the base of id
        console.log(user)

        return NextResponse.json({
            message:"user found",
            data:user,
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}