import Stripe from "stripe";
import dotenv from "dotenv";
import {
  CustomerParams,
  AddCardParams,
  PaymentIntentParams,
} from "../interface/stripe.interface";

dotenv.config();
const { STRIPE_KEY, CURRENCY } = process.env;

const stripe_key = STRIPE_KEY!;
const stripeClient = new Stripe(stripe_key, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const stripeService = {
  createCustomer: async (
    customerParams: CustomerParams,
  ): Promise<Stripe.Customer> => {
    try {
      const customer = await stripeClient.customers.create({
        name: customerParams.name,
        email: customerParams.email,
      });
      return customer;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  addCard: async (
    addCardParams: AddCardParams,
    customer_id: string,
  ): Promise<string> => {
    try {
      const cardToken = await stripeClient.tokens.create({
        card: {
          name: addCardParams.card_Name,
          number: addCardParams.card_Number,
          exp_month: addCardParams.card_ExpMonth,
          exp_year: addCardParams.card_ExpYear,
          cvc: addCardParams.card_CVC,
        },
      }); // specify type of argument
      const card = await stripeClient.customers.createSource(customer_id, {
        source: `${cardToken.id}`,
      });

      return card.id;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  generatePaymentIntent: async (paymentIntentParams: PaymentIntentParams) => {
    try {
      const createPaymentIntent = await stripeClient.paymentIntents.create({
        receipt_email: paymentIntentParams.receipt_email,
        amount: paymentIntentParams.amount * 100,
        currency: CURRENCY!,
        payment_method: paymentIntentParams.card_id,
        customer: paymentIntentParams.customer_id,
        payment_method_types: ["card"],
      });

      return createPaymentIntent;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },
};

export default stripeService;
