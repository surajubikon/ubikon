import { createContext, useContext, useState } from "react";

// ✅ Context Banaya
const LoaderContext = createContext();

// ✅ Global Store (Direct Access ke liye)
export const store = {
  setLoading: () => {}, // Default function
};

// ✅ Provider
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // ✅ Store me function assign kiya
  store.setLoading = setLoading;

  return (
    <LoaderContext.Provider value={{ loading }}>
      {children}
      {loading && (
        <div className="global-loader">
          <p>Loading...</p>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

// ✅ Custom Hook
export const useLoader = () => {
  return useContext(LoaderContext);
};
