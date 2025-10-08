export function validateProjectCreate(data) {
    const name = data?.name?.trim?.();
    if (!name) return { valid: false, message: "name is required" };
    return { valid: true };
}