export const reportGA = (eventName: string) => {
  if (import.meta.env.MODE !== "production") return
  gtag("event", eventName)
}
