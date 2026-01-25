import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      try {
        const { id, last_name, first_name, image_url } = evt.data;
        const fullname = `${last_name} ${first_name}`;

        if (!id) {
          throw new Error();
        }

        await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            username: fullname,
            image: image_url,
          },
          create: {
            clerkId: id,
            username: fullname,
            image: image_url,
          },
        });
        return NextResponse.json({ message: 'User synced successfully' });
      } catch (error) {
        console.error('Create User ERROR:', error);
        return NextResponse.json({ message: 'Error syncing user' }, { status: 500 });
      }
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
