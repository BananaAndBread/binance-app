class Core {
  constructor(plugins) {
    this.plugins = plugins
  }
  async install () {
    for (const plugin of this.plugins){
      let module = await import("./plugins/" + plugin.name)
      this[plugin.name] = module.default
      }
    }
  }

export default Core
