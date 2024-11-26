import store from "store"

const mdContentKey = "md"
export const saveMdContent2Store = (content: string) => {
  store.set(mdContentKey, content)
}
export const loadMdContentFromStore = (): string => {
  return store.get(mdContentKey)
}
