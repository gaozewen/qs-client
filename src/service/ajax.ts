// const HOST = "http://localhost:3001"; // Mock 的 host
const HOST = "http://localhost:7001"; // 本地 api 的 host

export const get = async (url: string) => {
  const res = await fetch(`${HOST}${url}`);
  const data = res.json();
  return data;
};

export const post = async (url: string, body: any) => {
  const res = await fetch(`${HOST}${url}`, {
    method: "POST",
    body,
    // 解决 egg 服务端无法获取 body 的问题
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};
