/**
 * Validates the request using express-validator
 * Returns JSON response with failure status and error messages if validation fails.
 */

import logger from "./logger"

export function validationFailedResponse(errors, res) {
    logger.info("Validation failed for the request")
    return res.status(400).json({
        success: false,
        errors: errors.array()
    });
}

