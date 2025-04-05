export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export const determinePlacement = (
  itemIndex: number,
  activeIndex: number,
  halfwayIndex: number,
  convertInfoSlider: number,
  shuffleThreshold: number,
  itemHeight: number
) => {
  if (activeIndex === itemIndex) return 0;

  const distance = itemIndex - activeIndex;
  const adjustedDistance =
    itemIndex >= halfwayIndex && activeIndex <= itemIndex - halfwayIndex
      ? -(convertInfoSlider - distance)
      : distance;

  if (Math.abs(adjustedDistance * itemHeight) >= shuffleThreshold) {
    return (
      (convertInfoSlider - Math.abs(adjustedDistance)) *
      itemHeight
    );
  }

  return adjustedDistance * itemHeight;
};
