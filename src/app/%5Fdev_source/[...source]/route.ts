import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

/**
 * Produce a ReadableStream from a file path that reads the file.
 *
 * The file is opened when the promise is awaited, which will produce errors if it does not exist.
 */
async function fileStream(absolutePath: string): Promise<ReadableStream> {
  // In general you would want to push this down into a start method, which has
  // the added benefit of enabling this method to not be async. In this
  // particular case however we want the failure to open the file to produce a
  // nice 404.
  //
  // The node documentation currently recommends the use of the error on open
  // to detect the absence of a file if you are also planning to read it, so as
  // to avoid potential problems with the state of the filesystem changing
  // after the check requiring handling the absence in two places with
  // different code.
  const fileHandle = await fs.open(absolutePath, 'r');

  // This is from the reference examples for ReadableStream
  // https://streams.spec.whatwg.org/#example-rbs-pull
  return new ReadableStream({
    type: 'bytes',
    autoAllocateChunkSize: 1024,
    async pull(controller) {
      const request = controller.byobRequest!;
      const view = request.view;
      if (view != null) {
        const { bytesRead } = await fileHandle.read(
          // Right now there is a disconnect between the DOM type for
          // ArrayBufferView and the NodeJS.ArrayBufferView. As far as I can
          // tell there isn't supposed to be. The array buffer types are just
          // extremely bizzare (likely trying to avoid the issues that come
          // from trying to abstract over arbitrary datatypes).
          //
          // Given that the streams spec says we can use view here and the
          // types are literally both named ArrayBufferView with some slight
          // differences in how they are specified (but seemingly not in how
          // the data itself is structured), this should be safe for now.
          view as NodeJS.ArrayBufferView,
          0,
          view.byteLength
        );
        if (bytesRead === 0) {
          await fileHandle.close();
          controller.close();
          request.respond(0);
        } else {
          request.respond(bytesRead);
        }
      }
    },
    cancel() {
      return fileHandle.close();
    }
  });
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  // In node they have added additional properties onto the global Error class.
  // It exposes a very awkward quirk of how we develop code now for a mixed
  // environment that those can't easily be added into what we see in the
  // global types.
  return error instanceof Error;
}

export async function generateStaticParams() {
  // There is a bug in NextJS where during an export build if you return an
  // empty array from generateStaticParams it treats that as if the method
  // wasn't defined rather than doing the reasonable thing and just not
  // rendering any pages.
  //
  // As a result we need to add in one empty page for it to generate.
  return [{ source: ['not-found'] }];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ source: string[] }> }
) {
  if (process.env.NODE_ENV !== 'development') {
    // This shouldn't be reachable in production due to a variety of other
    // checks, but given that this code explicitly allows arbitrary traversal
    // of the filesystem we want to be extra sure.
    notFound();
  }

  const { source } = await params;
  const root = process.env.rootPath!;
  const srcPath = path.join(root, 'src');
  const filePath = path.join(srcPath, ...source);
  if (!path.normalize(filePath).startsWith(srcPath)) {
    // We do the most basic check that we are not allowing directory traversal.
    // This is plenty good enough for development only.
    notFound();
  }

  try {
    const stream = await fileStream(filePath);
    return new NextResponse(stream);
  } catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      notFound();
    } else {
      throw error;
    }
  }
}
