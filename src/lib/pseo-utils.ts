/**
 * Utility to inject variables into strings or objects.
 * Replaces patterns like {city} or {industry} with values from the variables object.
 */
export function injectVariables<T>(content: T, variables: Record<string, string> | undefined | null): T {
    if (!variables || Object.keys(variables).length === 0) {
        return content;
    }

    if (typeof content === 'string') {
        return content.replace(/\{(\w+)\}/g, (match, key) => {
            return variables[key] || match; // Keep original if variable not found
        }) as unknown as T;
    }

    if (Array.isArray(content)) {
        return content.map((item) => injectVariables(item, variables)) as unknown as T;
    }

    if (typeof content === 'object' && content !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = {};
        for (const key in content) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result[key] = injectVariables((content as any)[key], variables);
        }
        return result;
    }

    return content;
}
