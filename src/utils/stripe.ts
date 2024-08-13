import { loadStripe, Stripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

export const stripePromise: Promise<Stripe | null> = loadStripe(STRIPE_PUB_KEY);