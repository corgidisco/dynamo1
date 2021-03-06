import { MaybeArray } from '../interfaces/common'
import { ColumnIndexer } from '../interfaces/metadata'
import { MetadataStorage } from '../metadata/storage'
import { strictArray } from '../utils/array'

export interface EntityParams<TEntity> {
  name?: string
  aliasName?: string
  separator?: string
  hashKey: MaybeArray<ColumnIndexer<TEntity>>
  rangeKey?: MaybeArray<ColumnIndexer<TEntity>>
  gsi?: MaybeArray<{
    hashKey: MaybeArray<ColumnIndexer<TEntity>>,
    rangeKey?: MaybeArray<ColumnIndexer<TEntity>>,
  }>
  metadataStorage?: MetadataStorage
}

export function Entity<TEntity = any>(params: EntityParams<TEntity>): ClassDecorator {
  return (target) => {
    const metadataEntities = (params.metadataStorage ?? MetadataStorage.getGlobalStorage()).entities

    if (metadataEntities.get(target)) {
      throw new Error('entity decoartor must be one')
    }

    metadataEntities.set(target, {
      target,
      name: params.name ?? target.name,
      aliasName: params.aliasName ?? 'default',
      separator: params.separator ?? '#',
      hashKey: strictArray(params.hashKey),
      rangeKey: params.rangeKey ? strictArray(params.rangeKey) : undefined,
      gsi: strictArray(params.gsi ?? []).map(index => ({
        hashKey: strictArray(index.hashKey),
        rangeKey: index.rangeKey ? strictArray(index.rangeKey) : undefined,
      })),
    })
  }
}
