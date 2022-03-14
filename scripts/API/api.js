export const getPhotographers = async () => {
  try {
    const response = await fetch('/data/photographers.json');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const { photographers, media } = await getPhotographers();
