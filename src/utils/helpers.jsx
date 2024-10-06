export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data) => {
  let unique = [];
  data &&
    data.map(
      (item) => unique.push(item?.title)
      //   {
      //   item.map((i) => unique.push(i.title));
      // }
    );

  return ["all", ...new Set(unique)];
};

// HELPER FUNCTIONS FOR REGISTRATION ATTEMPTS

export const setCookie = (name, value, minutes) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  const prefix = `${name}=`;
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.startsWith(prefix)) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const calculateRemainingTime = () => {
  const resendAttemptsTime = getCookie("resendAttemptsTime");
  if (resendAttemptsTime) {
    const expiryTime = new Date(resendAttemptsTime);
    const currentTime = new Date();
    const timeDifference = expiryTime - currentTime;

    if (timeDifference > 0) {
      const minutesLeft = Math.floor(timeDifference / (1000 * 60));
      const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
      return { minutes: minutesLeft, seconds: secondsLeft };
    } else {
      // Time expired
      return null;
    }
  }
  return null;
};
