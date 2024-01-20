const MONGO_DB_CONFIG = {
  DB: "mongodb+srv://tewodrosm01:teddy2024@cluster0.mpkxgrs.mongodb.net/?retryWrites=true&w=majority",
  PAGE_SIZE: 10,
  BCRYPT_PASSWORD: "man who u are",
  SALT_ROUND: 10,
  TOKEN_KEY: "10",
};

const STRIPE_CONFIG = {
  STRIPE_KEY:
    "sk_test_51MfrXREloCBQ1gam70iIgVmGO2I0MKcCo0isQ9fOVleImORN9tbtGxiN6TAuTJzdkCl9IPzmWZc6GtJHUQBFb1YK002WRwlces",
  CURRENCY: "inr",
};

export { MONGO_DB_CONFIG, STRIPE_CONFIG };
