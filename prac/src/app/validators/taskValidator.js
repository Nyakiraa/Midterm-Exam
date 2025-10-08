export function validateTaskCreate(data) {
    const title = data?.title?.trim?.();
    if (!title) return { valid: false, message: "title is required" };
    return { valid: true };
}

export function validateTaskUpdate(data) {
    if (data?.title !== undefined && !data.title?.trim?.()) {
        return { valid: false, message: "title cannot be empty" };
    }
    return { valid: true };
}


