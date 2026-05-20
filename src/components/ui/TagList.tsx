interface TagListProps {
  tags: string[]
  label?: string
}

export function TagList({ tags, label }: TagListProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" aria-label={label}>
      {tags.map((tag) => (
        <span key={tag} className="ds-tag">
          {tag}
        </span>
      ))}
    </div>
  )
}
