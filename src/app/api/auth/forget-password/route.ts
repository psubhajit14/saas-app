export async function POST(request: Request) {
    return Response.json(
        { success: false, message: "Username already exist" },
        { status: 400 }
    )
}