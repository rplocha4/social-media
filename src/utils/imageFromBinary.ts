export default function imageFromBinary(binary: number[]) {
    const base64 = btoa(
      String.fromCharCode(...new Uint8Array(binary))
    );
    return `data:image/jpeg;base64,${base64}`;
}