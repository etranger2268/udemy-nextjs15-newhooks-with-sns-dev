import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    // Do something with payload
    // For this guide, log payload to console

    if (eventType === 'user.created') {
      try {
        const { id, email_addresses, username, image_url } = evt.data;
        const email = email_addresses?.[0]?.email_address;

        if (!id || !email) {
          throw new Error();
        }

        await prisma.user.create({
          data: {
            clerkId: id,
            email: email,
            username: username ?? email.split('@')[0] ?? id,
            name: username || 'Unknown',
            image: image_url,
          },
        });
        return NextResponse.json({ message: 'ユーザーの作成に成功しました' });
      } catch (error) {
        console.error('Create User ERROR:', error);
        return NextResponse.json({ message: 'ユーザーの作成に失敗しました' }, { status: 500 });
      }
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
