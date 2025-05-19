import { registerDefaultSites } from "./registerSites"
import { registerDefaultScrapperData } from "./registerSiteScrapperData"

export const bootstrap = async () => {
    await registerDefaultSites()
    await registerDefaultScrapperData()
}