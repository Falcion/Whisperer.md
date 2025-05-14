HTMLMediaElement.prototype.pause = function () {
  /* no-op */
}
HTMLMediaElement.prototype.play = function () {
  /* no-op */
}

HTMLElement.prototype.empty = function () {
  while (this.firstChild) this.removeChild(this.firstChild)
}

HTMLElement.prototype.addClass = function (c) {
  this.classList.add(c)
}
HTMLElement.prototype.removeClass = function (c) {
  this.classList.remove(c)
}
