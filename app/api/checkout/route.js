import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://your-domain.vercel.app?success=true',
    cancel_url: 'https://your-domain.vercel.app?canceled=true',
  })

  return Response.json({ url: session.url })
}
