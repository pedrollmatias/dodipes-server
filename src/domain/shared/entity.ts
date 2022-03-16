export abstract class Entity<Props> {
  protected readonly _id: string;

  public readonly props: Props;

  constructor(props: Props, _id: string) {
    this._id = _id;
    this.props = props;
  }
}
