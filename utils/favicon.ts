export const fetchFavicon = async (domain: string) => {
  try {
    const response = await fetch(
      `https://s2.googleusercontent.com/s2/favicons?domain_url=${domain}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch favicon for ${domain}: ${response.statusText}`
      );
    }

    const faviconUrl = response.url;

    return faviconUrl;
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return null;
  }
};
