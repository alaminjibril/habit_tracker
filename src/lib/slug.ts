
export function getHabitSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')    // Remove non-alphanumeric except hyphens
    .replace(/-+/g, '-');          // Collapse multiple hyphens if they were created
}
