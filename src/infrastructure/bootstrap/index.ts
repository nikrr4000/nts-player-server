import { registerDefaultSites } from "./registerDefaultSites"

export const bootstrap = async () => {
    await registerDefaultSites()
}