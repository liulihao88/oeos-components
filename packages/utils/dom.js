export function addClass(el, className) {
  if (!el.classList.contains(className)) {
    console.log(`84 el, className`, el, className)
    el.classList.add(className)
  }
}
export function removeClass(el, className) {
  el.classList.remove(className)
}

