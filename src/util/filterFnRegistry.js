const registry = {}

export const register = (name, fn) => (registry[name] = fn)

export const deregister = name => delete registry[name]

export const get = name => registry[name]
