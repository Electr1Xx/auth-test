
export var CheckCaps = (event) => {
  let s = String.fromCharCode(event.which)

  if ((s.toUpperCase() === s && s.toLowerCase() !== s && !event.shiftKey) ||
    (s.toUpperCase() !== s && s.toLowerCase() === s && event.shiftKey)) {
    return true
  } else if ((s.toLowerCase() === s && s.toUpperCase() !== s && !event.shiftKey) ||
    (s.toLowerCase() !== s && s.toUpperCase() === s && event.shiftKey)) {
    return false
  }
}

