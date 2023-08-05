let SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getTime = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/time`);
    if (response.status === 404) {
      throw new Error('Not found');
    }
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    else if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data.time;
  }
  catch (err) {
    console.error("Something went wrong: ", err);
    return err.message;
  }
};