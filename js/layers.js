addLayer("m", {
    name: "magnets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧲", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#aaaaaa",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "magnets", // Name of prestige currency
    baseResource: "scrap", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	upgrades: {
		11: {
	        title: "Get More Scrap",
                description: "More scrap.",
		cost: new Decimal(1),
		effect() {
                   return player[this.layer].points.add(1).pow(0.5)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		12: {
                title: "x3 Scrap",
		description: "x3 more scrap.",
		cost: new Decimal(10),
		unlocked() {return hasUpgrade(this.layer,11)},
		},
		13: {
		title: "Get More Scrap (x20)",
		description: "x20 more scrap.",
		cost: new Decimal(50),
		unlocked() {return hasUpgrade(this.layer,12)},
		},
		14: {
		title: "Golden Scrap",
		description: "Unlock Golden Scrap.",
		cost: new Decimal(200),
		unlocked() {return hasUpgrade(this.layer,13)},
		}
	}
	passiveGeneration() {
	if (hasMilestone("g",1)) return 1
    }
})
addLayer("g", {
    name: "golden scrap", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffaa00",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "golden scrap", // Name of prestige currency
    branches: ["m"],
    baseResource: "scrap", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("m",14)||player.g.unlocked},
	upgrades: {
		11: {
		title: "Welcome to Row 2!",
		description: "x10 scrap gain!",
		cost: new Decimal(2)
		},
		12: {
                title: "GS Booster",
		description: "Gain Scrap.",
		cost: new Decimal(10),
		effect() {
                   return player[this.layer].points.add(1).pow(1)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
		unlocked() {return hasUpgrade(this.layer,11)},
		}
	},
        milestones: {
	0: {
		requirementDescription: "200 golden scrap",
		effectDescription: "Keep all magnet upgrades",
		done() { return player.g.points.gte(200) }
	},
	1: {
		requirementDescription: "5,000 golden scrap",
		effectDescription: "You get passive 100% gain of Magnets.",
		done() { return player.g.points.gte(5000) }
	},
    },
	update(diff){
		if (hasMilestone(this.layer, 0))
			player.m.upgrades.push(11)
		        player.m.upgrades.push(12)
		        player.m.upgrades.push(13)
		        player.m.upgrades.push(14)
	},
})
