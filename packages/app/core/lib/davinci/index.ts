interface DavinciProps {
  prompt: string;
  model?: string;
  max_tokens?: number;
}

const url = "https://api.openai.com/v1/completions";
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENIA_API_KEY}`,
}

export default function davinci({
  prompt,
  model = "text-davinci-003",
  max_tokens = 1024,
}: DavinciProps) : Promise<string> {
  return fetch(url, {
    method: "post",
    headers,
    body: JSON.stringify({
      prompt,
      max_tokens,
      model,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      var responseText = response.choices[0].text;
      return responseText || "";
    });
}
