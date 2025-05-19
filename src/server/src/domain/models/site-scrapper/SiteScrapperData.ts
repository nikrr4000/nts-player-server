import { browserActions } from "src/server/src/domain/interfaces/site-scrapper/SiteScrapperAdapter";
import { z } from "zod";

export const ScrapingActionSchema = z.enum(browserActions);

export const ScrapingActionObjectSchema = z.object({
  action: ScrapingActionSchema,
  selector: z.string(),
});

export const ScrapingScenarioSchema = z.object({
  description: z.string(),
  actions: z.array(ScrapingActionObjectSchema),
});

export const SiteScrapingDataSchema = z.object({
  scenarios: z.array(z.record(z.string(), ScrapingScenarioSchema)),
});

export const SiteScrapingDataRecordSchema = z.record(
  z.string(),
  SiteScrapingDataSchema
);

export const SiteScrapperDataArrSchema = z.array(SiteScrapingDataRecordSchema);

export type ScrapingAction = z.infer<typeof ScrapingActionSchema>;
export type SiteScrapingAction = z.infer<typeof ScrapingActionObjectSchema>;
export type SiteScrapingScenraio = z.infer<typeof ScrapingScenarioSchema>;
export type SiteScrapingDataObj = z.infer<typeof SiteScrapingDataSchema>;
export type SiteScrapingDataRecord = z.infer<
  typeof SiteScrapingDataRecordSchema
>;

export class SiteScrapperDataFactory {
  static create(scrapingData: SiteScrapingDataRecord): SiteScrapingDataRecord {
    const validatedScrapingData =
      SiteScrapingDataRecordSchema.safeParse(scrapingData);

    if (validatedScrapingData.success) {
      return scrapingData;
    }
    throw new Error(`Validation error: ${validatedScrapingData.error.message}`);
  }
}
