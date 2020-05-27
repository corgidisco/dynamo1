

export interface MetadataEntity {
  target: any
  name: string
}

export interface MetadataIndex {
  target: any
  name: string
  indexer(entity: any): string
}

export interface MetadataGeneratedValue {
  target: any
  property: string | symbol
  strategy: string
}

export interface MetadataId {
  target: any
  property: string | symbol
}
