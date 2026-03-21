type PageTemplateProps = {
  name: string
}

export function PageTemplate({ name }: PageTemplateProps) {
  // TEAM TODO (UI): Replace this blank placeholder with each page's actual layout.
  return <main className="page-template" aria-label={`${name} page template`} />
}
