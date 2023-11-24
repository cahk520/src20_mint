const { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } = require("@solana/web3.js");
const bs58 = require("bs58");


var secret = "4skqhrMMPiCAxS49xJFicTNi4Qz4wFBP9GcGshDyZerXJ481Jbduk63GhK3V7PecEnTYRSkHNTLnqoCZFVtwrbJs"
const keypair = Keypair.fromSecretKey(
  bs58.decode(secret)
);

const QUICKNODE_RPC = 'https://rpc.ankr.com/solana/265f590fa8fbe0728d8bf6c1ea2f1056b343a3f6980225a33392d5f39b06cd63/';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);


async function logMemo(message) {
  let tx = new Transaction();
  await tx.add(
    new TransactionInstruction({
      keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
      data: Buffer.from(message, "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    })
  )
  let result = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [keypair]);
  console.log("complete: ", `https://solscan.io/tx/${result}`);
  return result;
}

var data = `{"p":"src-20","op":"mint","tick":"lamp","amt":"1000"}`
var mintCount = 500
for (i = 0; i < mintCount; i++) {
  logMemo(data)
}

