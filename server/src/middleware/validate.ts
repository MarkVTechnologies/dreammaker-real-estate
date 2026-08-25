import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

/** Validates req.body against a Zod schema; returns 422 with field errors on failure. */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({ error: "Validation failed", issues: result.error.issues });
    }
    req.body = result.data;
    next();
  };
}
