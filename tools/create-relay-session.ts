import { TelegramClient } from 'teleproto';
import { StringSession } from 'teleproto/sessions';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH?.trim();
if (!Number.isSafeInteger(apiId) || apiId <= 0 || !apiHash) {
  throw new Error('Set TELEGRAM_API_ID and TELEGRAM_API_HASH in this local terminal environment first.');
}

const terminal = createInterface({ input: stdin, output: stdout });
const client = new TelegramClient(new StringSession(''), apiId, apiHash, { connectionRetries: 5 });
try {
  await client.start({
    phoneNumber: () => terminal.question('Relay account phone number: '),
    phoneCode: (_isCodeViaApp, info) => terminal.question(`Telegram login code (${info?.type ?? 'code'}): `),
    password: () => terminal.question('Relay account 2FA password (if enabled): '),
    onError: (error) => { throw error; },
  });
  const me = await client.getMe();
  stdout.write(`\nAuthorized relay account: ${me.username ? `@${me.username}` : me.id}\n`);
  stdout.write('Copy this session directly to the private TELEGRAM_RELAY_SESSION environment variable in Render. Do not send it in chat or commit it.\n\n');
  stdout.write(`${client.session.save()}\n`);
} finally {
  await client.disconnect();
  terminal.close();
}
