// Gera código de sala curto, alfanumérico, sem caracteres ambíguos (0/O/1/I/L)
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateRoomCode(length = 4): string {
  let code = "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    code += ALPHABET[arr[i] % ALPHABET.length];
  }
  return code;
}
