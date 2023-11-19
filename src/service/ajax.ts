const HOST = process.env.NEXT_PUBLIC_API_HOST;

export const get = async (url: string) => {
  try {
    const res = await fetch(`${HOST}${url}`);
    const data = res.json();
    return data;
  } catch (error) {
    console.error("【GET_ERROR】", error);
    return {};
  }
};

export const post = async (url: string, body: any) => {
  try {
    const res = await fetch(`${HOST}${url}`, {
      method: "POST",
      body,
      // 解决 egg 服务端无法获取 body 的问题
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("【POST_ERROR】", error);
    return {};
  }
};
