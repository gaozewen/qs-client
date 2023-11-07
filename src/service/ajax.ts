const HOST = "http://localhost:3001"; // Mock 的 host

export const get = async (url: string) => {
  const res = await fetch(`${HOST}${url}`);
  const data = res.json();
  return data;
};

export const post = async (url: string, body: any) => {
  const res = await fetch(`${HOST}${url}`, {
    method: "post",
    body: JSON.stringify(body),
  });
  const data = res.json();
  return data;
};
