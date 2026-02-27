export default class MapImage {
  constructor (codigo, tipo, size, map_url, refmapurl, scaleburl,scale ) {
    this.size = size
    this.codigo = codigo
    this.tipo = tipo

    this.map_url = map_url
    this.refmapurl = refmapurl
    this.scaleburl = scaleburl
    this.scale = scale
  }
}