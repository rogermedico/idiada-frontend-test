export class DomainBuilder<T, C extends T> {
  constructor(private creator: new (T: any) => C) { }

  with<K extends keyof T>(obj: Pick<T, K>): this & Pick<T, K> {
    return Object.assign(this, obj);
  }

  build(this: this & T): T {
    return this;
  }
}

export class Builder<T> extends DomainBuilder<T, T> { }
