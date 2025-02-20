import ua from "universal-analytics";
const visitor = ua(process.env.GA_TRACKING_ID); // ✅ .env se ID fetch ho rahi hai

export const trackEvent = (category, action, label = "", value = 0) => {
  visitor.event(category, action, label, value).send();
};

export const trackPageView = (path) => {
  visitor.pageview(path).send();
};
