type RouteNode = string | { [key: string]: RouteNode };

/**
 * Recursively flattens a nested route object, prepending parent paths.
 */
export const createApiMap = <T extends Record<string, RouteNode>>(
	routes: T,
	basePath = ""
): T => {
	const result: any = {};

	for (const key in routes) {
		const value = routes[key];
		const currentPath = `${basePath}${
			typeof value === "string" ? value : ""
		}`;

		if (typeof value === "string") {
			result[key] = currentPath;
		} else {
			// If it's an object, we keep the structure but process the children
			// We assume the object itself might have a "BASE" or similar key if it's a prefix
			const prefix = (value as any).BASE || "";
			result[key] = createApiMap(value as any, `${basePath}${prefix}`);
		}
	}

	return result as T;
};
