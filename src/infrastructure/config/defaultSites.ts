import { Site } from "@domain/entities/Site";

export const defaultSites: Omit<Site, 'id'>[] = [
    {
        name: "nts",
        url: "https://www.nts.live"
    }
]