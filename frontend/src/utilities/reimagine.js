export default function reimagine(counters, key) {
  return counters.map((counter) => {
    const { contentType, data } = counter[key];
    const blob = new Blob([new Uint8Array(data.data)], { type: contentType });
    const url = URL.createObjectURL(blob);

    return { ...counter, url };
  });
}
