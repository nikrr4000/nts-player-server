import { z } from 'zod';

export const SiteValidator = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  url: z.string()
});

export type Site = z.infer<typeof SiteValidator>;