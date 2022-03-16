export abstract class ValueObject<Props> {
  public props: Props;

  constructor(props: Props) {
    this.props = props;
  }
}
