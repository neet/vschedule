export class Cursor {
  static encode(typename: string, id: string) {
    return Buffer.from([typename, id].join(':')).toString('base64');
  }

  static decode(cursor: string) {
    const [typename, id] = Buffer.from(cursor, 'base64')
      .toString()
      .split(':');

    return { typename, id };
  }
}
