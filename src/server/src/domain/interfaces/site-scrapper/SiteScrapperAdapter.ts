import z from "zod"

export const browserActions = ["click", "hover"] as const

export const browserActionsSchema = z.enum(browserActions)
export const browserActionsParamsSchema = z.object({
  selector: z.string()
})

export type BrowserActionsParams = z.infer<typeof browserActionsParamsSchema>
export type BrowserActions = z.infer<typeof browserActionsSchema>

export interface ISiteScrapperAdapter <B, P>{
  currentBrowser: B;
  currentPage: P
  actions: Record<BrowserActions, (args: BrowserActionsParams) => void>

  launchBrowser: () => Promise<B>;
  getCurrentBrowser: () => B;
  closeBrowser: () => Promise<void>
  
  newPage: () => Promise<P>;
  getCurrentPage: () => P;
  goToPage: () => Promise<void>;
}