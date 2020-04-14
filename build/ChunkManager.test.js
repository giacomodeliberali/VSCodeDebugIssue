"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChunkManager_1 = require("./ChunkManager");
describe.each([
    [0, 0, 0, 0],
    [10, -1, 10, 10],
    [10, 10, -1, 10],
    [10, 10, 10, -1],
    [-1, -1, -1, -1]
])("Test invalid ChunkManifest constructor: mapWidth: %i, mapHeight: %i, chunkWidth: %i, chunkHeight: %i", (mapWidth, mapHeight, chunkWidth, chunkHeight) => {
    let fooURL = new URL("http://www.example.org/");
    let emptyChunkMap = new Map();
    test("Invalid map size", () => {
        expect(() => new ChunkManager_1.ChunkManifest(mapWidth, mapHeight, chunkWidth, chunkHeight, fooURL, emptyChunkMap)).toThrow(Error("Invalid map dimension"));
    });
}, 5);

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

//# sourceMappingURL=ChunkManager.test.js.map