import store from "store"
import { MdStyles } from "../state"

const mdContentKey = "md"
export const saveMdContent2Store = (content: string) => {
  store.set(mdContentKey, content)
}
export const loadMdContentFromStore = (): string => {
  return store.get(mdContentKey)
}

const stylesKey = "md-styles"
export const saveStyles2Store = (css: MdStyles) => {
  store.set(stylesKey, css)
}
export const loadStylesFromStore = (): MdStyles => {
  return store.get(stylesKey)
}
