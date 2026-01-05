/**
 * Converts UI Filter objects to Prisma Where Input
 * Example Input: [{ field: "isShiny", operator: "equals", value: true }]
 * Example Output: { isShiny: { equals: true } }
 */
export const transformUiFiltersToPrisma = (uiFilters: any[]) => {
	return uiFilters.reduce((acc, filter) => {
		const { field, operator, value } = filter;

		// 1. Map UI strings to Prisma-specific keywords
		const prismaOperatorMap: Record<string, string> = {
			equals: "equals",
			notEquals: "not", // Prisma uses 'not' for !=
			greaterThan: "gt", // Prisma uses 'gt'
			lessThan: "lt", // Prisma uses 'lt'
			contains: "contains",
		};

		const prismaOp = prismaOperatorMap[operator] || operator;

		// 2. Build the object
		if (prismaOp === "equals") {
			acc[field] = value; // Shorthand
		} else {
			acc[field] = { [prismaOp]: value }; // e.g., { isShiny: { not: true } }
		}

		return acc;
	}, {});
};
