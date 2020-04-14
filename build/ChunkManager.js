"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChunkManager {
    /**
     * Construct a ChunkManager
     * @param scene The scene to manage chunks of
     * @param manifestURL The URL of the chunks manifest file
     */
    constructor(scene, manifestURL) {
        this.currentChunks = new Set();
        this.scene = scene;
        this.manifestURL = manifestURL;
        this.scene.events.on("update", this.update);
    }
    /**
     * Loading required assets for current camera position.
     * This should be called on scene preload with the camera set
     * to an appropriate position.
     */
    preload() {
        let loader = this.scene.load;
        loader.json("chunk_manifest", this.manifestURL.toString());
        loader.on("filecomplete-chunk_manifest", (key, type, jsonManifest) => {
            let chunkManifest = ChunkManifest.fromJSON(jsonManifest);
            let indices = chunkManifest.chunksIndicesFromCamera(this.scene.cameras.main);
            let url = chunkManifest.globalMapURL;
            for (let index of indices) {
                let chunk = chunkManifest.chunks.get(index);
                if (chunk !== undefined) {
                    let actualURL = new URL(chunk.relativeURL.toString(), chunkManifest.globalMapURL);
                    loader.tilemapTiledJSON(`tile${index}`, actualURL.toString());
                    loader.on(`filecomplete-chunk${index}`, (key, type, tilemap) => {
                        console.log(tilemap);
                    });
                }
                else {
                    console.error("Couldn't get chunk");
                    // Should probably throw here
                }
            }
        });
    }
    /**
     * Update the
     */
    update() {
        let mainCamera = this.scene.cameras.main;
        // Only update chunks if world view changed
        if (mainCamera.worldView !== this.lastWorldView) {
            // Update current world view
            this.lastWorldView = mainCamera.worldView;
        }
    }
}
class ChunkDescription {
    constructor(relativeURL, x, y, width, height) {
        this.relativeURL = relativeURL;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static fromJSON(json) {
        return new ChunkDescription(new URL(json.relativeURL), json.x, json.y, json.width, json.height);
    }
}
exports.ChunkDescription = ChunkDescription;
class ChunkManifest {
    constructor(mapWidth, mapHeight, baseChunkWidth, baseChunkHeight, globalMapURL, chunks) {
        if (mapWidth <= 0 || mapHeight <= 0 || baseChunkWidth <= 0 || baseChunkHeight <= 0) {
            throw Error("Invalid map dimension");
        }
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.baseChunkWidth = baseChunkWidth;
        this.baseChunkHeight = baseChunkHeight;
        this.globalMapURL = globalMapURL;
        this.chunks = chunks;
    }
    static fromJSON(json) {
        let url = new URL(json.globalMapURL);
        let chunksDict = new Map();
        Object.keys(json.chunks).map((key) => {
            let intKey = parseInt(key);
            if (isNaN(intKey)) {
                throw new Error("Chunk id is not an integer");
            }
            let jsonChunkDescription = json.chunks[intKey];
            let chunkDescription = new ChunkDescription(new URL(jsonChunkDescription.relativeURL), jsonChunkDescription.x, jsonChunkDescription.y, jsonChunkDescription.width, jsonChunkDescription.height);
            chunksDict.set(intKey, chunkDescription);
        });
        return new ChunkManifest(json.mapWidth, json.mapHeight, json.baseChunkWidth, json.baseChunkHeight, url, chunksDict);
    }
    chunkIndexAt(x, y) {
        let hCount = Math.floor(this.mapWidth / this.baseChunkWidth);
        let vCount = Math.floor(this.mapHeight / this.baseChunkHeight);
        let xIndex = hCount * x;
        let yIndex = vCount * y;
        return yIndex * hCount + xIndex;
    }
    chunksIndicesFromCamera(camera) {
        let wv = camera.worldView;
        return this.chunksIndicesFromBounds(wv.top, wv.left, wv.right, wv.bottom);
    }
    chunksIndicesFromBounds(top, left, right, bottom) {
        // Add margins so that we load chunks a bit outside of the screen
        top -= this.baseChunkHeight;
        bottom += this.baseChunkHeight;
        left -= this.baseChunkWidth;
        right += this.baseChunkWidth;
        let topLeftPoint = {
            x: Math.floor(left),
            y: Math.floor(top)
        };
        let topRightPoint = {
            x: Math.floor(right),
            y: Math.floor(top)
        };
        let bottomRightPoint = {
            x: Math.floor(right),
            y: Math.floor(bottom)
        };
        let topLeftIndex = this.chunkIndexAt(topLeftPoint.x, topLeftPoint.y);
        let topRightIndex = this.chunkIndexAt(topRightPoint.x, topRightPoint.y);
        let bottomLeftIndex = this.chunkIndexAt(bottomRightPoint.x, bottomRightPoint.y);
        // Number of tiles to be displayed on the horizontal axis
        let hDiff = topRightIndex - topLeftIndex;
        // Number of horizontal tiles
        let hCount = Math.floor(this.mapWidth / this.baseChunkWidth);
        let current = topLeftIndex;
        var indices = new Array();
        while (current <= bottomLeftIndex) {
            let currentCopy = current;
            while (current <= current + hDiff) {
                indices.push(current);
                current += 1;
            }
            current = currentCopy + hCount;
        }
        return indices;
    }
}
exports.ChunkManifest = ChunkManifest;
//# sourceMappingURL=ChunkManager.js.map