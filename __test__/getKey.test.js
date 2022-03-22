import 'regenerator-runtime/runtime'
import { getKey } from '../src/client/js/tests/getKey';

// Mock at global level
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        weather: 'a60aff09356a4ffeab2c9ea4465515ad',
        geonames: 'pavelolkhovoi',
        pixabay: '26063809-1bee4e29e3fc543870529c15a'
    }),
  })
);



test('Test the server route http://localhost:8081/key', async () => {
    let pattern = {
        weather: 'a60aff09356a4ffeab2c9ea4465515ad',
        geonames: 'pavelolkhovoi',
        pixabay: '26063809-1bee4e29e3fc543870529c15a'
    };
    const result = await getKey();
    console.log('Get result', result);
    expect(result).toEqual(pattern);
})