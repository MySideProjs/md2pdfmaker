import store from "store"
import { MdStyles } from "../state"

const stylesKey = "md-styles"
export const saveStyles2Store = (css: MdStyles) => {
  store.set(stylesKey, css)
}
export const loadStylesFromStore = (): MdStyles => {
  return store.get(stylesKey)
}
