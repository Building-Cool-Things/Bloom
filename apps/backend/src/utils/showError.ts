import { ErrorHandler } from "../helpers/ErrorHandler";

export default function showError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
  if (error instanceof Error) {
    throw new ErrorHandler(error.message, 500);
  }
}
