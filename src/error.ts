enum CustomErrors {
    NOT_FOUND,
    SERVER_ERROR,
    UNAUTHORIZED
}

class GroceryAppError extends Error {
    errorType: CustomErrors
    constructor(message: string, errorType: CustomErrors) {
        super(message)
        this.errorType = errorType
    }
}

const getStatusCodeFromError = (error: Error | GroceryAppError): number => {
    if (error instanceof GroceryAppError) {
      switch ((error as GroceryAppError).errorType) {
        case CustomErrors.NOT_FOUND: return 404
        case CustomErrors.SERVER_ERROR: return 500
        case CustomErrors.UNAUTHORIZED: return 401
        default: return 500
      }
    } else {
      return 500
    }
  }

  export { CustomErrors, GroceryAppError, getStatusCodeFromError }
// throw new Error('something went wrong')
// throw new GroceryAppError('something went wrong', CustomErrors.NOT_FOUND)