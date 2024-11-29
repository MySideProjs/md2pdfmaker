import store from "store"
import { PdfStyles } from "../state"

const mdContentKey = "md"
export const saveMdContent2Store = (content: string) => {
  store.set(mdContentKey, content)
}
export const loadMdContentFromStore = (): string => {
  return store.get(mdContentKey)
}

const stylesKey = "styles"
export const saveStyles2Store = (styles: PdfStyles) => {
  store.set(stylesKey, styles)
}
export const loadStylesFromStore = (): PdfStyles => {
  return store.get(stylesKey)
}
