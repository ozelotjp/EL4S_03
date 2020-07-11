export const formatDate = (date: Date) => {
  // const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)

  return `${m}/${d}`
}

export const formatFullDate = (date: Date) => {
  // const y = date.getFullYear()
  const fy = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)

  return `${fy}/${m}/${d}`
}

export const hyphenFormatFullDate = (date: Date) => {
  // const y = date.getFullYear()
  const fy = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)

  return `${fy}-${m}-${d}`
}
