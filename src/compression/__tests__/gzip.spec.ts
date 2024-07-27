import {utf8} from '../../buffers/strings';
import {gzip, ungzip} from '../gzip';

test('can gzip and ungzip data', async () => {
  const data = utf8`Hello, World!`;
  const compressed = await gzip(data);
  const uncompressed = await ungzip(compressed);
  expect(uncompressed).toEqual(data);
});
