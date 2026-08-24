import { NextResponse } from 'next/server'

// Placeholder handler. Swap the TODO for a real provider (Resend, Buttondown,
// ConvertKit, a database write) — the shape of the response should not change.
export async function POST(request: Request) {
  let email: unknown

  try {
    const body = await request.json()
    email = (body as { email?: unknown })?.email
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    )
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  // TODO: persist the subscriber.
  console.log(`[subscribe] ${email}`)

  return NextResponse.json(
    { success: true, message: 'You are on the list. See you tomorrow morning.' },
    { status: 200 }
  )
}
