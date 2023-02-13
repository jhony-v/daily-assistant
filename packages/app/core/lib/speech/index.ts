import axios from "axios";


export interface ISpeechResponse {
    buffer: AudioBuffer;
    source: AudioBufferSourceNode;
    dataArray: Uint8Array,
    bufferLength: number,
    getByteFrequencyData(): void
}

interface SpeechProps {
  text: string;
}


export default function speech(
  props: SpeechProps
): Promise<ISpeechResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      //@ts-ignore
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const bufferData = await hear(props.text);

      audioContext.decodeAudioData(bufferData, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;

        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        source.start();

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const getByteFrequencyData = () => analyser.getByteFrequencyData(dataArray);

        resolve({
            buffer,
            source,
            dataArray,
            bufferLength,
            getByteFrequencyData,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function hear(text: string) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/hear`, {
      params: {
        text,
      },
      responseType: "arraybuffer",
    })
    .then((response) => response.data);
}
