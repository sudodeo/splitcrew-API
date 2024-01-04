import logger from "../config/loggerConfig.js";
import currenciesModel from "../models/currencies.model.js";

const getCurrencies = async (_req, res) => {
  try {
    const currencies = await currenciesModel.getCurrencies();
    res.status(200).json({ currencies });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "internal server error",
    });
    logger.error(`currenciesController error: ${error}`);
  }
};

export default { getCurrencies };