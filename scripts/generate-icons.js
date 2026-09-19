import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

function createPng(width, height, drawFn) {
  // RGBA buffer + 1 filter byte per scanline
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const offset = y * stride + 1 + x * 4;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(raw);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    // CRC32 of type + data
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc >>> 0, 8 + len);
    return buf;
  }

  // Precomputed CRC table
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Draw modern physics icon: dark slate bg, glowing indigo/cyan quantum orbits, glowing nucleus
function drawPhysicsIcon(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const maxR = w / 2;

  // Background: Deep slate-950 gradient
  const bgGrad = Math.min(1, dist / maxR);
  let r = Math.round(15 - bgGrad * 10);
  let g = Math.round(23 - bgGrad * 14);
  let b = Math.round(42 - bgGrad * 24);
  let a = 255;

  // Safe radius for orbits
  const orbitR = w * (isMaskable ? 0.28 : 0.35);

  // Nucleus: glowing cyan / indigo center
  const nucR = w * 0.08;
  if (dist < nucR) {
    const intensity = 1 - (dist / nucR);
    r = Math.round(r * (1 - intensity) + 99 * intensity);
    g = Math.round(g * (1 - intensity) + 102 * intensity);
    b = Math.round(b * (1 - intensity) + 241 * intensity);
  } else if (dist < nucR * 1.6) {
    const glow = 1 - (dist - nucR) / (nucR * 0.6);
    r = Math.round(r * (1 - glow * 0.5) + 56 * glow * 0.5);
    g = Math.round(g * (1 - glow * 0.5) + 189 * glow * 0.5);
    b = Math.round(b * (1 - glow * 0.5) + 248 * glow * 0.5);
  }

  // 3 Orbiting ellipses (angles: 0, 60, 120 deg)
  const angles = [0, Math.PI / 3, (2 * Math.PI) / 3];
  const aRadius = orbitR;
  const bRadius = orbitR * 0.36;

  for (const angle of angles) {
    // Rotate coordinates
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const rx = dx * cosA + dy * sinA;
    const ry = -dx * sinA + dy * cosA;

    // Ellipse equation: (rx/a)^2 + (ry/b)^2 = 1
    const val = (rx * rx) / (aRadius * aRadius) + (ry * ry) / (bRadius * bRadius);
    const diff = Math.abs(val - 1.0);

    if (diff < 0.12) {
      const lineStrength = 1 - (diff / 0.12);
      r = Math.round(Math.min(255, r + 56 * lineStrength * 1.6));
      g = Math.round(Math.min(255, g + 189 * lineStrength * 1.8));
      b = Math.round(Math.min(255, b + 248 * lineStrength * 2.0));
    }
  }

  // A subtle atom wave ring / symbol
  const ringDist = Math.abs(dist - orbitR * 1.15);
  if (ringDist < 2.5) {
    const strength = 1 - (ringDist / 2.5);
    r = Math.round(Math.min(255, r + 129 * strength));
    g = Math.round(Math.min(255, g + 140 * strength));
    b = Math.round(Math.min(255, b + 248 * strength));
  }

  return [r, g, b, a];
}

const outDir = path.resolve('public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Generating PWA icons...');

fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), createPng(192, 192, (x, y, w, h) => drawPhysicsIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), createPng(512, 512, (x, y, w, h) => drawPhysicsIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), createPng(512, 512, (x, y, w, h) => drawPhysicsIcon(x, y, w, h, true)));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), createPng(180, 180, (x, y, w, h) => drawPhysicsIcon(x, y, w, h, false)));

console.log('Successfully generated all PWA PNG icons in /public!');
