export class Cursor {
  static encode(type: string, id: string) {
    return Buffer.from([type, id].join(':')).toString('base64');
  }

  static decode(cursor: string) {
    const [type, id] = Buffer.from(cursor, 'base64')
      .toString()
      .split(':');

    return { type, id };
  }
}
