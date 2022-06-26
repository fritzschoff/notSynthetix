import express from 'express';
import { readFileSync } from 'fs';
import { constants as httpConstants } from 'http2';
import { GenerateSvgArgs, GenerateSvgSchema, PositionSize } from './typed';
import pinataSdk from '@pinata/sdk';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

const pinata = pinataSdk(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_API_SECRET!
);

export const healthHandler = () => {
  const router = express.Router();
  const startUpTime = Date.now();

  router.get('/', (_req, res) => {
    res.status(httpConstants.HTTP_STATUS_OK).json({
      status: 'ok',
      uptime: Date.now() - startUpTime,
    });
  });

  return router;
};

const getIpfsContent = async ({
  market,
  size,
  price,
  side,
}: GenerateSvgArgs): Promise<[Buffer, string]> => {
  // What is considered a BIG size? We'll 10,000 sUSD.
  const bigSUSDSizeThreshold = 10000;

  const positionSize =
    size * price > bigSUSDSizeThreshold ? PositionSize.BIG : PositionSize.SMALL;

  const filePath = `${__dirname}/svgs/${market}-${side}-${positionSize}.svg`;

  return [readFileSync(filePath), filePath];
};

export const tokenHandler = () => {
  const router = express.Router();

  router.post('/generate-svg', async (req, res) => {
    const input: GenerateSvgArgs = {
      market: req.body.market,
      size: req.body.size,
      price: req.body.price,
      side: req.body.side,
      wallet: req.body.wallet,
    };
    const { error: err } = GenerateSvgSchema.validate(input);

    if (err) {
      res
        .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .json({ error: err.details[0].message });
      return;
    }

    const [buffer, filePath] = await getIpfsContent(input);
    const content = Buffer.from(
      buffer
        .toString()
        .replace('{PLACEHOLDER_PRICE}', input.price.toString())
        .replace('{PLACEHOLDER_ADDR}', input.wallet)
        .replace('{PLACEHOLDER_SIZE}', input.size.toString())
    );

    const stream = Readable.from(content);
    (stream as ReadStream).path = filePath;

    const pinnedFileResult = await pinata.pinFileToIPFS(stream, {});

    const metadata = {
      description: 'NFT Synthetix Future Pozitions',
      image: `https://gateway.pinata.cloud/ipfs/${pinnedFileResult.IpfsHash}`,
      name: 'Future Pozitions',
    };

    const pinnedMetadataResult = await pinata.pinJSONToIPFS(metadata, {});

    res.status(httpConstants.HTTP_STATUS_OK).json({
      fullTokenURI: `https://https://gateway.pinata.cloud/ipfs/${pinnedMetadataResult.IpfsHash}`,
    });
  });

  return router;
};
