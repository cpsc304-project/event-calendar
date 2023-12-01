import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const price_data = { currency: "cad", product_data: { name: req.body.event_name + " ticket" }, unit_amount: req.body.ticket_price };

			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
						price_data: price_data,
						quantity: 1,
					},
				],
				mode: "payment",
				success_url: `${req.headers.origin}/checkout_complete/webhook?success=true`,
				cancel_url: `${req.headers.origin}/dashboard/get-tickets/${req.body.event_id}?canceled=true`,
			});
			res.redirect(303, session.url!);
		} catch (err: any) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
