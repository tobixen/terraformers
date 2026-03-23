import { Assets } from "src/asset"
import { Upgrade } from "src/upgrade"
import { Skill } from "./skill"
import { stats } from "../stat"

const INC_HEALTH_CAP = 25
const MAX_HEALTH_CAP = 300

interface MaxHealthOwner {
    health: number
    maxHealth: number
}

export class MaxHealth implements Skill {
    constructor(private owner: MaxHealthOwner) {
        this.owner = owner
    }

    getUpgrades(): Upgrade[] {
        const sprite = "eHeart" as keyof Assets
        const upgrades = []

        if (this.owner.maxHealth < MAX_HEALTH_CAP) {
            const apply = () => {
                if (stats.easyMode) {
                    this.owner.health += ~~(INC_HEALTH_CAP * this.owner.health / this.owner.maxHealth)
                }
                this.owner.maxHealth += INC_HEALTH_CAP
            }
            upgrades.push({ label: "++MAX HEALTH", sprite, apply })
        }

        return upgrades
    }

    load() {}
    unload() {}
}
